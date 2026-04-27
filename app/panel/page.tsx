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
      <nav className="flex justify-between items-center px-4 py-3 max-w-6xl mx-auto border-b border-[#E8DFD8]">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={32} height={28} priority />
          <span className="font-bold text-lg">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
        <form action={cerrarSesion}>
          <button type="submit" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors border border-[#E8DFD8] px-3 py-1.5 rounded-full">
            Cerrar sesión
          </button>
        </form>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">

        {/* BIENVENIDA */}
        <div>
          <h1 className="text-2xl font-black">Hola, {perfil?.nombre ?? 'reformista'} 👋</h1>
          <p className="text-[#6B5B4E] text-sm mt-0.5">{perfil?.ciudad} · {perfil?.plan ?? 'Básico'}</p>
          {perfil?.plan_pagado && (
            <span className="inline-block mt-2 bg-green-50 border border-green-200 text-green-700 text-xs rounded-full px-3 py-1">
              ✅ Plan {perfil?.plan} activo
            </span>
          )}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Leads', valor: leads?.length ?? 0 },
            { label: 'Plan', valor: perfil?.plan ?? 'Básico' },
            { label: 'Estado', valor: perfil?.verificado ? 'Verificado' : 'Pendiente' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-3 sm:p-5 border border-[#E8DFD8] text-center">
              <div className="text-xl sm:text-2xl font-black text-[#C4531A] truncate">{s.valor}</div>
              <div className="text-xs text-[#6B5B4E] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* PERFIL */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8DFD8]">
          <h2 className="font-black text-lg mb-3">Tu perfil</h2>
          <div className="space-y-2 text-sm">
            {[
              { k: 'Nombre', v: perfil?.nombre },
              { k: 'Empresa', v: perfil?.empresa ?? '—' },
              { k: 'Teléfono', v: perfil?.telefono },
              { k: 'Ciudad', v: perfil?.ciudad },
              { k: 'Licencia', v: perfil?.licencia ? 'Sí' : 'No' },
              { k: 'Seguro RC', v: perfil?.seguro_rc ? 'Sí' : 'No' },
            ].map((r) => (
              <div key={r.k} className="flex justify-between border-b border-[#F0EAE4] pb-2 last:border-0 last:pb-0">
                <span className="text-[#6B5B4E]">{r.k}</span>
                <span className="font-semibold">{r.v}</span>
              </div>
            ))}
          </div>
          {perfil?.tipos_obra?.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide mb-2">Tipos de obra</p>
              <div className="flex flex-wrap gap-1.5">
                {perfil.tipos_obra.map((t: string) => (
                  <span key={t} className="bg-[#F7F3EE] border border-[#E8DFD8] text-xs px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* LEADS */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8DFD8]">
          <h2 className="font-black text-lg mb-3">Trabajos en tu zona — {perfil?.ciudad}</h2>
          {!leads || leads.length === 0 ? (
            <p className="text-[#6B5B4E] text-sm py-6 text-center">
              Aún no hay solicitudes en tu zona. Te notificaremos en cuanto llegue alguna.
            </p>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div key={lead.id} className="border border-[#E8DFD8] rounded-xl p-3">

                  {/* Tipo + estimación */}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div>
                      <span className="font-bold capitalize">{lead.tipo_reforma ?? 'Reforma'}</span>
                      <span className="text-[#6B5B4E] text-xs ml-1">· {lead.ciudad}</span>
                    </div>
                    {lead.total_min && lead.total_max && (
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-[#6B5B4E] leading-none mb-0.5">Estimación</p>
                        <p className="text-[#C4531A] font-black text-sm leading-none">
                          {Number(lead.total_min).toLocaleString('es-ES')} –<br/>
                          {Number(lead.total_max).toLocaleString('es-ES')} €
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 text-xs text-[#6B5B4E] mb-2">
                    {lead.tipo_vivienda && <span className="bg-[#F0EAE4] px-2 py-0.5 rounded-full">{lead.tipo_vivienda}</span>}
                    {lead.metros && <span>{lead.metros} m²</span>}
                    {lead.calidad && <span>· {lead.calidad}</span>}
                    {lead.cuando && <span>· {lead.cuando}</span>}
                    <span>· {new Date(lead.creado_en).toLocaleDateString('es-ES')}</span>
                  </div>

                  {lead.presupuesto_orientativo && (
                    <p className="text-xs text-[#C4531A] mb-2">Presupuesto cliente: {lead.presupuesto_orientativo}</p>
                  )}

                  {lead.estancias?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {lead.estancias.map((e: string) => (
                        <span key={e} className="text-xs bg-[#F7F3EE] border border-[#E8DFD8] px-2 py-0.5 rounded-full">{e}</span>
                      ))}
                    </div>
                  )}

                  {/* Contacto */}
                  <div className="border-t border-[#F0EAE4] pt-2 mt-2 space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-semibold">{lead.nombre}</span>
                      <a href={`tel:${lead.telefono}`} className="text-[#C4531A] font-medium">{lead.telefono}</a>
                    </div>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="block text-xs text-[#6B5B4E] truncate">{lead.email}</a>
                    )}
                    <a
                      href={`/panel/presupuesto?lead=${lead.id}`}
                      className="mt-2 w-full block text-center bg-[#1C1208] text-white text-sm px-4 py-2 rounded-full hover:bg-[#C4531A] transition-colors"
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
