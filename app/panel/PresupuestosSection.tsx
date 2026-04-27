'use client'

import { useState } from 'react'

interface Partida {
  nombre: string
  importe: number
}

interface Presupuesto {
  id: string
  total: number
  notas?: string
  partidas?: Partida[]
  creado_en: string
  leads?: {
    tipo_reforma?: string
    ciudad?: string
    metros?: number
    nombre?: string
    telefono?: string
  }
}

function formatEur(n: number) {
  return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
}

export default function PresupuestosSection({ presupuestos }: { presupuestos: Presupuesto[] }) {
  const [abierto, setAbierto] = useState<string | null>(null)

  const esSubido = (p: Presupuesto) => p.notas?.includes('subido')

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-black text-xl">Presupuestos enviados</h2>
        <span className="text-xs text-[#6B5B4E]">{presupuestos.length} en total</span>
      </div>

      {presupuestos.length === 0 ? (
        <p className="text-[#6B5B4E] text-sm py-6 text-center">
          Aún no has enviado ningún presupuesto. Cuando lo hagas aparecerán aquí.
        </p>
      ) : (
        <div className="space-y-3">
          {presupuestos.map((p) => {
            const lead = p.leads
            const expandido = abierto === p.id

            return (
              <div key={p.id} className="border border-[#E8DFD8] rounded-xl overflow-hidden">
                {/* Fila principal */}
                <button
                  onClick={() => setAbierto(expandido ? null : p.id)}
                  className="w-full text-left px-4 py-4 flex flex-wrap items-center gap-3 hover:bg-[#F7F3EE] transition-colors"
                >
                  {/* Tipo + ciudad */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {lead?.tipo_reforma ?? 'Reforma'}
                      {lead?.ciudad && <span className="text-[#6B5B4E] font-normal"> · {lead.ciudad}</span>}
                    </p>
                    <p className="text-xs text-[#6B5B4E] mt-0.5">
                      {lead?.nombre && <span>{lead.nombre}</span>}
                      {lead?.metros && <span> · {lead.metros} m²</span>}
                      <span> · {new Date(p.creado_en).toLocaleDateString('es-ES')}</span>
                    </p>
                  </div>

                  {/* Badge tipo */}
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium shrink-0 ${
                    esSubido(p)
                      ? 'bg-gray-50 text-gray-500 border-gray-200'
                      : 'bg-[#FDF0EB] text-[#C4531A] border-[#F5C9AE]'
                  }`}>
                    {esSubido(p) ? 'PDF propio' : 'Calculado'}
                  </span>

                  {/* Total */}
                  {p.total > 0 && (
                    <span className="text-[#C4531A] font-black text-base shrink-0">
                      {formatEur(p.total)}
                    </span>
                  )}

                  {/* Chevron */}
                  <svg
                    className={`w-4 h-4 text-[#6B5B4E] transition-transform shrink-0 ${expandido ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Desglose expandido */}
                {expandido && p.partidas && p.partidas.length > 0 && (
                  <div className="border-t border-[#F0EAE4] px-4 py-4 bg-[#FDFAF7]">
                    <p className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide mb-3">Desglose por capítulos</p>
                    <div className="space-y-1.5">
                      {p.partidas.filter((c) => c.importe > 0).map((c) => (
                        <div key={c.nombre} className="flex justify-between text-sm">
                          <span className="text-[#6B5B4E]">{c.nombre}</span>
                          <span className="font-semibold">{formatEur(c.importe)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-black text-base mt-3 pt-3 border-t border-[#E8DFD8]">
                      <span>Total (PEC + IVA)</span>
                      <span className="text-[#C4531A]">{formatEur(p.total)}</span>
                    </div>
                    {lead?.telefono && (
                      <div className="mt-3 pt-3 border-t border-[#E8DFD8]">
                        <a href={`tel:${lead.telefono}`} className="text-sm text-[#C4531A] hover:underline">
                          {lead.telefono}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
