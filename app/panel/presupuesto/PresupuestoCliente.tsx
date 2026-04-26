'use client'

import { useState, useRef } from 'react'
import { formatEur, calcularM2Efectivos, CAPITULOS_INTEGRAL, CAPITULOS_PARCIAL, CAPITULOS_COCINA, CAPITULOS_BANO } from '@/lib/estimacion'

/* ── Tipos ── */
interface Lead {
  id: string
  tipo_vivienda?: string
  tipo_reforma?: string
  metros?: number
  ciudad?: string
  direccion?: string
  estancias?: string[]
  distribucion?: string
  instalaciones?: string
  calidad?: string
  cuando?: string
  presupuesto_orientativo?: string
  nombre?: string
  telefono?: string
}

interface Perfil {
  nombre: string
  empresa?: string
  telefono?: string
  email?: string
  precio_m2?: number
}

interface Capitulo {
  nombre: string
  porcentaje: number
  importe: number
  bloqueado?: boolean
  motivoBloqueo?: string
}

type Modo = 'elegir' | 'calcular' | 'upload'

const IVA = 0.21

function getCapitulos(tipoReforma: string) {
  const map: Record<string, { nombre: string; porcentaje: number }[]> = {
    'Integral':    CAPITULOS_INTEGRAL,
    'Parcial':     CAPITULOS_PARCIAL,
    'Solo cocina': CAPITULOS_COCINA,
    'Solo baño':   CAPITULOS_BANO,
  }
  return map[tipoReforma] ?? CAPITULOS_PARCIAL
}

function num(v: string) { return parseFloat(v.replace(',', '.')) || 0 }
function pct(v: string) { return Math.max(0, Math.min(100, parseFloat(v.replace(',', '.')) || 0)) }

/* ── Componente principal ── */
export default function PresupuestoCliente({ lead, perfil }: { lead: Lead; perfil: Perfil }) {
  const [modo, setModo] = useState<Modo>('elegir')
  const [precioInput, setPrecioInput] = useState(perfil.precio_m2?.toString() ?? '')
  const [capitulos, setCapitulos] = useState<Capitulo[]>([])
  const [calculado, setCalculado] = useState(false)
  // GG y BI editables (porcentaje y cantidad)
  const [ggPct, setGgPct] = useState('13')
  const [biPct, setBiPct] = useState('6')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // Cálculos derivados en tiempo real
  const pem = capitulos.reduce((s, c) => s + c.importe, 0)
  const gg = Math.round(pem * pct(ggPct) / 100)
  const bi = Math.round(pem * pct(biPct) / 100)
  const pec = pem + gg + bi
  const iva = Math.round(pec * IVA)
  const total = pec + iva

  const esFijo = lead.tipo_reforma === 'Solo cocina' || lead.tipo_reforma === 'Solo baño'
  const esParcial = lead.tipo_reforma === 'Parcial'

  // Calcular m² efectivos para reforma parcial
  const metrosTotales = lead.metros ?? 1
  const metrosEfectivos = esParcial
    ? calcularM2Efectivos(lead.estancias ?? [], metrosTotales)
    : metrosTotales

  const sinInstalaciones = lead.instalaciones === 'No'
  const sinDistribucion  = lead.distribucion  === 'No'

  function esInstalaciones(nombre: string) {
    const n = nombre.toLowerCase()
    return n.includes('fontaner') || n.includes('electricidad')
  }
  function esAlbanileria(nombre: string) {
    const n = nombre.toLowerCase()
    return n.includes('alba') || n.includes('tabiq')
  }

  function calcular() {
    const precio = num(precioInput)
    if (!precio) { setError('Introduce un precio válido.'); return }
    const pem = esFijo ? precio : precio * metrosEfectivos
    const defs = getCapitulos(lead.tipo_reforma ?? 'Integral')

    setCapitulos(defs.map((c) => {
      const bloqInstalaciones = sinInstalaciones && esInstalaciones(c.nombre)
      const bloqDistribucion  = sinDistribucion  && esAlbanileria(c.nombre)
      const bloqueado = bloqInstalaciones || bloqDistribucion
      return {
        nombre: c.nombre,
        porcentaje: c.porcentaje,
        importe: bloqueado ? 0 : Math.round(pem * c.porcentaje),
        bloqueado,
        motivoBloqueo: bloqInstalaciones
          ? 'El cliente indica que no se tocan instalaciones (fontanería/electricidad) en esta reforma.'
          : bloqDistribucion
          ? 'El cliente no requiere cambios de distribución, por lo que no hay albañilería de tabiquería.'
          : undefined,
      }
    }))
    setCalculado(true)
    setError('')
  }

  function updateCapitulo(i: number, valor: string) {
    setCapitulos((prev) => {
      if (prev[i].bloqueado) return prev
      const updated = [...prev]
      updated[i] = { ...updated[i], importe: num(valor) }
      return updated
    })
  }

  async function generarYEnviar() {
    if (capitulos.length === 0) { setError('Calcula primero el presupuesto.'); return }
    setEnviando(true)
    setError('')

    // Usar valores del estado reactivo
    // Generar PDF con jsPDF
    const { default: jsPDF } = await import('jspdf')
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })

    const W = 210
    const margin = 20
    let y = 20

    // Cabecera
    doc.setFillColor(196, 83, 26)
    doc.rect(0, 0, W, 30, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('PRESUPUESTO DE OBRA', margin, 14)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text('Presupuesto orientativo — sujeto a visita previa al inmueble', margin, 22)
    y = 40

    // Datos del trabajo
    doc.setTextColor(28, 18, 8)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('DATOS DE LA REFORMA', margin, y); y += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const info = [
      ['Tipo de reforma', lead.tipo_reforma ?? '—'],
      ['Tipo de inmueble', lead.tipo_vivienda ?? '—'],
      ['Superficie', lead.metros ? `${lead.metros} m²` : '—'],
      ['Ciudad', lead.ciudad ?? '—'],
      ['Dirección', lead.direccion ?? '—'],
      ['Estancias', (lead.estancias ?? []).join(', ') || '—'],
      ['Calidad', lead.calidad ?? '—'],
    ]
    info.forEach(([k, v]) => {
      doc.setFont('helvetica', 'bold'); doc.text(`${k}:`, margin, y)
      doc.setFont('helvetica', 'normal'); doc.text(v, 70, y)
      y += 5.5
    })
    y += 4

    // Datos del reformista
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('ELABORADO POR', margin, y); y += 6
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(`${perfil.nombre}${perfil.empresa ? ` · ${perfil.empresa}` : ''}`, margin, y); y += 5
    if (perfil.telefono) { doc.text(`Tel: ${perfil.telefono}`, margin, y); y += 5 }
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, margin, y); y += 8

    // Línea separadora
    doc.setDrawColor(232, 223, 216)
    doc.line(margin, y, W - margin, y); y += 6

    // Capítulos
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('DESGLOSE POR CAPÍTULOS', margin, y); y += 6
    doc.setFontSize(9)

    capitulos.forEach((c, i) => {
      if (y > 250) { doc.addPage(); y = 20 }
      const num_str = String(i + 1).padStart(2, '0')
      doc.setFont('helvetica', 'bold')
      doc.text(`Cap. ${num_str} · ${c.nombre}`, margin, y)
      doc.setFont('helvetica', 'normal')
      doc.text(formatEur(c.importe), W - margin, y, { align: 'right' })
      y += 5.5
    })

    // Línea
    doc.setDrawColor(196, 83, 26)
    doc.line(margin, y, W - margin, y); y += 5

    // Totales (usando valores editados por el reformista)
    const totalesData = [
      { label: 'PEM — Presupuesto de Ejecución Material', valor: pem, bold: true },
      { label: `Gastos Generales (${pct(ggPct)}%)`, valor: gg, bold: false },
      { label: `Beneficio Industrial (${pct(biPct)}%)`, valor: bi, bold: false },
      { label: 'PEC — Presupuesto de Ejecución por Contrata', valor: pec, bold: true },
      { label: `IVA (${Math.round(IVA * 100)}%)`, valor: iva, bold: false },
    ]

    totalesData.forEach(({ label, valor, bold }) => {
      doc.setFont('helvetica', bold ? 'bold' : 'normal')
      doc.text(label, margin, y)
      doc.text(formatEur(valor), W - margin, y, { align: 'right' })
      y += 5.5
    })

    // Total final con fondo
    y += 2
    doc.setFillColor(28, 18, 8)
    doc.rect(margin, y - 4, W - margin * 2, 9, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('TOTAL (PEC + IVA)', margin + 3, y + 2)
    doc.text(formatEur(total), W - margin - 3, y + 2, { align: 'right' })
    y += 16

    // Nota importante
    doc.setTextColor(107, 91, 78)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'italic')
    const nota = '⚠ NOTA IMPORTANTE: Este presupuesto es orientativo y ha sido elaborado a partir de los datos facilitados por el cliente a través de ReformaReal. Para un presupuesto definitivo y preciso será necesaria una visita presencial al inmueble. El precio final puede variar según el estado actual, los acabados elegidos y las condiciones de acceso.'
    const lines = doc.splitTextToSize(nota, W - margin * 2)
    doc.text(lines, margin, y)

    // Pie
    const pageCount = doc.getNumberOfPages()
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p)
      doc.setFontSize(7)
      doc.setTextColor(180, 160, 144)
      doc.setFont('helvetica', 'normal')
      doc.text('Generado con ReformaReal · reformareal.com', margin, 290)
      doc.text(`Pág. ${p}/${pageCount}`, W - margin, 290, { align: 'right' })
    }

    const base64 = doc.output('datauristring').split(',')[1]

    // Enviar
    const res = await fetch('/api/presupuestos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: lead.id,
        tipo: 'calculado',
        pdfBase64: base64,
        total,
        resumen: { pem, pec, total, capitulos: capitulos.map((c) => ({ nombre: c.nombre, importe: c.importe })) },
      }),
    })
    setEnviando(false)
    if (res.ok) setEnviado(true)
    else setError('Error al enviar. Inténtalo de nuevo.')
  }

  async function enviarPdf() {
    if (!pdfFile) { setError('Selecciona un PDF primero.'); return }
    setEnviando(true)
    setError('')
    const reader = new FileReader()
    reader.onload = async (e) => {
      const base64 = (e.target?.result as string).split(',')[1]
      const res = await fetch('/api/presupuestos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, tipo: 'subido', pdfBase64: base64, nombre: pdfFile.name }),
      })
      setEnviando(false)
      if (res.ok) setEnviado(true)
      else setError('Error al enviar. Inténtalo de nuevo.')
    }
    reader.readAsDataURL(pdfFile)
  }

  if (enviado) {
    return (
      <div className="text-center py-16 px-5">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-[#1C1208] mb-3">¡Presupuesto enviado!</h2>
        <p className="text-[#6B5B4E] max-w-sm mx-auto mb-8">
          Hemos recibido tu presupuesto. Si es uno de los 3 mejores, lo presentaremos al cliente para que contacte contigo y acordéis una visita para el presupuesto definitivo.
        </p>
        <a href="/panel" className="bg-[#C4531A] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#A84414] transition-colors">
          Volver al panel
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-[#1C1208] mb-1">Enviar presupuesto</h1>
        <p className="text-[#6B5B4E] text-sm">
          Este presupuesto es <strong>orientativo</strong>. Si el cliente te elige, visitaréis el inmueble juntos para el presupuesto definitivo.
        </p>
      </div>

      {/* RESUMEN DEL LEAD */}
      <div className="bg-[#1C1208] text-[#F7F3EE] rounded-2xl p-5 text-sm">
        <p className="text-[#C4531A] text-xs font-semibold uppercase tracking-wide mb-3">La solicitud</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          {[
            ['Tipo', lead.tipo_reforma],
            ['Inmueble', lead.tipo_vivienda],
            ['Metros', lead.metros ? `${lead.metros} m²` : '—'],
            ['Ciudad', lead.ciudad],
            ['Calidad', lead.calidad],
            ['Cuándo', lead.cuando],
          ].map(([k, v]) => v && (
            <div key={k} className="flex gap-2">
              <span className="text-[#B5A090]">{k}:</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
        {lead.estancias?.length ? (
          <p className="mt-2 text-[#B5A090]">Estancias: <span className="text-white">{lead.estancias.join(', ')}</span></p>
        ) : null}
        {lead.presupuesto_orientativo && (
          <p className="mt-2 text-[#B5A090]">Presupuesto cliente: <span className="text-[#C4531A] font-bold">{lead.presupuesto_orientativo}</span></p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      {/* ELEGIR MODO */}
      {modo === 'elegir' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setModo('calcular')}
            className="flex flex-col items-center gap-3 bg-white border-2 border-[#E8DFD8] rounded-2xl p-8 hover:border-[#C4531A] transition-colors group text-center"
          >
            <div className="w-14 h-14 bg-[#C4531A] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-black text-[#1C1208] text-lg">Calcular con nuestra herramienta</p>
              <p className="text-sm text-[#6B5B4E] mt-1">Introduce tu precio/m² y generamos el desglose completo con PDF</p>
            </div>
          </button>

          <button
            onClick={() => setModo('upload')}
            className="flex flex-col items-center gap-3 bg-white border-2 border-[#E8DFD8] rounded-2xl p-8 hover:border-[#1C1208] transition-colors group text-center"
          >
            <div className="w-14 h-14 bg-[#1C1208] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div>
              <p className="font-black text-[#1C1208] text-lg">Subir mi propio PDF</p>
              <p className="text-sm text-[#6B5B4E] mt-1">Sube directamente tu presupuesto detallado en PDF</p>
            </div>
          </button>
        </div>
      )}

      {/* MODO CALCULAR */}
      {modo === 'calcular' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8]">
            <h2 className="font-bold text-lg mb-4">Tu precio de trabajo</h2>

            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  {esFijo ? 'Precio total para esta obra (€)' : 'Tu precio por m² (€/m²)'}
                </label>
                <input
                  type="number" min="1" placeholder={esFijo ? '8500' : '600'}
                  value={precioInput} onChange={(e) => setPrecioInput(e.target.value)}
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#C4531A]"
                />
                <p className="text-xs text-[#6B5B4E] mt-1">
                  {esFijo
                    ? 'Precio total de ejecución material (PEM). Se añadirán GG, BI e IVA automáticamente.'
                    : esParcial
                      ? `Reforma parcial: se usan ${metrosEfectivos} m² efectivos de ${metrosTotales} m² totales según las estancias seleccionadas. PEM estimado: ${precioInput ? formatEur(num(precioInput) * metrosEfectivos) : '—'}`
                      : `Para ${metrosTotales} m² → PEM total: ${precioInput ? formatEur(num(precioInput) * metrosTotales) : '—'}. Se añadirán GG (13%), BI (6%) e IVA (21%).`}
                </p>
                {esParcial && lead.estancias && lead.estancias.length > 0 && (
                  <p className="text-xs text-[#C4531A] mt-1">
                    Estancias: {lead.estancias.join(', ')}
                  </p>
                )}
              </div>
              <button
                onClick={calcular}
                className="bg-[#C4531A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#A84414] transition-colors whitespace-nowrap"
              >
                Calcular →
              </button>
            </div>
          </div>

          {calculado && capitulos.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8] space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg">Desglose por capítulos</h2>
                  <span className="text-xs text-[#6B5B4E]">Puedes editar los importes</span>
                </div>

                <div className="space-y-2">
                  {capitulos.map((c, i) => (
                    <div key={c.nombre}>
                      <div className={`flex items-center gap-3 rounded-xl px-3 py-2 ${c.bloqueado ? 'bg-gray-50' : ''}`}>
                        <span className="text-xs text-[#6B5B4E] w-4 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                        <span className={`flex-1 text-sm ${c.bloqueado ? 'text-gray-400 line-through' : ''}`}>
                          {c.nombre}
                        </span>
                        {c.bloqueado && (
                          <span title={c.motivoBloqueo} className="text-gray-400 text-base shrink-0">🔒</span>
                        )}
                        <div className="relative w-32">
                          <input
                            type="number"
                            value={c.importe}
                            disabled={c.bloqueado}
                            onChange={(e) => updateCapitulo(i, e.target.value)}
                            className={`w-full border rounded-lg px-3 py-1.5 pr-6 text-right text-sm focus:outline-none transition-colors ${
                              c.bloqueado
                                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'border-[#E8DFD8] focus:border-[#C4531A]'
                            }`}
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#6B5B4E]">€</span>
                        </div>
                      </div>
                      {c.bloqueado && c.motivoBloqueo && (
                        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mt-1 ml-7">
                          ⚠ {c.motivoBloqueo}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Totales con GG y BI editables */}
                <div className="border-t border-[#E8DFD8] pt-4 space-y-3 text-sm">

                  {/* PEM */}
                  <div className="flex justify-between font-bold text-base">
                    <span>PEM — Presupuesto de Ejecución Material</span>
                    <span>{formatEur(pem)}</span>
                  </div>

                  {/* GG editable */}
                  <div className="flex items-center gap-2 bg-[#F7F3EE] rounded-xl px-4 py-3">
                    <span className="flex-1 text-[#6B5B4E]">Gastos Generales (GG)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number" min="0" max="100" step="0.5"
                        value={ggPct}
                        onChange={(e) => setGgPct(e.target.value)}
                        className="w-16 border border-[#E8DFD8] rounded-lg px-2 py-1 text-right text-sm focus:outline-none focus:border-[#C4531A]"
                      />
                      <span className="text-[#6B5B4E] text-xs">%</span>
                    </div>
                    <div className="relative w-28">
                      <input
                        type="number" min="0"
                        value={gg}
                        onChange={(e) => {
                          const amt = num(e.target.value)
                          setGgPct(pem > 0 ? ((amt / pem) * 100).toFixed(2) : '0')
                        }}
                        className="w-full border border-[#E8DFD8] rounded-lg px-2 py-1 pr-6 text-right text-sm focus:outline-none focus:border-[#C4531A]"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#6B5B4E]">€</span>
                    </div>
                  </div>

                  {/* BI editable */}
                  <div className="flex items-center gap-2 bg-[#F7F3EE] rounded-xl px-4 py-3">
                    <span className="flex-1 text-[#6B5B4E]">Beneficio Industrial (BI)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number" min="0" max="100" step="0.5"
                        value={biPct}
                        onChange={(e) => setBiPct(e.target.value)}
                        className="w-16 border border-[#E8DFD8] rounded-lg px-2 py-1 text-right text-sm focus:outline-none focus:border-[#C4531A]"
                      />
                      <span className="text-[#6B5B4E] text-xs">%</span>
                    </div>
                    <div className="relative w-28">
                      <input
                        type="number" min="0"
                        value={bi}
                        onChange={(e) => {
                          const amt = num(e.target.value)
                          setBiPct(pem > 0 ? ((amt / pem) * 100).toFixed(2) : '0')
                        }}
                        className="w-full border border-[#E8DFD8] rounded-lg px-2 py-1 pr-6 text-right text-sm focus:outline-none focus:border-[#C4531A]"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#6B5B4E]">€</span>
                    </div>
                  </div>

                  {/* PEC */}
                  <div className="flex justify-between font-bold border-t border-[#E8DFD8] pt-2">
                    <span>PEC — Presupuesto de Ejecución por Contrata</span>
                    <span>{formatEur(pec)}</span>
                  </div>

                  {/* IVA */}
                  <div className="flex justify-between text-[#6B5B4E]">
                    <span>IVA (21%)</span>
                    <span>{formatEur(iva)}</span>
                  </div>

                  {/* TOTAL */}
                  <div className="flex justify-between font-black text-lg bg-[#1C1208] text-white rounded-xl px-4 py-3">
                    <span>TOTAL (PEC + IVA)</span>
                    <span className="text-[#C4531A]">{formatEur(total)}</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
                  ⚠ Recuerda: este presupuesto es <strong>orientativo</strong>. El precio definitivo se acordará tras la visita al inmueble.
                </div>

                <button
                  onClick={generarYEnviar}
                  disabled={enviando}
                  className="w-full bg-[#C4531A] text-white py-4 rounded-xl font-bold hover:bg-[#A84414] transition-colors disabled:opacity-60"
                >
                  {enviando ? 'Generando PDF y enviando…' : 'Generar PDF y enviar presupuesto →'}
                </button>
              </div>
          )}

          <button onClick={() => setModo('elegir')} className="text-sm text-[#6B5B4E] hover:text-[#1C1208]">
            ← Cambiar opción
          </button>
        </div>
      )}

      {/* MODO UPLOAD */}
      {modo === 'upload' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8]">
            <h2 className="font-bold text-lg mb-4">Sube tu presupuesto en PDF</h2>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-2xl p-10 text-center transition-colors ${
                pdfFile ? 'border-[#C4531A] bg-[#FDF0EB]' : 'border-[#E8DFD8] hover:border-[#C4B8AE]'
              }`}
            >
              {pdfFile ? (
                <div>
                  <p className="text-2xl mb-2">📄</p>
                  <p className="font-bold text-[#1C1208]">{pdfFile.name}</p>
                  <p className="text-xs text-[#6B5B4E] mt-1">Clic para cambiar</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl mb-2">📎</p>
                  <p className="font-semibold text-[#1C1208]">Arrastra tu PDF aquí o haz clic</p>
                  <p className="text-xs text-[#6B5B4E] mt-1">Solo archivos PDF</p>
                </div>
              )}
            </button>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 mt-4">
              ⚠ Recuerda indicar en tu PDF que es un <strong>presupuesto orientativo</strong> sujeto a visita previa.
            </div>
          </div>

          <button
            onClick={enviarPdf}
            disabled={!pdfFile || enviando}
            className="w-full bg-[#1C1208] text-white py-4 rounded-xl font-bold hover:bg-[#2A1E10] transition-colors disabled:opacity-40"
          >
            {enviando ? 'Enviando…' : 'Enviar presupuesto PDF →'}
          </button>

          <button onClick={() => setModo('elegir')} className="text-sm text-[#6B5B4E] hover:text-[#1C1208]">
            ← Cambiar opción
          </button>
        </div>
      )}
    </div>
  )
}
