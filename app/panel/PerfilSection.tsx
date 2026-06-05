'use client'

import { useState, useTransition } from 'react'
import { actualizarPerfil } from './actions'

const OFICIOS = [
  'Albañil',
  'Carpintero',
  'Electricista',
  'Fontanero',
  'Pintor',
  'Yesero',
  'Instalador de suelos',
  'Reforma integral',
]

interface Perfil {
  nombre?: string
  ciudad?: string
  telefono?: string
  oficio?: string
}

export default function PerfilSection({ perfil }: { perfil: Perfil }) {
  const [editando, setEditando] = useState(!perfil.oficio)
  const [nombre, setNombre] = useState(perfil.nombre ?? '')
  const [ciudad, setCiudad] = useState(perfil.ciudad ?? '')
  const [telefono, setTelefono] = useState(perfil.telefono ?? '')
  const [oficio, setOficio] = useState(perfil.oficio ?? '')
  const [guardado, setGuardado] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function guardar() {
    if (!nombre.trim()) { setError('El nombre es obligatorio.'); return }
    if (!ciudad.trim()) { setError('La ciudad es obligatoria.'); return }
    if (!oficio) { setError('Selecciona tu oficio.'); return }
    setError('')

    startTransition(async () => {
      const { error: err } = await actualizarPerfil({
        nombre: nombre.trim(),
        ciudad: ciudad.trim(),
        telefono: telefono.trim(),
        oficio,
      })
      if (err) {
        setError('Error al guardar. Inténtalo de nuevo.')
      } else {
        setEditando(false)
        setGuardado(true)
        setTimeout(() => setGuardado(false), 3000)
      }
    })
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-black text-xl">Tu perfil</h2>
        {!editando && (
          <button onClick={() => setEditando(true)} className="text-sm text-[#C4531A] hover:underline font-medium">
            Editar
          </button>
        )}
        {guardado && <span className="text-sm text-green-600 font-medium">✓ Guardado</span>}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>
      )}

      {!editando ? (
        <div className="space-y-3 text-sm">
          {[
            { label: 'Nombre',   valor: nombre   || '—' },
            { label: 'Ciudad',   valor: ciudad   || '—' },
            { label: 'Teléfono', valor: telefono || '—' },
            { label: 'Oficio',   valor: oficio   || '' },
          ].map(({ label, valor }) => (
            <div key={label} className="flex justify-between border-b border-[#F0EAE4] pb-2 last:border-0">
              <span className="text-[#6B5B4E]">{label}</span>
              {label === 'Oficio' && !valor
                ? <button onClick={() => setEditando(true)} className="text-[#C4531A] font-medium hover:underline">Añade tu oficio →</button>
                : <span className="font-semibold">{valor}</span>
              }
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Nombre',    value: nombre,    set: setNombre,    placeholder: 'Tu nombre',    required: true },
              { label: 'Ciudad',    value: ciudad,    set: setCiudad,    placeholder: 'Madrid',        required: true },
              { label: 'Teléfono', value: telefono,  set: setTelefono,  placeholder: '600 000 000',   required: false },
            ].map(({ label, value, set, placeholder, required }) => (
              <div key={label}>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-1.5">
                  {label} {required && <span className="text-[#C4531A]">*</span>}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder={placeholder}
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4531A]"
                />
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide mb-3">
              ¿Cuál es tu oficio? <span className="text-[#C4531A]">*</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {OFICIOS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOficio(o)}
                  className={`text-sm px-3 py-3 rounded-xl border font-medium transition-all text-center ${
                    oficio === o
                      ? 'bg-[#C4531A] text-white border-[#C4531A]'
                      : 'bg-white text-[#6B5B4E] border-[#E8DFD8] hover:border-[#C4531A]'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={guardar}
              disabled={isPending}
              className="bg-[#C4531A] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#A84414] transition-colors disabled:opacity-60"
            >
              {isPending ? 'Guardando…' : 'Guardar'}
            </button>
            {perfil.oficio && (
              <button
                onClick={() => { setEditando(false); setError('') }}
                disabled={isPending}
                className="text-sm text-[#6B5B4E] hover:text-[#1C1208] px-4 py-2.5"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
