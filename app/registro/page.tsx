'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import { registrarReformista, type RegistroState } from './actions'

const initialState: RegistroState = { status: 'idle' }

const tiposObra = ['Reforma integral','Cocina','Baño','Electricidad','Fontanería','Pintura','Carpintería','Suelos']

export default function Registro() {
  const [state, action, pending] = useActionState(registrarReformista, initialState)

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
        <a href="/login" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors">
          ¿Ya tienes cuenta? Entra →
        </a>
      </nav>

      <section className="max-w-xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black mb-2">Crea tu perfil de reformista</h1>
        <p className="text-[#6B5B4E] mb-8">Accede a leads cualificados y gestiona tus obras desde tu panel.</p>

        <form action={action} className="bg-white rounded-2xl p-8 space-y-5 border border-[#E8DFD8]">
          {state.status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {state.message}
            </div>
          )}

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
            <input name="password" type="password" required placeholder="Mínimo 8 caracteres"
              className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A]" />
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
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">¿Licencia de actividad?</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2"><input type="radio" name="licencia" value="si" defaultChecked className="accent-[#C4531A]" /><span className="text-sm">Sí</span></label>
                <label className="flex items-center gap-2"><input type="radio" name="licencia" value="no" className="accent-[#C4531A]" /><span className="text-sm">No</span></label>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">¿Seguro de RC?</label>
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

          <button type="submit" disabled={pending}
            className="w-full bg-[#C4531A] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#A84414] transition-colors disabled:opacity-60">
            {pending ? 'Creando cuenta…' : 'Crear mi cuenta →'}
          </button>
        </form>
      </section>
    </main>
  )
}
