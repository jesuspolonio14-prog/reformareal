import { stripe } from '@/lib/stripe'
import { getSupabase } from '@/lib/supabase'
import type { NextRequest } from 'next/server'

const db = getSupabase()

async function actualizarPerfil(userId: string, datos: Record<string, unknown>) {
  const { error } = await db.from('reformistas_perfiles').update(datos).eq('id', userId)
  if (error) console.error('[webhook] update error:', error)
}

async function perfilPorSubscripcion(subscriptionId: string) {
  const sub = await stripe.subscriptions.retrieve(subscriptionId)
  const { userId, plan } = (sub.metadata ?? {}) as { userId?: string; plan?: string }
  return { userId, plan, sub }
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig  = request.headers.get('stripe-signature') ?? ''
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secret) return Response.json({ error: 'Webhook secret no configurado' }, { status: 500 })

  let event: ReturnType<typeof stripe.webhooks.constructEvent>
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch {
    return Response.json({ error: 'Firma inválida' }, { status: 400 })
  }

  try {
    switch (event.type) {

      // ── 1. Checkout completado → trial activo, acceso concedido ──────────
      case 'checkout.session.completed': {
        const session = event.data.object
        const { userId, plan } = (session.metadata ?? {}) as { userId?: string; plan?: string }
        const subscriptionId = typeof session.subscription === 'string'
          ? session.subscription
          : (session.subscription as { id: string } | null)?.id

        if (userId && plan) {
          await actualizarPerfil(userId, {
            plan,
            plan_pagado: false,        // todavía no ha pagado, está en trial
            suscripcion_activa: true,  // pero sí tiene acceso
            stripe_subscription_id: subscriptionId ?? null,
          })
        }
        break
      }

      // ── 2. Pago de factura → solo contar si es importe real (mes 2+) ─────
      case 'invoice.payment_succeeded': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invoice = event.data.object as any
        if ((invoice.amount_paid ?? 0) === 0) break  // factura €0 del trial, ignorar

        const subscriptionId = typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id
        if (!subscriptionId) break

        const { userId, plan } = await perfilPorSubscripcion(subscriptionId)
        if (userId && plan) {
          await actualizarPerfil(userId, {
            plan,
            plan_pagado: true,
            suscripcion_activa: true,
          })
        }
        break
      }

      // ── 3. Pago fallido → aviso sin bloquear de inmediato ────────────────
      case 'invoice.payment_failed': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invoice = event.data.object as any
        const subscriptionId = typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id
        if (!subscriptionId) break

        const { userId } = await perfilPorSubscripcion(subscriptionId)
        if (userId) {
          // plan_pagado: false para mostrar aviso en el panel, pero no cortamos acceso todavía
          // Stripe reintentará el cobro. Si falla definitivamente, dispara subscription.deleted
          await actualizarPerfil(userId, { plan_pagado: false })
        }
        break
      }

      // ── 4. Suscripción cancelada → cortar acceso definitivamente ─────────
      case 'customer.subscription.deleted': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sub = event.data.object as any
        const { userId } = (sub.metadata ?? {}) as { userId?: string }
        if (userId) {
          await actualizarPerfil(userId, {
            plan_pagado: false,
            suscripcion_activa: false,
          })
        }
        break
      }
    }
  } catch (err) {
    console.error('[webhook] error procesando evento:', err)
  }

  return Response.json({ ok: true })
}
