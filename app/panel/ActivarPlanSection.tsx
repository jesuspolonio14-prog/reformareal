'use client'

import { useState } from 'react'

const planes = [
  { key: 'basico', nombre: 'Básico',  precio: '19 €', desc: 'Ficha verificada + herramienta de presupuesto PDF' },
  { key: 'pro',    nombre: 'Pro',     precio: '49 €', desc: 'Posición destacada + leads directos a tu panel', popular: true },
  { key: 'elite',  nombre: 'Elite',   precio: '99 €', desc: 'Primero en tu provincia + panel de obra + analíticas' },
]

export default function ActivarPlanSection({ userId, email }: { userId: string; email: string }) {
  const [plan, setPlan] = useState('pro')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  async function activar() {
    setCargando(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, userId, email }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
      else setError('No se pudo iniciar el pago. Inténtalo de nuevo.')
    } catch {
      setError('Error de red. Inténtalo de nuevo.')
    }
    setCargando(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E8DFD8] p-6 sm:p-8">
      <p className="text-[#C4531A] text-sm font-semibold uppercase tracking-widest mb-2">Siguiente paso</p>
      <h2 className="text-2xl font-black mb-1">Activa tu plan y empieza a recibir leads</h2>
      <p className="text-[#6B5B4E] mb-6">
        Primer mes completamente gratis. Sin cargos hasta pasados 30 días. Cancela cuando quieras.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {planes.map((p) => {
          const activo = plan === p.key
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setPlan(p.key)}
              className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                activo ? 'border-[#C4531A] bg-[#FDF0EB]' : 'border-[#E8DFD8] bg-white hover:border-[#C4B8AE]'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-[#C4531A] text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                  Más elegido
                </span>
              )}
              <p className={`font-black text-lg ${activo ? 'text-[#C4531A]' : 'text-[#1C1208]'}`}>{p.nombre}</p>
              <p className="font-black text-2xl text-green-600 mt-1">
                0 € <span className="text-sm font-normal text-[#6B5B4E]">primer mes</span>
              </p>
              <p className="text-xs text-[#6B5B4E] mt-0.5">después {p.precio}/mes</p>
              <p className="text-xs text-[#6B5B4E] mt-3 leading-tight">{p.desc}</p>
              {activo && (
                <span className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-[#C4531A] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </button>
          )
        })}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <button
        onClick={activar}
        disabled={cargando}
        className="w-full bg-[#C4531A] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#A84414] transition-colors disabled:opacity-60"
      >
        {cargando ? 'Redirigiendo al pago…' : 'Activar plan gratis →'}
      </button>
      <p className="text-center text-xs text-[#6B5B4E] mt-3">
        Pago seguro con Stripe · Sin cargos durante 30 días
      </p>
    </div>
  )
}
