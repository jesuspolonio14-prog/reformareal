'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import { loginReformista, type LoginState } from './actions'

const initialState: LoginState = { status: 'idle' }

export default function Login() {
  const [state, action, pending] = useActionState(loginReformista, initialState)

  return (
    <main className="min-h-screen bg-[#F7F3EE] flex flex-col">
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto w-full">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-bold text-[#1C1208]">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-black text-[#1C1208] mb-2">Accede a tu panel</h1>
          <p className="text-[#6B5B4E] mb-8">Gestiona tus leads y tu perfil de reformista.</p>

          <form action={action} className="bg-white rounded-2xl p-8 space-y-4 border border-[#E8DFD8]">
            {state.status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {state.message}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">Email</label>
              <input name="email" type="email" required autoComplete="email" placeholder="juan@reformas.com"
                className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A] transition-colors" />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">Contraseña</label>
              <input name="password" type="password" required autoComplete="current-password" placeholder="••••••••"
                className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A] transition-colors" />
            </div>

            <button type="submit" disabled={pending}
              className="w-full bg-[#C4531A] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#A84414] transition-colors disabled:opacity-60">
              {pending ? 'Entrando…' : 'Entrar →'}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B5B4E] mt-6">
            ¿Aún no tienes cuenta?{' '}
            <a href="/registro" className="text-[#C4531A] font-semibold hover:underline">Regístrate</a>
          </p>
        </div>
      </div>
    </main>
  )
}
