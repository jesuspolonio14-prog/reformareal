'use client'

import { useState, useTransition } from 'react'
import { actualizarPerfil } from './actions'

const TIPOS_OBRA = ['Reforma integral', 'Cocina', 'Baño', 'Electricidad', 'Fontanería', 'Pintura', 'Carpintería', 'Suelos']

interface Perfil {
  nombre?: string
  empresa?: string
  telefono?: string
  ciudad?: string
  tipos_obra?: string[]
  licencia?: boolean
  seguro_rc?: boolean
}

export default function PerfilSection({ perfil }: { perfil: Perfil }) {
  const [editando, setEditando] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const [form, setForm] = useState({
    nombre:     perfil.nombre     ?? '',
    empresa:    perfil.empresa    ?? '',
    telefono:   perfil.telefono   ?? '',
    ciudad:     perfil.ciudad     ?? '',
    tipos_obra: perfil.tipos_obra ?? [],
    licencia:   perfil.licencia   ?? false,
    seguro_rc:  perfil.seguro_rc  ?? false,
  })

  function toggleTipo(tipo: string) {
    setForm((prev) => ({
      ...prev,
      tipos_obra: prev.tipos_obra.includes(tipo)
        ? prev.tipos_obra.filter((t) => t !== tipo)
        : [...prev.tipos_obra, tipo],
    }))
  }

  function guardar() {
    if (!form.nombre.trim()) { setError('El nombre es obligatorio.'); return }
    if (!form.telefono.trim()) { setError('El teléfono es obligatorio.'); return }
    if (!form.ciudad.trim()) { setError('La ciudad es obligatoria.'); return }
    setError('')

    startTransition(async () => {
      const { error: err } = await actualizarPerfil(form)
      if (err) {
        setError('Error al guardar. Inténtalo de nuevo.')
      } else {
        setEditando(false)
        setGuardado(true)
        setTimeout(() => setGuardado(false), 3000)
      }
    })
  }

  function cancelar() {
    setForm({
      nombre:     perfil.nombre     ?? '',
      empresa:    perfil.empresa    ?? '',
      telefono:   perfil.telefono   ?? '',
      ciudad:     perfil.ciudad     ?? '',
      tipos_obra: perfil.tipos_obra ?? [],
      licencia:   perfil.licencia   ?? false,
      seguro_rc:  perfil.seguro_rc  ?? false,
    })
    setError('')
    setEditando(false)
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8DFD8]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-black text-xl">Tu perfil</h2>
        {!editando && (
          <button
            onClick={() => setEditando(true)}
            className="text-sm text-[#C4531A] hover:underline font-medium"
          >
            Editar
          </button>
        )}
        {guardado && (
          <span className="text-sm text-green-600 font-medium">✓ Guardado</span>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>
      )}

      {!editando ? (
        /* Vista de solo lectura */
        <>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            {[
              { k: 'Nombre',   v: form.nombre },
              { k: 'Empresa',  v: form.empresa || '—' },
              { k: 'Teléfono', v: form.telefono },
              { k: 'Ciudad',   v: form.ciudad },
              { k: 'Licencia', v: form.licencia  ? 'Sí' : 'No' },
              { k: 'Seguro RC',v: form.seguro_rc ? 'Sí' : 'No' },
            ].map((r) => (
              <div key={r.k} className="flex justify-between border-b border-[#F0EAE4] pb-2">
                <span className="text-[#6B5B4E]">{r.k}</span>
                <span className="font-semibold">{r.v}</span>
              </div>
            ))}
          </div>
          {form.tipos_obra.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide mb-2">Tipos de obra</p>
              <div className="flex flex-wrap gap-2">
                {form.tipos_obra.map((t) => (
                  <span key={t} className="bg-[#F7F3EE] border border-[#E8DFD8] text-xs px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Formulario de edición */
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Nombre',   name: 'nombre',   placeholder: 'Tu nombre', required: true },
              { label: 'Empresa',  name: 'empresa',  placeholder: 'Nombre de empresa (opcional)' },
              { label: 'Teléfono', name: 'telefono', placeholder: '600 000 000', required: true },
              { label: 'Ciudad',   name: 'ciudad',   placeholder: 'Madrid', required: true },
            ].map(({ label, name, placeholder, required }) => (
              <div key={name}>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-1.5">
                  {label} {required && <span className="text-[#C4531A]">*</span>}
                </label>
                <input
                  type="text"
                  value={form[name as keyof typeof form] as string}
                  onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4531A]"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Licencia de obras', key: 'licencia' },
              { label: 'Seguro RC',         key: 'seguro_rc' },
            ].map(({ label, key }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer bg-[#F7F3EE] rounded-xl px-4 py-3">
                <input
                  type="checkbox"
                  checked={form[key as keyof typeof form] as boolean}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.checked }))}
                  className="w-4 h-4 accent-[#C4531A]"
                />
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>

          <div>
            <p className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide mb-2">Tipos de obra</p>
            <div className="flex flex-wrap gap-2">
              {TIPOS_OBRA.map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => toggleTipo(tipo)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                    form.tipos_obra.includes(tipo)
                      ? 'bg-[#C4531A] text-white border-[#C4531A]'
                      : 'bg-white text-[#6B5B4E] border-[#E8DFD8] hover:border-[#C4531A]'
                  }`}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={guardar}
              disabled={isPending}
              className="bg-[#C4531A] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#A84414] transition-colors disabled:opacity-60"
            >
              {isPending ? 'Guardando…' : 'Guardar cambios'}
            </button>
            <button
              onClick={cancelar}
              disabled={isPending}
              className="text-sm text-[#6B5B4E] hover:text-[#1C1208] px-4 py-2.5"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
