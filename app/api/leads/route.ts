import { getSupabase } from '@/lib/supabase'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Cuerpo de la petición inválido' }, { status: 400 })
  }

  const {
    nombre,
    telefono,
    email,
    metros,
    ciudad,
    tipo_reforma,
    calidad,
    total_min,
    total_max,
  } = body as Record<string, unknown>

  if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
    return Response.json({ error: 'Nombre requerido' }, { status: 422 })
  }
  if (!telefono || typeof telefono !== 'string' || telefono.trim().length < 9) {
    return Response.json({ error: 'Teléfono requerido' }, { status: 422 })
  }

  const { error } = await getSupabase().from('leads').insert({
    nombre:      (nombre as string).trim(),
    telefono:    (telefono as string).trim(),
    email:       typeof email === 'string' && email.trim() ? email.trim() : null,
    metros:      typeof metros === 'number' ? metros : null,
    ciudad:      typeof ciudad === 'string' ? ciudad.trim() : null,
    tipo_reforma: typeof tipo_reforma === 'string' ? tipo_reforma : null,
    calidad:     typeof calidad === 'string' ? calidad : null,
    total_min:   typeof total_min === 'number' ? total_min : null,
    total_max:   typeof total_max === 'number' ? total_max : null,
  })

  if (error) {
    console.error('Supabase insert error:', error)
    return Response.json({ error: 'Error al guardar el lead' }, { status: 500 })
  }

  return Response.json({ ok: true }, { status: 201 })
}
