'use client'

import { useActionState, useEffect, useState } from 'react'
import Image from 'next/image'
import { registrarReformista, type RegistroState } from './actions'

const initialState: RegistroState = { status: 'idle' }

const tiposObra = ['Reforma integral','Cocina','Baño','Electricidad','Fontanería','Pintura','Carpintería','Suelos']

const planes = [
  { key: 'basico', nombre: 'Básico',  precio: '49 €',  periodo: '/mes', desc: 'Ficha verificada + presupuesto PDF' },
  { key: 'pro',    nombre: 'Pro',     precio: '99 €',  periodo: '/mes', desc: 'Posición destacada + leads directos', popular: true },
  { key: 'elite',  nombre: 'Elite',   precio: '199 €', periodo: '/mes', desc: 'Primero en tu provincia + panel completo' },
]

export default function Registro() {
  const [state, action, pending] = useActionState(registrarReformista, initialState)
  const [planSeleccionado, setPlanSeleccionado] = useState('pro')
  const [passError, setPassError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget
    const pass = (form.elements.namedItem('password') as HTMLInputElement).value
    const confirm = (form.elements.namedItem('confirm_password') as HTMLInputElement).value
    if (pass !== confirm) {
      e.preventDefault()
      setPassError('Las contraseñas no coinciden.')
    } else {
      setPassError('')
    }
  }

  // Cuando el usuario está creado, redirigir a Stripe
  useEffect(() => {
    if (state.status === 'pending_payment' && state.userId) {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: state.plan, userId: state.userId, email: state.email }),
      })
        .then((r) => r.json())
        .then(({ url }) => { if (url) window.location.href = url })
    }
  }, [state])

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
        <a href="/login" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors">
          ¿Ya tienes cuenta? Entra →
        </a>
      </nav>

      <section className="max-w-xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-black mb-2">Crea tu perfil de reformista</h1>
        <p className="text-[#6B5B4E] mb-8">Accede a clientes que ya conocen el precio de su reforma.</p>

        <form action={action} onSubmit={handleSubmit} className="space-y-6">
          {state.status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {state.message}
            </div>
          )}

          {/* DATOS PERSONALES */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8] space-y-4">
            <h2 className="font-bold text-lg">Tus datos</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Nombre <span className="text-[#C4531A]">*</span>
                </label>
                <input name="nombre" type="text" required placeholder="Juan García"
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">Empresa</label>
                <input name="empresa" type="text" placeholder="Reformas García S.L."
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Teléfono <span className="text-[#C4531A]">*</span>
                </label>
                <input name="telefono" type="tel" required placeholder="612 345 678"
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Ciudad <span className="text-[#C4531A]">*</span>
                </label>
                <input name="ciudad" type="text" required placeholder="Madrid"
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                Email <span className="text-[#C4531A]">*</span>
              </label>
              <input name="email" type="email" required placeholder="juan@reformas.com"
                className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]" />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                Contraseña <span className="text-[#C4531A]">*</span>
              </label>
              <input name="password" type="password" required autoComplete="new-password" placeholder="Mínimo 8 caracteres"
                className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]" />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                Repetir contraseña <span className="text-[#C4531A]">*</span>
              </label>
              <input name="confirm_password" type="password" required autoComplete="new-password" placeholder="Repite la contraseña"
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-colors ${passError ? 'border-red-400 focus:border-red-500' : 'border-[#E8DFD8] focus:border-[#C4531A]'}`} />
              {passError && <p className="text-red-600 text-xs mt-1">{passError}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">Tipos de obra</label>
              <div className="grid grid-cols-2 gap-2">
                {tiposObra.map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="tipos" value={t} className="w-4 h-4 accent-[#C4531A]" />
                    <span className="text-sm">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">¿Licencia?</label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2"><input type="radio" name="licencia" value="si" defaultChecked className="accent-[#C4531A]" /><span className="text-sm">Sí</span></label>
                  <label className="flex items-center gap-2"><input type="radio" name="licencia" value="no" className="accent-[#C4531A]" /><span className="text-sm">No</span></label>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">¿Seguro RC?</label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2"><input type="radio" name="seguro" value="si" defaultChecked className="accent-[#C4531A]" /><span className="text-sm">Sí</span></label>
                  <label className="flex items-center gap-2"><input type="radio" name="seguro" value="no" className="accent-[#C4531A]" /><span className="text-sm">No</span></label>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">Experiencia (opcional)</label>
              <textarea name="experiencia" rows={3} placeholder="Años de experiencia, tipo de obras habituales..."
                className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A] resize-none" />
            </div>
          </div>

          {/* SELECTOR DE PLAN */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8]">
            <h2 className="font-bold text-lg mb-4">Elige tu plan</h2>
            <input type="hidden" name="plan" value={planSeleccionado} />
            <div className="grid grid-cols-3 gap-3">
              {planes.map((p) => {
                const activo = planSeleccionado === p.key
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPlanSeleccionado(p.key)}
                    className={`relative flex flex-col items-center text-center rounded-2xl p-4 border-2 transition-all ${
                      activo
                        ? 'border-[#C4531A] bg-[#FDF0EB]'
                        : 'border-[#E8DFD8] bg-white hover:border-[#C4B8AE]'
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-[#C4531A] text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                        Más elegido
                      </span>
                    )}
                    <span className={`font-black text-lg ${activo ? 'text-[#C4531A]' : 'text-[#1C1208]'}`}>
                      {p.nombre}
                    </span>
                    <span className="font-black text-2xl text-[#C4531A] mt-1">{p.precio}</span>
                    <span className="text-xs text-[#6B5B4E]">{p.periodo}</span>
                    <p className="text-xs text-[#6B5B4E] mt-2 leading-tight">{p.desc}</p>
                    {activo && (
                      <span className="mt-3 w-5 h-5 rounded-full bg-[#C4531A] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <button type="submit" disabled={pending || state.status === 'pending_payment'}
            className="w-full bg-[#C4531A] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#A84414] transition-colors disabled:opacity-60">
            {pending || state.status === 'pending_payment' ? 'Redirigiendo al pago…' : 'Crear cuenta y pagar →'}
          </button>
          <p className="text-center text-xs text-[#6B5B4E]">Pago seguro con Stripe · Sin permanencia</p>
        </form>
      </section>
    </main>
  )
}
