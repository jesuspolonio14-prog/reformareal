import { Resend } from 'resend'
import { getSupabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

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

  try {
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
    if (error) console.error('Supabase insert error:', error)
  } catch (err) {
    console.error('Supabase no configurado:', err)
  }

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'reformarealsoporte@gmail.com',
    subject: `Nuevo lead reforma — ${(nombre as string).trim()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #C4531A; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Nuevo lead en ReformaReal</h1>
        </div>
        <div style="background: #f9f6f2; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e8dfd8;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; width: 140px; font-size: 13px;">Nombre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; font-weight: bold; color: #1c1208;">${(nombre as string).trim()}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Teléfono</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; font-weight: bold; color: #1c1208;">${(telefono as string).trim()}</td>
            </tr>
            ${email ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #1c1208;">${email}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Ciudad</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #1c1208;">${ciudad ?? '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Metros²</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #1c1208;">${metros ?? '—'} m²</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Tipo reforma</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #1c1208;">${tipo_reforma ?? '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Calidad</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #1c1208;">${calidad ?? '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b5b4e; font-size: 13px;">Estimación</td>
              <td style="padding: 10px 0; font-weight: bold; color: #C4531A; font-size: 18px;">
                ${total_min ? `${Number(total_min).toLocaleString('es-ES')} € – ${Number(total_max).toLocaleString('es-ES')} €` : '—'}
              </td>
            </tr>
          </table>
        </div>
        <p style="color: #6b5b4e; font-size: 12px; margin-top: 16px;">Lead recibido desde reformareal.com</p>
      </div>
    `,
  }).catch((err) => console.error('Resend error:', err))

  return Response.json({ ok: true }, { status: 201 })
}
