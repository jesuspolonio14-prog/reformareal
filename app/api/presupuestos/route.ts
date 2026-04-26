import { Resend } from 'resend'
import { getSupabase } from '@/lib/supabase'
import { createClient } from '@/lib/supabase-server'
import { formatEur } from '@/lib/estimacion'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const { leadId, tipo, pdfBase64, nombre: pdfNombre, total, resumen } = body

  if (!leadId || !pdfBase64) {
    return Response.json({ error: 'Datos incompletos' }, { status: 400 })
  }

  // Verificar autenticación
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'No autenticado' }, { status: 401 })

  const admin = getSupabase()

  // Obtener datos
  const [{ data: perfil }, { data: lead }] = await Promise.all([
    admin.from('reformistas_perfiles').select('nombre, empresa, telefono, email').eq('id', user.id).single(),
    admin.from('leads').select('tipo_reforma, ciudad, metros, nombre, telefono').eq('id', leadId).single(),
  ])

  const reformistaNombre = perfil?.nombre ?? 'Reformista'
  const empresa = perfil?.empresa ? ` · ${perfil.empresa}` : ''
  const ciudad = lead?.ciudad ?? '—'
  const tipoReforma = lead?.tipo_reforma ?? '—'
  const metros = lead?.metros ? `${lead.metros} m²` : '—'

  // Guardar en BD
  await admin.from('presupuestos').insert({
    lead_id:      leadId,
    reformista_id: user.id,
    partidas:     resumen?.capitulos ?? null,
    total:        total ?? 0,
    notas:        tipo === 'subido' ? 'PDF subido por el reformista' : 'Calculado con herramienta ReformaReal',
  }).then(({ error }) => { if (error) console.error('Insert presupuesto:', error) })

  // Construir email
  const esCalculado = tipo === 'calculado'
  const subject = `Presupuesto de ${reformistaNombre}${empresa} — ${ciudad} · ${tipoReforma}`

  let htmlBody = ''
  if (esCalculado && resumen) {
    const filas = resumen.capitulos.map((c: { nombre: string; importe: number }) =>
      `<tr><td style="padding:5px 0;color:#6b5b4e;font-size:13px;">${c.nombre}</td><td style="padding:5px 0;text-align:right;font-weight:bold;">${formatEur(c.importe)}</td></tr>`
    ).join('')
    htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1C1208;padding:24px;border-radius:8px 8px 0 0;">
          <h1 style="color:white;margin:0;font-size:18px;">Presupuesto recibido — ${ciudad}</h1>
          <p style="color:#C4531A;margin:4px 0 0;font-size:13px;">${reformistaNombre}${empresa}</p>
        </div>
        <div style="background:#f9f6f2;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8dfd8;">
          <p style="color:#6b5b4e;font-size:13px;">Reforma: <strong>${tipoReforma}</strong> · ${metros} · ${ciudad}</p>
          <p style="color:#6b5b4e;font-size:13px;">Cliente: <strong>${lead?.nombre ?? '—'}</strong> · ${lead?.telefono ?? '—'}</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            ${filas}
            <tr style="border-top:2px solid #C4531A;">
              <td style="padding:8px 0;font-weight:bold;">TOTAL (PEC + IVA)</td>
              <td style="padding:8px 0;text-align:right;font-weight:bold;color:#C4531A;font-size:18px;">${formatEur(total)}</td>
            </tr>
          </table>
          <p style="color:#6b5b4e;font-size:11px;">El PDF detallado se adjunta a este correo.</p>
        </div>
      </div>`
  } else {
    htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1C1208;padding:24px;border-radius:8px 8px 0 0;">
          <h1 style="color:white;margin:0;font-size:18px;">Presupuesto PDF recibido — ${ciudad}</h1>
        </div>
        <div style="background:#f9f6f2;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8dfd8;">
          <p><strong>${reformistaNombre}${empresa}</strong> ha enviado su presupuesto en PDF para la reforma en ${ciudad}.</p>
          <p style="color:#6b5b4e;font-size:13px;">Reforma: ${tipoReforma} · ${metros}</p>
          <p style="color:#6b5b4e;font-size:13px;">Cliente: <strong>${lead?.nombre ?? '—'}</strong> · ${lead?.telefono ?? '—'}</p>
          <p style="color:#6b5b4e;font-size:11px;">El PDF adjunto es el presupuesto del reformista.</p>
        </div>
      </div>`
  }

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'reformarealsoporte@gmail.com',
    subject,
    html: htmlBody,
    attachments: [{
      filename: esCalculado ? `presupuesto_${reformistaNombre.replace(/\s/g, '_')}.pdf` : (pdfNombre ?? 'presupuesto.pdf'),
      content: pdfBase64,
    }],
  }).catch((e) => console.error('Resend presupuesto:', e))

  return Response.json({ ok: true })
}
