'use client'

import { useState } from 'react'

export default function ActivarPlanSection({ userId, email }: { userId: string; email: string }) {
  const plan = 'basico'
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

      <div className="bg-[#FDF0EB] border-2 border-[#C4531A] rounded-2xl p-5 mb-6">
        <p className="font-black text-lg text-[#C4531A]">Plan Reformista</p>
        <p className="font-black text-2xl text-green-600 mt-1">
          0 € <span className="text-sm font-normal text-[#6B5B4E]">primer mes</span>
        </p>
        <p className="text-xs text-[#6B5B4E] mt-0.5">después 19 €/mes · Sin permanencia</p>
        <p className="text-xs text-[#6B5B4E] mt-3">Leads de obra en tu zona · Presupuesto PDF · Perfil verificado · Panel de gestión</p>
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
