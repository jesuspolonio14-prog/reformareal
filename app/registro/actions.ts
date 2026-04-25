'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type RegistroState = {
  status: 'idle' | 'error'
  message?: string
}

export async function registrarReformista(
  _prevState: RegistroState,
  formData: FormData
): Promise<RegistroState> {
  const nombre     = (formData.get('nombre') as string).trim()
  const empresa    = formData.get('empresa') as string
  const telefono   = (formData.get('telefono') as string).trim()
  const ciudad     = (formData.get('ciudad') as string).trim()
  const email      = (formData.get('email') as string).trim()
  const password   = formData.get('password') as string
  const tipos      = formData.getAll('tipos') as string[]
  const licencia   = formData.get('licencia') === 'si'
  const seguro     = formData.get('seguro') === 'si'
  const experiencia = formData.get('experiencia') as string

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

  // Guardar perfil en la tabla
  if (data.user) {
    await supabase.from('reformistas_perfiles').insert({
      id: data.user.id,
      nombre, empresa: empresa || null, telefono, ciudad,
      tipos_obra: tipos, licencia, seguro_rc: seguro,
      experiencia: experiencia || null,
    })
  }

  // Notificar al admin
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'reformarealsoporte@gmail.com',
    subject: `Nuevo reformista registrado — ${nombre}`,
    html: `<p><strong>${nombre}</strong> (${email}) se ha registrado como reformista en ${ciudad}.</p>`,
  }).catch(() => {})

  redirect('/panel')
}
