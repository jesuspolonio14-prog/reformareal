'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { getSupabase } from '@/lib/supabase'

export async function cerrarSesion() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function actualizarEstadoLead(leadId: string, estado: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  const admin = getSupabase()
  const { error } = await admin
    .from('lead_seguimientos')
    .upsert(
      { lead_id: leadId, reformista_id: user.id, estado, updated_at: new Date().toISOString() },
      { onConflict: 'lead_id,reformista_id' }
    )

  return { error: error?.message ?? null }
}

export async function actualizarPerfil(datos: {
  nombre: string
  empresa: string
  telefono: string
  ciudad: string
  tipos_obra: string[]
  licencia: boolean
  seguro_rc: boolean
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  const admin = getSupabase()
  const { error } = await admin
    .from('reformistas_perfiles')
    .update({
      nombre:     datos.nombre.trim(),
      empresa:    datos.empresa.trim() || null,
      telefono:   datos.telefono.trim(),
      ciudad:     datos.ciudad.trim(),
      tipos_obra: datos.tipos_obra,
      licencia:   datos.licencia,
      seguro_rc:  datos.seguro_rc,
    })
    .eq('id', user.id)

  return { error: error?.message ?? null }
}
