'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

const capitulos = [
  'Demolición y gestión de residuos',
  'Albañilería y tabiquería',
  'Fontanería',
  'Electricidad',
  'Carpintería',
  'Suelos y alicatados',
  'Pintura',
  'Cocina',
  'Baños',
  'Otros / Imprevistos',
]

function PresupuestoForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const leadId = searchParams.get('lead') ?? ''

  const [partidas, setPartidas] = useState<Record<string, string>>(
    Object.fromEntries(capitulos.map((c) => [c, '']))
  )
  const [plazo, setPlazo] = useState('')
  const [garantia, setGarantia] = useState('')
  const [notas, setNotas] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const total = Object.values(partidas).reduce((sum, v) => sum + (Number(v) || 0), 0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!leadId) { setError('Lead no identificado.'); return }
    if (total === 0) { setError('Introduce al menos una partida con importe.'); return }

    setEnviando(true)
    setError('')
    const res = await fetch('/api/presupuestos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, partidas, plazo, garantia, notas, total }),
    })
    setEnviando(false)
    if (res.ok) {
      setEnviado(true)
    } else {
      setError('Error al enviar. Inténtalo de nuevo.')
    }
  }

  if (enviado) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-[#1C1208] mb-3">¡Presupuesto enviado!</h2>
        <p className="text-[#6B5B4E] mb-8">Revisaremos tu propuesta y si es una de las 3 mejores la presentaremos al cliente.</p>
        <button onClick={() => router.push('/panel')} className="bg-[#C4531A] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#A84414] transition-colors">
          Volver al panel
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 py-10 px-5">
      <div>
        <h1 className="text-3xl font-black text-[#1C1208] mb-1">Enviar presupuesto</h1>
        <p className="text-[#6B5B4E]">Detalla cada partida. Elegiremos los 3 mejores para presentar al cliente.</p>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}

      {/* PARTIDAS */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8] space-y-3">
        <h2 className="font-bold text-lg mb-2">Desglose por capítulos</h2>
        {capitulos.map((cap) => (
          <div key={cap} className="flex items-center gap-4">
            <label className="flex-1 text-sm text-[#3D3228]">{cap}</label>
            <div className="relative w-36">
              <input
                type="number"
                min="0"
                placeholder="0"
                value={partidas[cap]}
                onChange={(e) => setPartidas((p) => ({ ...p, [cap]: e.target.value }))}
                className="w-full border border-[#E8DFD8] rounded-xl px-3 py-2 pr-8 text-right focus:outline-none focus:border-[#C4531A] text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B5B4E]">€</span>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4 border-t border-[#E8DFD8]">
          <span className="font-bold">TOTAL</span>
          <span className="text-2xl font-black text-[#C4531A]">{total.toLocaleString('es-ES')} €</span>
        </div>
      </div>

      {/* CONDICIONES */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8] space-y-4">
        <h2 className="font-bold text-lg">Condiciones</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">Plazo de ejecución</label>
            <input type="text" placeholder="Ej: 6 semanas" value={plazo} onChange={(e) => setPlazo(e.target.value)}
              className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">Garantía</label>
            <input type="text" placeholder="Ej: 2 años" value={garantia} onChange={(e) => setGarantia(e.target.value)}
              className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">Notas adicionales</label>
          <textarea rows={3} placeholder="Materiales incluidos, condiciones de pago, etc." value={notas} onChange={(e) => setNotas(e.target.value)}
            className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A] resize-none" />
        </div>
      </div>

      <button type="submit" disabled={enviando}
        className="w-full bg-[#C4531A] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#A84414] transition-colors disabled:opacity-60">
        {enviando ? 'Enviando…' : 'Enviar presupuesto →'}
      </button>
    </form>
  )
}

export default function PresupuestoPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE]">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto border-b border-[#E8DFD8]">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-bold text-[#1C1208]">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
        <a href="/panel" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors">← Volver al panel</a>
      </nav>
      <Suspense>
        <PresupuestoForm />
      </Suspense>
    </main>
  )
}
