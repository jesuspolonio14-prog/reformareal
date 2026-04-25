'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export type LoginState = {
  status: 'idle' | 'error'
  message?: string
}

export async function loginReformista(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email    = (formData.get('email') as string).trim()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { status: 'error', message: 'Introduce tu email y contraseña.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { status: 'error', message: 'Email o contraseña incorrectos.' }
  }

  redirect('/panel')
}
