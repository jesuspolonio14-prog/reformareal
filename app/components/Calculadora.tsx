'use client'

import { useState } from 'react'
import { calcularEstimacion, formatEur } from '@/lib/estimacion'
import type { TipoReforma, Calidad, ResultadoEstimacion } from '@/lib/estimacion'

type EstadoCalc = 'form' | 'calculando' | 'resultado'
type EstadoLead = 'idle' | 'enviando' | 'ok' | 'error'

export default function Calculadora() {
  // Estado del flujo principal
  const [estado, setEstado] = useState<EstadoCalc>('form')
  const [metros, setMetros] = useState('')
  const [ciudad, setCiudad] = useState('Madrid')
  const [tipo, setTipo] = useState<TipoReforma>('integral')
  const [calidad, setCalidad] = useState<Calidad>('media')
  const [resultado, setResultado] = useState<ResultadoEstimacion | null>(null)

  // Estado del formulario de lead
  const [showLead, setShowLead] = useState(false)
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [estadoLead, setEstadoLead] = useState<EstadoLead>('idle')

  function handleSubmitCalc(e: React.FormEvent) {
    e.preventDefault()
    const m = Number(metros)
    if (!m || m <= 0) return

    setEstado('calculando')
    setTimeout(() => {
      setResultado(calcularEstimacion({ metros: m, ciudad, tipo, calidad }))
      setEstado('resultado')
    }, 1600)
  }

  async function handleSubmitLead(e: React.FormEvent) {
    e.preventDefault()
    if (!resultado) return

    setEstadoLead('enviando')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          telefono,
          email,
          metros:      Number(metros),
          ciudad,
          tipo_reforma: tipo,
          calidad,
          total_min:   resultado.totalMin,
          total_max:   resultado.totalMax,
        }),
      })
      setEstadoLead(res.ok ? 'ok' : 'error')
    } catch {
      setEstadoLead('error')
    }
  }

  function resetear() {
    setEstado('form')
    setResultado(null)
    setShowLead(false)
    setEstadoLead('idle')
    setNombre('')
    setTelefono('')
    setEmail('')
  }

  return (
    <section id="calcular" className="bg-[#C4531A] py-20">
      <div className="max-w-2xl mx-auto px-6 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
          ¿Cuánto cuesta tu reforma?
        </h2>
        <p className="text-white/80 text-lg mb-10">
          Introduce los datos básicos y recibe un desglose real por capítulos. Gratis, sin registrarte.
        </p>

        {/* ── FORMULARIO CALCULADORA ── */}
        {estado === 'form' && (
          <form onSubmit={handleSubmitCalc} className="bg-white rounded-2xl p-8 text-left text-[#1C1208]">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  m² de la vivienda
                </label>
                <input
                  type="number"
                  placeholder="80"
                  min="5"
                  required
                  value={metros}
                  onChange={(e) => setMetros(e.target.value)}
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#C4531A]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Ciudad
                </label>
                <input
                  type="text"
                  placeholder="Madrid"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#C4531A]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Tipo de reforma
                </label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as TipoReforma)}
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#C4531A] bg-white"
                >
                  <option value="integral">Integral</option>
                  <option value="cocina">Cocina</option>
                  <option value="bano">Baño</option>
                  <option value="parcial">Parcial</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Calidad
                </label>
                <select
                  value={calidad}
                  onChange={(e) => setCalidad(e.target.value as Calidad)}
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#C4531A] bg-white"
                >
                  <option value="media">Media</option>
                  <option value="basica">Básica</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#C4531A] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#A84414] transition-colors"
            >
              Ver estimación de precio →
            </button>
            <p className="text-center text-xs text-[#6B5B4E] mt-3">
              Sin registro · Sin spam · Resultado inmediato
            </p>
          </form>
        )}

        {/* ── CARGANDO ── */}
        {estado === 'calculando' && (
          <div className="bg-white rounded-2xl p-8 text-[#1C1208]">
            <div className="flex flex-col items-center py-10">
              <div className="flex gap-2 mb-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-[#C4531A] rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <p className="text-lg font-semibold">Analizando tu reforma...</p>
              <p className="text-sm text-[#6B5B4E] mt-2">Calculando capítulos y rangos de precio</p>
            </div>
          </div>
        )}

        {/* ── RESULTADO ── */}
        {estado === 'resultado' && resultado && (
          <div className="bg-white rounded-2xl p-8 text-left text-[#1C1208]">
            {/* Total */}
            <div className="text-center mb-6 pb-6 border-b border-[#E8DFD8]">
              <p className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-widest mb-2">
                Estimación total
              </p>
              <p className="text-4xl font-black text-[#C4531A]">
                {formatEur(resultado.totalMin)} – {formatEur(resultado.totalMax)}
              </p>
              {resultado.precioM2Min > 0 && (
                <p className="text-sm text-[#6B5B4E] mt-1">
                  {formatEur(resultado.precioM2Min)} – {formatEur(resultado.precioM2Max)} / m²
                </p>
              )}
              <p className="text-xs text-[#B5A090] mt-3">
                Estimación orientativa · Varía según estado actual y acabados concretos
              </p>
            </div>

            {/* Capítulos */}
            <p className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-widest mb-4">
              Desglose por capítulos
            </p>
            <div className="space-y-4">
              {resultado.capitulos.map((cap) => (
                <div key={cap.nombre}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-medium">{cap.nombre}</span>
                    <span className="text-sm text-[#6B5B4E] ml-4 whitespace-nowrap">
                      {formatEur(cap.min)} – {formatEur(cap.max)}
                    </span>
                  </div>
                  <div className="h-2 bg-[#F0E8E0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C4531A] rounded-full"
                      style={{ width: `${cap.porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ── FORMULARIO LEAD ── */}
            <div className="mt-8">
              {!showLead && estadoLead === 'idle' && (
                <button
                  onClick={() => setShowLead(true)}
                  className="w-full bg-[#1C1208] text-white py-4 rounded-xl text-base font-bold hover:bg-[#2A1E10] transition-colors"
                >
                  Solicitar 3 presupuestos reales →
                </button>
              )}

              {showLead && estadoLead === 'idle' && (
                <form onSubmit={handleSubmitLead} className="border-t border-[#E8DFD8] pt-6">
                  <p className="font-bold text-[#1C1208] mb-1">
                    Te enviamos 3 reformistas verificados
                  </p>
                  <p className="text-sm text-[#6B5B4E] mb-5">
                    Sin spam. Solo reformistas con licencia y obras verificadas en tu zona.
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      required
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
                    />
                    <input
                      type="email"
                      placeholder="Email (opcional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full bg-[#C4531A] text-white py-4 rounded-xl font-bold hover:bg-[#A84414] transition-colors"
                  >
                    Quiero mis presupuestos →
                  </button>
                </form>
              )}

              {estadoLead === 'enviando' && (
                <div className="flex items-center justify-center gap-3 py-6 text-[#6B5B4E]">
                  <div className="w-5 h-5 border-2 border-[#C4531A] border-t-transparent rounded-full animate-spin" />
                  <span>Enviando solicitud...</span>
                </div>
              )}

              {estadoLead === 'ok' && (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">✓</div>
                  <p className="font-bold text-[#1C1208] text-lg">Solicitud recibida</p>
                  <p className="text-sm text-[#6B5B4E] mt-2">
                    En menos de 24 h te contactamos con tres reformistas verificados para tu zona.
                  </p>
                </div>
              )}

              {estadoLead === 'error' && (
                <div className="text-center py-4">
                  <p className="text-sm text-red-600">
                    Ha habido un error. Inténtalo de nuevo o escríbenos a hola@reformareal.com
                  </p>
                  <button
                    onClick={() => setEstadoLead('idle')}
                    className="mt-3 text-sm text-[#C4531A] underline"
                  >
                    Reintentar
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={resetear}
              className="mt-4 w-full text-[#6B5B4E] py-2 text-sm hover:text-[#1C1208] transition-colors"
            >
              ← Calcular otra reforma
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
