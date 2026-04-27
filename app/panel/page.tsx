import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { getSupabase } from '@/lib/supabase'
import { cerrarSesion } from './actions'
import LeadsSection from './LeadsSection'
import PerfilSection from './PerfilSection'

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

  const [{ data: leads, error: leadsError }, { data: seguimientos }] = await Promise.all([
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
  ])

  if (leadsError) console.error('Leads error:', leadsError)

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">
      {/* NAV */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto border-b border-[#E8DFD8]">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#6B5B4E]">{user.email}</span>
          <form action={cerrarSesion}>
            <button type="submit" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors">
              Cerrar sesión
            </button>
          </form>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* BIENVENIDA */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">Hola, {perfil?.nombre ?? 'reformista'} 👋</h1>
            <p className="text-[#6B5B4E] mt-1">{perfil?.ciudad} · {perfil?.plan ?? 'Básico'}</p>
          </div>
            {perfil?.plan_pagado && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
              ✅ Plan {perfil?.plan} activo
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Leads en tu zona', valor: leads?.length ?? 0 },
            { label: 'Plan activo', valor: perfil?.plan ?? 'Básico' },
            { label: 'Estado', valor: perfil?.verificado ? 'Verificado' : 'Pendiente' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-6 border border-[#E8DFD8]">
              <div className="text-2xl font-black text-[#C4531A]">{s.valor}</div>
              <div className="text-sm text-[#6B5B4E] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* PERFIL */}
        <PerfilSection perfil={perfil ?? {}} />

        {/* LEADS */}
        <LeadsSection
          leads={leads ?? []}
          seguimientos={seguimientos ?? []}
          ciudad={perfil?.ciudad ?? ''}
        />

      </div>
    </main>
  )
}
