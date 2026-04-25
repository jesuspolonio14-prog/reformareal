'use client'

import { useActionState } from 'react'
import { enviarSolicitudReformista, type ReformistaState } from './actions'

const initialState: ReformistaState = { status: 'idle' }

const tiposObra = [
  'Reforma integral',
  'Cocina',
  'Baño',
  'Electricidad',
  'Fontanería',
  'Pintura',
  'Carpintería',
  'Suelos',
]

export default function FormReformista() {
  const [state, action, pending] = useActionState(enviarSolicitudReformista, initialState)

  if (state.status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-10 text-center max-w-xl mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-[#1C1208] mb-3">¡Solicitud recibida!</h3>
        <p className="text-[#6B5B4E] leading-relaxed">
          Revisaremos tu perfil y te contactamos en menos de 48 horas para completar la verificación.
        </p>
        <a
          href="/"
          className="inline-block mt-8 bg-[#C4531A] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#A84414] transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    )
  }

  return (
    <form action={action} className="bg-white rounded-2xl p-8 text-left text-[#1C1208] space-y-5 max-w-xl mx-auto">
      {state.status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
            Nombre <span className="text-[#C4531A]">*</span>
          </label>
          <input
            type="text"
            name="nombre"
            placeholder="Juan García"
            required
            className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A] transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
            Empresa (opcional)
          </label>
          <input
            type="text"
            name="empresa"
            placeholder="Reformas García S.L."
            className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
            Teléfono <span className="text-[#C4531A]">*</span>
          </label>
          <input
            type="tel"
            name="telefono"
            placeholder="612 345 678"
            required
            className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A] transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
            Email <span className="text-[#C4531A]">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="juan@reformas.com"
            required
            className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
          Ciudad principal de trabajo <span className="text-[#C4531A]">*</span>
        </label>
        <input
          type="text"
          name="ciudad"
          placeholder="Madrid"
          required
          className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A] transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
          Tipos de obra que realizas
        </label>
        <div className="grid grid-cols-2 gap-2">
          {tiposObra.map((tipo) => (
            <label key={tipo} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="tipos"
                value={tipo}
                className="w-4 h-4 accent-[#C4531A]"
              />
              <span className="text-sm text-[#3D3228]">{tipo}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
            ¿Tienes licencia de actividad?
          </label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="licencia" value="si" defaultChecked className="accent-[#C4531A]" />
              <span className="text-sm">Sí</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="licencia" value="no" className="accent-[#C4531A]" />
              <span className="text-sm">No</span>
            </label>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
            ¿Tienes seguro de RC?
          </label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="seguro" value="si" defaultChecked className="accent-[#C4531A]" />
              <span className="text-sm">Sí</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="seguro" value="no" className="accent-[#C4531A]" />
              <span className="text-sm">No</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
          Cuéntanos tu experiencia (opcional)
        </label>
        <textarea
          name="experiencia"
          rows={3}
          placeholder="Años de experiencia, tipo de obras habituales, zona de trabajo..."
          className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C4531A] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#1C1208] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#2A1E10] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? 'Enviando solicitud…' : 'Solicitar verificación →'}
      </button>
      <p className="text-center text-xs text-[#6B5B4E]">
        Revisamos tu perfil en 48 h · Sin compromiso de permanencia
      </p>
    </form>
  )
}
