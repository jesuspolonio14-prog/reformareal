'use client'

import { useActionState, useState } from 'react'
import Image from 'next/image'
import { registrarReformista, type RegistroState } from './actions'

const initialState: RegistroState = { status: 'idle' }

export default function Registro() {
  const [state, action, pending] = useActionState(registrarReformista, initialState)
  const [passError, setPassError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget
    const pass    = (form.elements.namedItem('password') as HTMLInputElement).value
    const confirm = (form.elements.namedItem('confirm_password') as HTMLInputElement).value
    if (pass !== confirm) {
      e.preventDefault()
      setPassError('Las contraseñas no coinciden.')
    } else {
      setPassError('')
    }
  }

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

      <section className="max-w-md mx-auto px-5 py-10">
        <h1 className="text-3xl font-black mb-2">Crea tu cuenta gratis</h1>
        <p className="text-[#6B5B4E] mb-8">
          En menos de un minuto. Elige tu plan y activa los leads después, desde tu panel.
        </p>

        <form action={action} onSubmit={handleSubmit} className="space-y-5">
          {state.status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {state.message}
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8] space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Nombre <span className="text-[#C4531A]">*</span>
                </label>
                <input
                  name="nombre" type="text" required placeholder="Juan García"
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Ciudad <span className="text-[#C4531A]">*</span>
                </label>
                <input
                  name="ciudad" type="text" required placeholder="Madrid"
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                Email <span className="text-[#C4531A]">*</span>
              </label>
              <input
                name="email" type="email" required placeholder="juan@reformas.com"
                className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                Contraseña <span className="text-[#C4531A]">*</span>
              </label>
              <input
                name="password" type="password" required autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                Repetir contraseña <span className="text-[#C4531A]">*</span>
              </label>
              <input
                name="confirm_password" type="password" required autoComplete="new-password"
                placeholder="Repite la contraseña"
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                  passError ? 'border-red-400 focus:border-red-500' : 'border-[#E8DFD8] focus:border-[#C4531A]'
                }`}
              />
              {passError && <p className="text-red-600 text-xs mt-1">{passError}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#C4531A] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#A84414] transition-colors disabled:opacity-60"
          >
            {pending ? 'Creando cuenta…' : 'Crear cuenta gratis →'}
          </button>
          <p className="text-center text-xs text-[#6B5B4E]">
            Sin tarjeta · Elige tu plan desde el panel · Cancela cuando quieras
          </p>
        </form>
      </section>
    </main>
  )
}
