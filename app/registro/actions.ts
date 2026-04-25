'use server'

import { createClient } from '@/lib/supabase-server'
import { getSupabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type RegistroState = {
  status: 'idle' | 'pending_payment' | 'error'
  message?: string
  userId?: string
  email?: string
  plan?: string
}

export async function registrarReformista(
  _prevState: RegistroState,
  formData: FormData
): Promise<RegistroState> {
  const nombre      = (formData.get('nombre') as string).trim()
  const empresa     = formData.get('empresa') as string
  const telefono    = (formData.get('telefono') as string).trim()
  const ciudad      = (formData.get('ciudad') as string).trim()
  const email       = (formData.get('email') as string).trim()
  const password    = formData.get('password') as string
  const tipos       = formData.getAll('tipos') as string[]
  const licencia    = formData.get('licencia') === 'si'
  const seguro      = formData.get('seguro') === 'si'
  const experiencia = formData.get('experiencia') as string
  const plan        = (formData.get('plan') as string) || 'basico'

  if (!nombre || !telefono || !ciudad || !email || !password) {
    return { status: 'error', message: 'Rellena todos los campos obligatorios.' }
  }
  if (password.length < 8) {
    return { status: 'error', message: 'La contraseña debe tener al menos 8 caracteres.' }
  }

  const supabase = await createClient()

  // Crear usuario en Supabase Auth
  const { data, error: authError } = await supabase.auth.signUp({ email, password })
  if (authError) {
    if (authError.message.includes('already registered')) {
      return { status: 'error', message: 'Este email ya está registrado. Usa /login.' }
    }
    return { status: 'error', message: authError.message }
  }

  // Guardar perfil con clave admin (bypass RLS)
  if (data.user) {
    const admin = getSupabase()
    const { error: insertError } = await admin.from('reformistas_perfiles').insert({
      id: data.user.id,
      nombre, empresa: empresa || null, telefono, ciudad,
      tipos_obra: tipos, licencia, seguro_rc: seguro,
      experiencia: experiencia || null,
      plan, plan_pagado: false,
    })
    if (insertError) console.error('Insert perfil error:', insertError)
  }

  // Notificar al admin
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'reformarealsoporte@gmail.com',
    subject: `Nuevo reformista registrado — ${nombre} (${plan})`,
    html: `<p><strong>${nombre}</strong> (${email}) se ha registrado como reformista en ${ciudad}. Plan: ${plan}.</p>`,
  }).catch(() => {})

  return { status: 'pending_payment', userId: data.user!.id, email, plan }
}
