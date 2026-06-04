'use server'

import { createClient } from '@/lib/supabase-server'
import { getSupabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { redirect } from 'next/navigation'

const resend = new Resend(process.env.RESEND_API_KEY)

export type RegistroState = {
  status: 'idle' | 'error'
  message?: string
}

export async function registrarReformista(
  _prevState: RegistroState,
  formData: FormData
): Promise<RegistroState> {
  const nombre   = (formData.get('nombre') as string).trim()
  const ciudad   = (formData.get('ciudad') as string).trim()
  const email    = (formData.get('email') as string).trim()
  const password = formData.get('password') as string

  if (!nombre || !ciudad || !email || !password) {
    return { status: 'error', message: 'Rellena todos los campos obligatorios.' }
  }
  if (password.length < 8) {
    return { status: 'error', message: 'La contraseña debe tener al menos 8 caracteres.' }
  }

  const supabase = await createClient()

  let data: Awaited<ReturnType<typeof supabase.auth.signUp>>['data']
  try {
    const result = await supabase.auth.signUp({ email, password })
    if (result.error) {
      if (result.error.message.includes('already registered')) {
        return { status: 'error', message: 'Este email ya está registrado. Usa /login.' }
      }
      return { status: 'error', message: result.error.message }
    }
    data = result.data
  } catch {
    return { status: 'error', message: 'Error de conexión. Inténtalo de nuevo en unos segundos.' }
  }

  if (data.user) {
    try {
      const admin = getSupabase()
      const { error: insertError } = await admin.from('reformistas_perfiles').insert({
        id: data.user.id,
        nombre,
        email,
        ciudad,
        plan_pagado: false,
      })
      if (insertError) console.error('Insert perfil error:', insertError)
    } catch (e) {
      console.error('Insert perfil error:', e)
    }
  }

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'reformarealsoporte@gmail.com',
    subject: `Nuevo reformista registrado — ${nombre}`,
    html: `<p><strong>${nombre}</strong> (${email}) se ha registrado en ${ciudad}.</p>`,
  }).catch(() => {})

  redirect('/registro/gracias')
}
