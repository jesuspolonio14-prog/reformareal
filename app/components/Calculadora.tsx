'use client'

import { useState } from 'react'
import { calcularEstimacion, calcularM2Efectivos, formatEur, type ResultadoEstimacion, type TipoReforma, type Calidad } from '@/lib/estimacion'

/* ── Tipos ── */
type Paso = 1 | 2 | 3 | 4

interface Datos {
  // Paso 1
  tipo_vivienda: string
  plantas: string
  metros: string
  ciudad: string
  direccion: string
  // Paso 2
  tipo_reforma: string
  estancias: string[]
  distribucion: string
  instalaciones: string
  // Paso 3
  calidad: string
  cuando: string
  presupuesto: string
  // Paso 4
  nombre: string
  telefono: string
  email: string
  notas: string
}

const inicial: Datos = {
  tipo_vivienda: '', plantas: '', metros: '', ciudad: '', direccion: '',
  tipo_reforma: '', estancias: [], distribucion: '', instalaciones: '',
  calidad: '', cuando: '', presupuesto: '',
  nombre: '', telefono: '', email: '', notas: '',
}

/* ── Helpers ── */
function BtnOpcion({
  activo, onClick, children, small,
}: { activo: boolean; onClick: () => void; children: React.ReactNode; small?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border-2 font-semibold transition-all text-left ${
        small ? 'px-4 py-2 text-sm' : 'px-5 py-3'
      } ${
        activo
          ? 'border-[#C4531A] bg-[#FDF0EB] text-[#C4531A]'
          : 'border-[#E8DFD8] bg-white text-[#3D3228] hover:border-[#C4B8AE]'
      }`}
    >
      {children}
    </button>
  )
}

function CheckOpcion({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left w-full transition-all ${
        checked ? 'border-[#C4531A] bg-[#FDF0EB]' : 'border-[#E8DFD8] bg-white hover:border-[#C4B8AE]'
      }`}
    >
      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
        checked ? 'border-[#C4531A] bg-[#C4531A]' : 'border-[#C4B8AE]'
      }`}>
        {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
      </div>
      <span className="text-sm font-medium text-[#3D3228]">{label}</span>
    </button>
  )
}

/* ── Indicador de pasos ── */
const PASOS = ['El inmueble', 'La reforma', 'Expectativas', 'Contacto']

function Progreso({ paso }: { paso: Paso }) {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {PASOS.map((label, i) => {
        const num = (i + 1) as Paso
        const done = paso > num
        const active = paso === num
        return (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                done ? 'bg-[#C4531A] text-white' : active ? 'bg-[#1C1208] text-white' : 'bg-[#E8DFD8] text-[#6B5B4E]'
              }`}>
                {done ? '✓' : num}
              </div>
              <span className={`text-xs mt-1 hidden sm:block ${active ? 'text-[#1C1208] font-semibold' : 'text-[#6B5B4E]'}`}>
                {label}
              </span>
            </div>
            {i < PASOS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 ${done ? 'bg-[#C4531A]' : 'bg-[#E8DFD8]'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Componente principal ── */
export default function Calculadora() {
  const [paso, setPaso] = useState<Paso>(1)
  const [datos, setDatos] = useState<Datos>(inicial)
  const [estimacion, setEstimacion] = useState<ResultadoEstimacion | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  function calcularEstimacionActual() {
    const tipoMap: Record<string, TipoReforma> = {
      'Integral': 'integral', 'Parcial': 'parcial',
      'Solo cocina': 'cocina', 'Solo baño': 'bano',
    }
    const calidadMap: Record<string, Calidad> = {
      'Básico': 'basica', 'Estándar': 'media', 'Alto': 'premium',
    }
    const tipo = tipoMap[datos.tipo_reforma]
    const calidad = calidadMap[datos.calidad]
    const metrosTotales = Number(datos.metros)
    if (!tipo || !calidad || (!metrosTotales && tipo !== 'cocina' && tipo !== 'bano')) return
    // Para reforma parcial usamos los m² efectivos según estancias
    const metrosEfectivos = tipo === 'parcial'
      ? calcularM2Efectivos(datos.estancias, metrosTotales)
      : metrosTotales
    try {
      setEstimacion(calcularEstimacion({ metros: metrosEfectivos || 1, ciudad: datos.ciudad || 'Madrid', tipo, calidad }))
    } catch { /* sin estimación */ }
  }

  function set(campo: keyof Datos, valor: string) {
    setDatos((d) => ({ ...d, [campo]: valor }))
  }

  function toggleEstancia(e: string) {
    setDatos((d) => ({
      ...d,
      estancias: d.estancias.includes(e) ? d.estancias.filter((x) => x !== e) : [...d.estancias, e],
    }))
  }

  function validarPaso(): string {
    if (paso === 1) {
      if (!datos.tipo_vivienda) return 'Selecciona el tipo de vivienda.'
      if (!datos.metros) return 'Indica los metros aproximados.'
      if (!datos.ciudad) return 'Indica la ciudad o zona.'
    }
    if (paso === 2) {
      if (!datos.tipo_reforma) return 'Selecciona el tipo de reforma.'
      if (!datos.distribucion) return 'Indica si habrá cambios de distribución.'
      if (!datos.instalaciones) return 'Indica si se toca electricidad o fontanería.'
    }
    if (paso === 3) {
      if (!datos.calidad) return 'Selecciona el nivel de calidad.'
      if (!datos.cuando) return 'Indica cuándo quieres empezar.'
    }
    if (paso === 4) {
      if (!datos.nombre.trim()) return 'Introduce tu nombre.'
      if (!datos.telefono.trim() || datos.telefono.trim().length < 9) return 'Introduce un teléfono válido.'
    }
    return ''
  }

  function siguiente() {
    const err = validarPaso()
    if (err) { setError(err); return }
    setError('')
    if (paso === 3) calcularEstimacionActual()
    setPaso((p) => (p < 4 ? (p + 1) as Paso : p))
  }

  async function enviar() {
    const err = validarPaso()
    if (err) { setError(err); return }
    setError('')
    setEnviando(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre:       datos.nombre,
          telefono:     datos.telefono,
          email:        datos.email || null,
          metros:       Number(datos.metros) || null,
          ciudad:       datos.ciudad,
          direccion:    datos.direccion || null,
          tipo_vivienda: datos.tipo_vivienda,
          plantas:      datos.plantas || null,
          tipo_reforma: datos.tipo_reforma,
          estancias:    datos.estancias,
          distribucion: datos.distribucion,
          instalaciones: datos.instalaciones,
          calidad:      datos.calidad,
          cuando:       datos.cuando,
          presupuesto_orientativo: datos.presupuesto || null,
          notas:        datos.notas || null,
        }),
      })
      if (res.ok) setEnviado(true)
      else setError('Ha habido un error. Inténtalo de nuevo.')
    } catch {
      setError('Ha habido un error. Inténtalo de nuevo.')
    }
    setEnviando(false)
  }

  if (enviado) {
    return (
      <section id="calcular" className="bg-[#C4531A] py-20 px-5">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 className="text-2xl font-black text-[#1C1208] mb-3">¡Solicitud enviada!</h3>
            <p className="text-[#6B5B4E]">
              Recibirás hasta 3 presupuestos desglosados de reformistas verificados en tu zona. Sin compromiso.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="calcular" className="bg-[#C4531A] py-16 px-5">
      <div className="max-w-2xl mx-auto">
        <div className="text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-black mb-3">Solicita hasta 3 presupuestos</h2>
          <p className="text-white/80">Paso a paso, en menos de 3 minutos. Sin registrarte.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8">
          <Progreso paso={paso} />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          {/* ── PASO 1: EL INMUEBLE ── */}
          {paso === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-black text-[#1C1208]">El inmueble</h3>

              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-3">
                  ¿Qué tipo de vivienda es?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Piso', 'Dúplex', 'Casa', 'Local', 'Oficina', 'Otro'].map((t) => (
                    <BtnOpcion key={t} activo={datos.tipo_vivienda === t} onClick={() => set('tipo_vivienda', t)}>
                      {t}
                    </BtnOpcion>
                  ))}
                </div>
              </div>

              {datos.tipo_vivienda === 'Casa' && (
                <div>
                  <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-3">
                    ¿Cuántas plantas tiene?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['1', '2', '3', '4', 'Más de 4'].map((p) => (
                      <BtnOpcion key={p} activo={datos.plantas === p} onClick={() => set('plantas', p)} small>
                        {p}
                      </BtnOpcion>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                    Metros cuadrados aprox. <span className="text-[#C4531A]">*</span>
                  </label>
                  <input
                    type="number" min="1" placeholder="80"
                    value={datos.metros} onChange={(e) => set('metros', e.target.value)}
                    className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                    Ciudad o zona <span className="text-[#C4531A]">*</span>
                  </label>
                  <input
                    type="text" placeholder="Madrid"
                    value={datos.ciudad} onChange={(e) => set('ciudad', e.target.value)}
                    className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Dirección <span className="text-[#6B5B4E] font-normal normal-case">(opcional, ayuda al reformista)</span>
                </label>
                <input
                  type="text" placeholder="Calle Mayor 10, 2º A"
                  value={datos.direccion} onChange={(e) => set('direccion', e.target.value)}
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
                />
              </div>
            </div>
          )}

          {/* ── PASO 2: LA REFORMA ── */}
          {paso === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-black text-[#1C1208]">La reforma</h3>

              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-3">
                  ¿Qué tipo de reforma buscas?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Integral', 'Parcial', 'Solo cocina', 'Solo baño', 'Otra'].map((t) => (
                    <BtnOpcion key={t} activo={datos.tipo_reforma === t} onClick={() => set('tipo_reforma', t)}>
                      {t}
                    </BtnOpcion>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-3">
                  ¿Qué estancias vas a reformar?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Cocina', 'Baños', 'Dormitorios', 'Salón / Comedor', 'Terraza / Exterior', 'Pasillo / Entrada', 'Toda la vivienda', 'Fachada'].map((e) => (
                    <CheckOpcion
                      key={e} label={e}
                      checked={datos.estancias.includes(e)}
                      onChange={() => toggleEstancia(e)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-3">
                  ¿Habrá cambios de distribución?
                </label>
                <div className="flex gap-2">
                  {['Sí', 'No', 'No lo sé'].map((o) => (
                    <BtnOpcion key={o} activo={datos.distribucion === o} onClick={() => set('distribucion', o)}>
                      {o}
                    </BtnOpcion>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-3">
                  ¿Se toca instalación eléctrica o fontanería?
                </label>
                <div className="flex gap-2">
                  {['Sí', 'No', 'No lo sé'].map((o) => (
                    <BtnOpcion key={o} activo={datos.instalaciones === o} onClick={() => set('instalaciones', o)}>
                      {o}
                    </BtnOpcion>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PASO 3: EXPECTATIVAS ── */}
          {paso === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-black text-[#1C1208]">Expectativas</h3>

              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-3">
                  ¿Qué nivel de calidad buscas?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'Básico',    desc: 'Materiales funcionales, buen precio' },
                    { key: 'Estándar',  desc: 'Buena relación calidad-precio' },
                    { key: 'Alto',      desc: 'Materiales premium, acabados excelentes' },
                  ].map(({ key, desc }) => (
                    <button
                      key={key} type="button"
                      onClick={() => set('calidad', key)}
                      className={`rounded-xl border-2 p-4 text-left transition-all ${
                        datos.calidad === key
                          ? 'border-[#C4531A] bg-[#FDF0EB]'
                          : 'border-[#E8DFD8] bg-white hover:border-[#C4B8AE]'
                      }`}
                    >
                      <p className={`font-bold mb-1 ${datos.calidad === key ? 'text-[#C4531A]' : 'text-[#1C1208]'}`}>{key}</p>
                      <p className="text-xs text-[#6B5B4E] leading-tight">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-3">
                  ¿Cuándo te gustaría empezar?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Antes de 1 mes', '1 – 3 meses', 'Más adelante', 'Solo quiero precio'].map((o) => (
                    <BtnOpcion key={o} activo={datos.cuando === o} onClick={() => set('cuando', o)}>
                      {o}
                    </BtnOpcion>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-3">
                  ¿Tienes un presupuesto orientativo en mente?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Menos de 10.000 €', '10.000 – 30.000 €', '30.000 – 60.000 €', '60.000 – 100.000 €', 'Más de 100.000 €', 'No lo sé todavía'].map((o) => (
                    <BtnOpcion key={o} activo={datos.presupuesto === o} onClick={() => set('presupuesto', o)} small>
                      {o}
                    </BtnOpcion>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PASO 4: CONTACTO ── */}
          {paso === 4 && (
            <div className="space-y-5">
              <h3 className="text-xl font-black text-[#1C1208]">Tus datos de contacto</h3>

              {/* ESTIMACIÓN ORIENTATIVA */}
              {estimacion && (
                <div className="bg-[#FDF0EB] border-2 border-[#C4531A] rounded-2xl p-5">
                  <p className="text-xs font-semibold text-[#C4531A] uppercase tracking-wide mb-2">
                    Estimación orientativa para tu reforma
                  </p>
                  <p className="text-3xl font-black text-[#1C1208] mb-1">
                    {formatEur(estimacion.totalMin)} – {formatEur(estimacion.totalMax)}
                  </p>
                  {estimacion.precioM2Min > 0 && (
                    <p className="text-sm text-[#6B5B4E] mb-3">
                      {formatEur(estimacion.precioM2Min)} – {formatEur(estimacion.precioM2Max)} / m²
                    </p>
                  )}
                  <div className="space-y-2">
                    {estimacion.capitulos.map((c) => (
                      <div key={c.nombre}>
                        <div className="flex justify-between text-xs text-[#6B5B4E] mb-0.5">
                          <span>{c.nombre}</span>
                          <span>{formatEur(c.min)} – {formatEur(c.max)}</span>
                        </div>
                        <div className="h-1.5 bg-[#E8DFD8] rounded-full overflow-hidden">
                          <div className="h-full bg-[#C4531A] rounded-full" style={{ width: `${c.porcentaje}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#6B5B4E] mt-3">
                    Estimación orientativa · Los presupuestos reales pueden variar según el estado actual y los materiales elegidos.
                  </p>
                </div>
              )}

              <p className="text-sm text-[#6B5B4E]">Los reformistas te contactarán con su presupuesto desglosado. Sin spam.</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                    Nombre <span className="text-[#C4531A]">*</span>
                  </label>
                  <input type="text" placeholder="María García"
                    value={datos.nombre} onChange={(e) => set('nombre', e.target.value)}
                    className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                    Teléfono <span className="text-[#C4531A]">*</span>
                  </label>
                  <input type="tel" placeholder="612 345 678"
                    value={datos.telefono} onChange={(e) => set('telefono', e.target.value)}
                    className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Email <span className="text-[#6B5B4E] font-normal normal-case">(opcional)</span>
                </label>
                <input type="email" placeholder="maria@ejemplo.com"
                  value={datos.email} onChange={(e) => set('email', e.target.value)}
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Algún apunte adicional <span className="text-[#6B5B4E] font-normal normal-case">(opcional)</span>
                </label>
                <textarea rows={3} placeholder="Estado actual de la vivienda, preferencias de materiales, acceso..."
                  value={datos.notas} onChange={(e) => set('notas', e.target.value)}
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A] resize-none"
                />
              </div>
            </div>
          )}

          {/* ── NAVEGACIÓN ── */}
          <div className="flex gap-3 mt-8">
            {paso > 1 && (
              <button
                type="button"
                onClick={() => { setError(''); setPaso((p) => (p - 1) as Paso) }}
                className="px-6 py-3 rounded-xl border-2 border-[#E8DFD8] text-[#6B5B4E] font-semibold hover:border-[#1C1208] hover:text-[#1C1208] transition-colors"
              >
                ← Anterior
              </button>
            )}
            {paso < 4 ? (
              <button
                type="button"
                onClick={siguiente}
                className="flex-1 bg-[#C4531A] text-white py-3 rounded-xl font-bold hover:bg-[#A84414] transition-colors"
              >
                Siguiente →
              </button>
            ) : (
              <button
                type="button"
                onClick={enviar}
                disabled={enviando}
                className="flex-1 bg-[#1C1208] text-white py-3 rounded-xl font-bold hover:bg-[#2A1E10] transition-colors disabled:opacity-60"
              >
                {enviando ? 'Enviando…' : 'Solicitar presupuestos →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
