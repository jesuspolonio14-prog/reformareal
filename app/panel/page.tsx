import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { getSupabase } from '@/lib/supabase'
import { cerrarSesion } from './actions'
import LeadsSection from './LeadsSection'
import PerfilSection from './PerfilSection'
import PresupuestosSection from './PresupuestosSection'

export default async function Panel({ searchParams }: { searchParams: Promise<{ pago?: string }> }) {
  await searchParams
  const supabase = await createClient()
  const admin = getSupabase()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: perfil } = await admin
    .from('reformistas_perfiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const [{ data: leads, error: leadsError }, { data: seguimientos }, { data: presupuestos }] = await Promise.all([
    admin
      .from('leads')
      .select('*')
      .ilike('ciudad', `%${perfil?.ciudad ?? ''}%`)
      .order('creado_en', { ascending: false })
      .limit(20),
    admin
      .from('lead_seguimientos')
      .select('lead_id, estado')
      .eq('reformista_id', user.id),
    admin
      .from('presupuestos')
      .select('id, total, notas, partidas, creado_en, leads(tipo_reforma, ciudad, metros, nombre, telefono)')
      .eq('reformista_id', user.id)
      .order('creado_en', { ascending: false })
      .limit(20),
  ])

  if (leadsError) console.error('Leads error:', leadsError)

  const leadsVistos = new Set((seguimientos ?? []).map((s) => s.lead_id))
  const leadsNuevos = (leads ?? []).filter((l) => !leadsVistos.has(l.id)).length

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">
      {/* NAV */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-3 max-w-6xl mx-auto border-b border-[#E8DFD8]">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={32} height={28} priority />
          <span className="text-lg font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
        <form action={cerrarSesion}>
          <button type="submit" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors border border-[#E8DFD8] px-3 py-1.5 rounded-full">
            Cerrar sesión
          </button>
        </form>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-5 sm:space-y-8">

        {/* BIENVENIDA */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">Hola, {perfil?.nombre ?? 'reformista'} 👋</h1>
          <p className="text-[#6B5B4E] text-sm mt-0.5">{perfil?.ciudad}</p>
        </div>

        {/* BANNER leads nuevos */}
        {leadsNuevos > 0 && (
          <a href="#leads" className="flex items-center gap-3 bg-[#C4531A] text-white rounded-2xl px-5 py-4 hover:bg-[#A84414] transition-colors">
            <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-black text-sm shrink-0">
              {leadsNuevos}
            </span>
            <div>
              <p className="font-bold text-sm">
                {leadsNuevos === 1 ? 'Tienes 1 lead nuevo sin revisar' : `Tienes ${leadsNuevos} leads nuevos sin revisar`}
              </p>
              <p className="text-white/70 text-xs">Toca para verlos →</p>
            </div>
          </a>
        )}

        {/* STATS */}
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              label: leadsNuevos > 0 ? `${leadsNuevos} nuevos` : 'Leads',
              valor: leads?.length ?? 0,
              highlight: leadsNuevos > 0,
            },
            { label: 'Estado', valor: perfil?.verificado ? 'Verificado' : 'Activo', highlight: false },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-3 sm:p-5 border text-center ${s.highlight ? 'bg-[#FDF0EB] border-[#C4531A]/30' : 'bg-white border-[#E8DFD8]'}`}>
              <div className="text-xl sm:text-2xl font-black text-[#C4531A] truncate">{s.valor}</div>
              <div className="text-xs text-[#6B5B4E] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* PERFIL */}
        <PerfilSection perfil={perfil ?? {}} />

        {/* LEADS */}
        <div id="leads">
          <LeadsSection
            leads={leads ?? []}
            seguimientos={seguimientos ?? []}
            ciudad={perfil?.ciudad ?? ''}
          />
        </div>

        {/* PRESUPUESTOS */}
        <PresupuestosSection presupuestos={(presupuestos ?? []).map((p) => ({
          ...p,
          leads: Array.isArray(p.leads) ? p.leads[0] : p.leads,
        }))} />

      </div>
    </main>
  )
}
