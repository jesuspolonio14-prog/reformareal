'use client'

import { useState, useTransition } from 'react'
import { actualizarEstadoLead } from './actions'

type Estado = 'nuevo' | 'contactado' | 'visita' | 'adjudicado' | 'perdido'

const ESTADOS: { valor: Estado; label: string; color: string }[] = [
  { valor: 'nuevo',      label: 'Nuevo',      color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { valor: 'contactado', label: 'Contactado',  color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { valor: 'visita',     label: 'Visita',      color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { valor: 'adjudicado', label: 'Adjudicado',  color: 'bg-green-100 text-green-700 border-green-200' },
  { valor: 'perdido',    label: 'Perdido',     color: 'bg-gray-100 text-gray-500 border-gray-200' },
]

interface Lead {
  id: string
  tipo_reforma?: string
  tipo_vivienda?: string
  ciudad?: string
  metros?: number
  calidad?: string
  cuando?: string
  presupuesto_orientativo?: string
  total_min?: number
  total_max?: number
  nombre?: string
  telefono?: string
  email?: string
  estancias?: string[]
  creado_en: string
}

interface Seguimiento {
  lead_id: string
  estado: Estado
}

export default function LeadsSection({
  leads,
  seguimientos,
  ciudad,
}: {
  leads: Lead[]
  seguimientos: Seguimiento[]
  ciudad: string
}) {
  const [estados, setEstados] = useState<Record<string, Estado>>(() =>
    Object.fromEntries(seguimientos.map((s) => [s.lead_id, s.estado]))
  )
  const [pending, startTransition] = useTransition()
  const [actualizando, setActualizando] = useState<string | null>(null)

  function cambiarEstado(leadId: string, nuevoEstado: Estado) {
    setActualizando(leadId)
    const previo = estados[leadId]
    setEstados((prev) => ({ ...prev, [leadId]: nuevoEstado }))

    startTransition(async () => {
      const { error } = await actualizarEstadoLead(leadId, nuevoEstado)
      if (error) setEstados((prev) => ({ ...prev, [leadId]: previo ?? 'nuevo' }))
      setActualizando(null)
    })
  }

  const estadoActual = (leadId: string): Estado => estados[leadId] ?? 'nuevo'
  const infoEstado = (leadId: string) => ESTADOS.find((e) => e.valor === estadoActual(leadId))!

  const leadsActivos = leads.filter((l) => estadoActual(l.id) !== 'perdido')
  const leadsPerdidos = leads.filter((l) => estadoActual(l.id) === 'perdido')

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E8DFD8]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-black text-lg sm:text-xl">Trabajos — {ciudad}</h2>
        <div className="flex gap-2 text-xs text-[#6B5B4E]">
          <span>{leadsActivos.length} activos</span>
          {leadsPerdidos.length > 0 && <span>· {leadsPerdidos.length} perdidos</span>}
        </div>
      </div>

      {!leads || leads.length === 0 ? (
        <p className="text-[#6B5B4E] text-sm py-6 text-center">
          Aún no hay solicitudes en tu zona. Te notificaremos en cuanto llegue alguna.
        </p>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => {
            const info = infoEstado(lead.id)
            const esActualizando = actualizando === lead.id && pending
            const esPerdido = estadoActual(lead.id) === 'perdido'

            return (
              <div
                key={lead.id}
                className={`border rounded-xl p-4 transition-opacity ${
                  esPerdido ? 'opacity-50 border-gray-200' : 'border-[#E8DFD8]'
                }`}
              >
                {/* Cabecera */}
                <div className="mb-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold capitalize">{lead.tipo_reforma ?? 'Reforma'}</span>
                      <span className="text-[#6B5B4E] text-xs">· {lead.ciudad}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${info.color}`}>
                        {info.label}
                      </span>
                    </div>
                    {lead.total_min && lead.total_max && (
                      <p className="text-[#C4531A] font-black text-sm shrink-0">
                        {Number(lead.total_min).toLocaleString('es-ES')} – {Number(lead.total_max).toLocaleString('es-ES')} €
                      </p>
                    )}
                  </div>
                </div>

                {/* Datos */}
                <div className="flex flex-wrap gap-3 text-xs text-[#6B5B4E]">
                  {lead.tipo_vivienda && <span className="bg-[#F0EAE4] px-2 py-0.5 rounded-full">{lead.tipo_vivienda}</span>}
                  {lead.metros && <span>{lead.metros} m²</span>}
                  {lead.calidad && <span>Calidad {lead.calidad}</span>}
                  {lead.cuando && <span>· {lead.cuando}</span>}
                  {lead.presupuesto_orientativo && <span className="text-[#C4531A]">Budget: {lead.presupuesto_orientativo}</span>}
                  <span>{new Date(lead.creado_en).toLocaleDateString('es-ES')}</span>
                </div>

                {lead.estancias && lead.estancias.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {lead.estancias.map((e: string) => (
                      <span key={e} className="text-xs bg-[#F7F3EE] border border-[#E8DFD8] px-2 py-0.5 rounded-full">{e}</span>
                    ))}
                  </div>
                )}

                {/* Contacto + acciones */}
                <div className="mt-3 pt-3 border-t border-[#F0EAE4] space-y-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-semibold">{lead.nombre}</span>
                    <a href={`tel:${lead.telefono}`} className="text-[#C4531A] font-medium">{lead.telefono}</a>
                    {lead.email && <a href={`mailto:${lead.email}`} className="text-[#6B5B4E] text-xs truncate max-w-[180px]">{lead.email}</a>}
                  </div>
                  <a
                    href={`/panel/presupuesto?lead=${lead.id}`}
                    className="block w-full text-center bg-[#1C1208] text-white text-sm px-4 py-2.5 rounded-full hover:bg-[#C4531A] transition-colors font-medium"
                  >
                    Enviar presupuesto →
                  </a>
                </div>

                {/* Selector de estado */}
                <div className="mt-3 pt-3 border-t border-[#F0EAE4]">
                  <p className="text-xs text-[#6B5B4E] mb-2 font-medium">Estado del lead</p>
                  <div className="flex flex-wrap gap-2">
                    {ESTADOS.map((e) => (
                      <button
                        key={e.valor}
                        disabled={esActualizando}
                        onClick={() => cambiarEstado(lead.id, e.valor)}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                          estadoActual(lead.id) === e.valor
                            ? `${e.color} ring-2 ring-offset-1 ring-current`
                            : 'bg-white text-[#6B5B4E] border-[#E8DFD8] hover:border-[#C4531A] hover:text-[#C4531A]'
                        } disabled:opacity-50`}
                      >
                        {e.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
