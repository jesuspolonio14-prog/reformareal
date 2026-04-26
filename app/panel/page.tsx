import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { getSupabase } from '@/lib/supabase'
import { cerrarSesion } from './actions'

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

  // Leads de la misma ciudad usando clave admin
  const { data: leads, error: leadsError } = await admin
    .from('leads')
    .select('*')
    .ilike('ciudad', `%${perfil?.ciudad ?? ''}%`)
    .order('creado_en', { ascending: false })
    .limit(10)

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
        <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8]">
          <h2 className="font-black text-xl mb-4">Tu perfil</h2>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            {[
              { k: 'Nombre', v: perfil?.nombre },
              { k: 'Empresa', v: perfil?.empresa ?? '—' },
              { k: 'Teléfono', v: perfil?.telefono },
              { k: 'Ciudad', v: perfil?.ciudad },
              { k: 'Licencia', v: perfil?.licencia ? 'Sí' : 'No' },
              { k: 'Seguro RC', v: perfil?.seguro_rc ? 'Sí' : 'No' },
            ].map((r) => (
              <div key={r.k} className="flex justify-between border-b border-[#F0EAE4] pb-2">
                <span className="text-[#6B5B4E]">{r.k}</span>
                <span className="font-semibold">{r.v}</span>
              </div>
            ))}
          </div>
          {perfil?.tipos_obra?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide mb-2">Tipos de obra</p>
              <div className="flex flex-wrap gap-2">
                {perfil.tipos_obra.map((t: string) => (
                  <span key={t} className="bg-[#F7F3EE] border border-[#E8DFD8] text-xs px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* LEADS */}
        <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8]">
          <h2 className="font-black text-xl mb-4">Trabajos en tu zona — {perfil?.ciudad}</h2>
          {!leads || leads.length === 0 ? (
            <p className="text-[#6B5B4E] text-sm py-6 text-center">
              Aún no hay solicitudes en tu zona. Te notificaremos en cuanto llegue alguna.
            </p>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="border border-[#E8DFD8] rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold">{lead.tipo_reforma ?? 'Reforma'}</span>
                      <span className="text-[#6B5B4E] text-sm ml-2">· {lead.ciudad}</span>
                    </div>
                    <span className="text-[#C4531A] font-black text-sm">
                      {lead.total_min && lead.total_max
                        ? `${Number(lead.total_min).toLocaleString('es-ES')} – ${Number(lead.total_max).toLocaleString('es-ES')} €`
                        : '—'}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-[#6B5B4E]">
                    {lead.metros && <span>{lead.metros} m²</span>}
                    {lead.calidad && <span>Calidad {lead.calidad}</span>}
                    <span>{new Date(lead.creado_en).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#F0EAE4] flex flex-wrap gap-3 items-center text-sm">
                    <span className="font-semibold">{lead.nombre}</span>
                    <a href={`tel:${lead.telefono}`} className="text-[#C4531A] hover:underline">{lead.telefono}</a>
                    {lead.email && <a href={`mailto:${lead.email}`} className="text-[#6B5B4E] hover:underline">{lead.email}</a>}
                    <a
                      href={`/panel/presupuesto?lead=${lead.id}`}
                      className="ml-auto bg-[#1C1208] text-white text-xs px-4 py-2 rounded-full hover:bg-[#C4531A] transition-colors"
                    >
                      Enviar presupuesto →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
