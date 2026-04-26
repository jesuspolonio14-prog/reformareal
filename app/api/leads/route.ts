import { Resend } from 'resend'
import { getSupabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

function fila(label: string, valor: unknown) {
  if (!valor) return ''
  const v = Array.isArray(valor) ? (valor as string[]).join(', ') : String(valor)
  return `<tr><td style="padding:8px 0;border-bottom:1px solid #e8dfd8;color:#6b5b4e;width:160px;font-size:13px;">${label}</td><td style="padding:8px 0;border-bottom:1px solid #e8dfd8;color:#1c1208;">${v}</td></tr>`
}

function emailLeadAdmin(data: Record<string, unknown>) {
  const { nombre, telefono, email, ciudad, direccion, tipo_vivienda, plantas, metros,
          tipo_reforma, estancias, distribucion, instalaciones, calidad, cuando,
          presupuesto_orientativo, notas } = data
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#C4531A;padding:24px;border-radius:8px 8px 0 0;">
        <h1 style="color:white;margin:0;font-size:20px;">Nuevo lead en ReformaReal</h1>
      </div>
      <div style="background:#f9f6f2;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8dfd8;">
        <p style="font-weight:bold;color:#C4531A;font-size:13px;margin:0 0 8px;">CONTACTO</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          ${fila('Nombre', nombre)}${fila('Teléfono', telefono)}${fila('Email', email)}
        </table>
        <p style="font-weight:bold;color:#C4531A;font-size:13px;margin:0 0 8px;">EL INMUEBLE</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          ${fila('Tipo vivienda', tipo_vivienda)}${fila('Plantas', plantas)}${fila('Metros²', metros ? metros + ' m²' : null)}${fila('Ciudad', ciudad)}${fila('Dirección', direccion)}
        </table>
        <p style="font-weight:bold;color:#C4531A;font-size:13px;margin:0 0 8px;">LA REFORMA</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          ${fila('Tipo reforma', tipo_reforma)}${fila('Estancias', estancias)}${fila('Distribución', distribucion)}${fila('Instalaciones', instalaciones)}
        </table>
        <p style="font-weight:bold;color:#C4531A;font-size:13px;margin:0 0 8px;">EXPECTATIVAS</p>
        <table style="width:100%;border-collapse:collapse;">
          ${fila('Calidad', calidad)}${fila('Cuándo', cuando)}${fila('Presupuesto', presupuesto_orientativo)}${fila('Notas', notas)}
        </table>
      </div>
      <p style="color:#6b5b4e;font-size:12px;margin-top:16px;">Lead recibido desde reformareal.com</p>
    </div>`
}

function emailNotificacionReformista(reformistaNombre: string, data: Record<string, unknown>, leadId: string) {
  const { ciudad, metros, tipo_vivienda, tipo_reforma, calidad, cuando, presupuesto_orientativo } = data
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://reformareal.com'
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#1C1208;padding:24px;border-radius:8px 8px 0 0;">
        <h1 style="color:white;margin:0;font-size:20px;">🔔 Nueva oportunidad de reforma en ${ciudad}</h1>
      </div>
      <div style="background:#f9f6f2;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8dfd8;">
        <p style="color:#1c1208;">Hola <strong>${reformistaNombre}</strong>, hay una nueva solicitud de reforma en tu zona.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          ${fila('Ciudad', ciudad)}${fila('Tipo vivienda', tipo_vivienda)}${fila('Metros²', metros ? metros + ' m²' : null)}${fila('Tipo reforma', tipo_reforma)}${fila('Calidad', calidad)}${fila('Cuándo', cuando)}${fila('Presupuesto', presupuesto_orientativo)}
        </table>
        <a href="${baseUrl}/panel?lead=${leadId}" style="display:inline-block;background:#C4531A;color:white;padding:14px 28px;border-radius:50px;font-weight:bold;text-decoration:none;margin-top:8px;">
          Ver solicitud y enviar presupuesto →
        </a>
      </div>
      <p style="color:#6b5b4e;font-size:12px;margin-top:16px;">ReformaReal · Puedes gestionar tus notificaciones desde tu panel.</p>
    </div>`
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Cuerpo de la petición inválido' }, { status: 400 })
  }

  const {
    nombre, telefono, email, metros, ciudad, direccion,
    tipo_vivienda, plantas, tipo_reforma, estancias,
    distribucion, instalaciones, calidad, cuando,
    presupuesto_orientativo, notas,
  } = body as Record<string, unknown>

  if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2)
    return Response.json({ error: 'Nombre requerido' }, { status: 422 })
  if (!telefono || typeof telefono !== 'string' || telefono.trim().length < 9)
    return Response.json({ error: 'Teléfono requerido' }, { status: 422 })

  const db = getSupabase()
  let leadId = ''

  // Guardar lead
  try {
    const { data: leadData, error } = await db.from('leads').insert({
      nombre:       (nombre as string).trim(),
      telefono:     (telefono as string).trim(),
      email:        typeof email === 'string' && email.trim() ? email.trim() : null,
      metros:       typeof metros === 'number' ? metros : null,
      ciudad:       typeof ciudad === 'string' ? ciudad.trim() : null,
      direccion:    typeof direccion === 'string' ? direccion.trim() : null,
      tipo_vivienda: typeof tipo_vivienda === 'string' ? tipo_vivienda : null,
      plantas:      typeof plantas === 'string' ? plantas : null,
      tipo_reforma: typeof tipo_reforma === 'string' ? tipo_reforma : null,
      estancias:    Array.isArray(estancias) ? estancias : null,
      distribucion: typeof distribucion === 'string' ? distribucion : null,
      instalaciones: typeof instalaciones === 'string' ? instalaciones : null,
      calidad:      typeof calidad === 'string' ? calidad : null,
      cuando:       typeof cuando === 'string' ? cuando : null,
      presupuesto_orientativo: typeof presupuesto_orientativo === 'string' ? presupuesto_orientativo : null,
      notas:        typeof notas === 'string' ? notas : null,
    }).select('id').single()
    if (error) console.error('Supabase insert error:', error)
    if (leadData) leadId = leadData.id
  } catch (err) {
    console.error('Supabase error:', err)
  }

  const emailData = {
    nombre: (nombre as string).trim(), telefono, email, ciudad, metros,
    direccion, tipo_vivienda, plantas, tipo_reforma, estancias,
    distribucion, instalaciones, calidad, cuando, presupuesto_orientativo, notas,
  }

  // Email al admin
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'reformarealsoporte@gmail.com',
    subject: `Nuevo lead reforma — ${(nombre as string).trim()}`,
    html: emailLeadAdmin(emailData),
  }).catch((err) => console.error('Resend admin error:', err))

  // Notificar a reformistas de la misma ciudad
  if (ciudad && typeof ciudad === 'string') {
    try {
      const { data: reformistas } = await db
        .from('reformistas_perfiles')
        .select('nombre, email')
        .ilike('ciudad', `%${ciudad.trim()}%`)
        .not('email', 'is', null)

      if (reformistas && reformistas.length > 0) {
        await Promise.allSettled(
          reformistas.map((r: { nombre: string; email: string }) =>
            resend.emails.send({
              from: 'onboarding@resend.dev',
              to: r.email,
              subject: `🔔 Nueva oportunidad de reforma en ${ciudad}`,
              html: emailNotificacionReformista(r.nombre, emailData, leadId),
            })
          )
        )
      }
    } catch (err) {
      console.error('Error notificando reformistas:', err)
    }
  }

  return Response.json({ ok: true }, { status: 201 })
}
