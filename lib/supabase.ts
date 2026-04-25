import { createClient } from '@supabase/supabase-js'

// Solo se instancia cuando se llama — no falla en build si las vars no están aún
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY

  if (!url || !key) {
    throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SECRET_KEY en las variables de entorno')
  }

  return createClient(url, key)
}
