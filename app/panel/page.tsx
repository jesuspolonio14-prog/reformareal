import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { getSupabase } from '@/lib/supabase'
import { cerrarSesion } from './actions'
import LeadsSection from './LeadsSection'
import PerfilSection from './PerfilSection'
import PresupuestosSection from './PresupuestosSection'

export default async function Panel() {
  const supabase = await createClient()
  const admin = getSupabase()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: perfil } = await admin
    .from('reformistas_perfiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Sin suscripción activa → fuera del panel
  if (perfil && perfil.suscripcion_activa === false) redirect('/reformistas?estado=sin-suscripcion')

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

  // Leads sin tocar = sin entrada en lead_seguimientos
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">Hola, {perfil?.nombre ?? 'reformista'} 👋</h1>
            <p className="text-[#6B5B4E] text-sm mt-0.5">{perfil?.ciudad} · {perfil?.plan ?? 'Básico'}</p>
          </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              {perfil?.plan_pagado ? (
                <div className="bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm rounded-xl px-3 py-2">
                  ✅ Plan {perfil.plan} activo
                </div>
              ) : perfil?.suscripcion_activa ? (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs sm:text-sm rounded-xl px-3 py-2">
                  🎁 Periodo de prueba · 1er mes gratis
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl px-3 py-2">
                  ⚠️ Problema con el pago · <a href="/reformistas" className="underline font-semibold">Renovar plan</a>
                </div>
              )}
              <a href="mailto:reformarealsoporte@gmail.com?subject=Gestión suscripción" className="text-xs text-[#6B5B4E] hover:text-[#C4531A] transition-colors underline">
                Gestionar suscripción →
              </a>
            </div>
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
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: leadsNuevos > 0 ? `${leadsNuevos} nuevos` : 'Leads',
              valor: leads?.length ?? 0,
              highlight: leadsNuevos > 0,
            },
            { label: 'Plan', valor: perfil?.plan ?? 'Básico', highlight: false },
            { label: 'Estado', valor: perfil?.verificado ? 'OK' : 'Pendiente', highlight: false },
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
