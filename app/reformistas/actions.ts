'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ReformistaState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function enviarSolicitudReformista(
  _prevState: ReformistaState,
  formData: FormData
): Promise<ReformistaState> {
  const nombre    = formData.get('nombre') as string
  const empresa   = formData.get('empresa') as string
  const telefono  = formData.get('telefono') as string
  const email     = formData.get('email') as string
  const ciudad    = formData.get('ciudad') as string
  const experiencia = formData.get('experiencia') as string
  const tipos     = formData.getAll('tipos') as string[]
  const licencia  = formData.get('licencia') as string
  const seguro    = formData.get('seguro') as string

  if (!nombre?.trim() || !telefono?.trim() || !email?.trim() || !ciudad?.trim()) {
    return { status: 'error', message: 'Por favor, rellena todos los campos obligatorios.' }
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'reformarealsoporte@gmail.com',
      subject: `Nuevo reformista — ${nombre.trim()}${empresa ? ` · ${empresa}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1C1208; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nuevo reformista quiere unirse</h1>
          </div>
          <div style="background: #f9f6f2; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e8dfd8;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; width: 140px; font-size: 13px;">Nombre</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; font-weight: bold; color: #1c1208;">${nombre.trim()}</td>
              </tr>
              ${empresa ? `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Empresa</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #1c1208;">${empresa}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Teléfono</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; font-weight: bold; color: #1c1208;">${telefono.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #1c1208;">${email.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Ciudad</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #1c1208;">${ciudad.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Tipos de obra</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #1c1208;">${tipos.length ? tipos.join(', ') : '—'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Licencia</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #1c1208;">${licencia === 'si' ? '✅ Sí' : '❌ No'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #6b5b4e; font-size: 13px;">Seguro RC</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfd8; color: #1c1208;">${seguro === 'si' ? '✅ Sí' : '❌ No'}</td>
              </tr>
              ${experiencia ? `<tr>
                <td style="padding: 10px 0; color: #6b5b4e; font-size: 13px; vertical-align: top;">Experiencia</td>
                <td style="padding: 10px 0; color: #1c1208;">${experiencia}</td>
              </tr>` : ''}
            </table>
          </div>
          <p style="color: #6b5b4e; font-size: 12px; margin-top: 16px;">Solicitud recibida desde reformareal.com/reformistas</p>
        </div>
      `,
    })
  } catch {
    return { status: 'error', message: 'Error al enviar la solicitud. Inténtalo de nuevo.' }
  }

  return { status: 'success' }
}
