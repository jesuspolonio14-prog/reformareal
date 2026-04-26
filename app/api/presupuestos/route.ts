import { Resend } from 'resend'
import { getSupabase } from '@/lib/supabase'
import { createClient } from '@/lib/supabase-server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { leadId, partidas, plazo, garantia, notas, total } = await request.json()

  if (!leadId || !total) {
    return Response.json({ error: 'Datos incompletos' }, { status: 400 })
  }

  // Obtener reformista autenticado
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'No autenticado' }, { status: 401 })

  const db = getSupabase()

  // Obtener perfil del reformista
  const { data: perfil } = await db
    .from('reformistas_perfiles')
    .select('nombre, empresa, telefono, email')
    .eq('id', user.id)
    .single()

  // Guardar presupuesto
  const { error: insertErr } = await db.from('presupuestos').insert({
    lead_id:      leadId,
    reformista_id: user.id,
    partidas,
    plazo,
    garantia,
    notas,
    total,
  })
  if (insertErr) console.error('Insert presupuesto:', insertErr)

  // Notificar al admin con el presupuesto completo
  const filasPartidas = Object.entries(partidas as Record<string, number>)
    .filter(([, v]) => Number(v) > 0)
    .map(([k, v]) => `<tr><td style="padding:6px 0;color:#6b5b4e;font-size:13px;">${k}</td><td style="padding:6px 0;text-align:right;font-weight:bold;">${Number(v).toLocaleString('es-ES')} €</td></tr>`)
    .join('')

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'reformarealsoporte@gmail.com',
    subject: `Nuevo presupuesto de ${perfil?.nombre ?? 'reformista'} — ${Number(total).toLocaleString('es-ES')} €`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1C1208;padding:24px;border-radius:8px 8px 0 0;">
          <h1 style="color:white;margin:0;font-size:20px;">Nuevo presupuesto recibido</h1>
        </div>
        <div style="background:#f9f6f2;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8dfd8;">
          <p style="color:#1c1208;"><strong>${perfil?.nombre ?? ''}${perfil?.empresa ? ` · ${perfil.empresa}` : ''}</strong><br/>
          Tel: ${perfil?.telefono ?? ''} · ${perfil?.email ?? ''}</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            ${filasPartidas}
            <tr style="border-top:2px solid #e8dfd8;">
              <td style="padding:10px 0;font-weight:bold;">TOTAL</td>
              <td style="padding:10px 0;text-align:right;font-weight:bold;color:#C4531A;font-size:20px;">${Number(total).toLocaleString('es-ES')} €</td>
            </tr>
          </table>
          ${plazo ? `<p style="color:#6b5b4e;font-size:13px;">Plazo: <strong>${plazo}</strong></p>` : ''}
          ${garantia ? `<p style="color:#6b5b4e;font-size:13px;">Garantía: <strong>${garantia}</strong></p>` : ''}
          ${notas ? `<p style="color:#6b5b4e;font-size:13px;">Notas: ${notas}</p>` : ''}
        </div>
      </div>`,
  }).catch((e) => console.error('Resend presupuesto:', e))

  return Response.json({ ok: true })
}
