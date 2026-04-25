import { stripe } from '@/lib/stripe'
import { getSupabase } from '@/lib/supabase'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig  = request.headers.get('stripe-signature') ?? ''
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    return Response.json({ error: 'Webhook secret no configurado' }, { status: 500 })
  }

  let event: ReturnType<typeof stripe.webhooks.constructEvent>
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return Response.json({ error: 'Firma inválida' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { userId, plan } = session.metadata ?? {}

    if (userId && plan) {
      await getSupabase()
        .from('reformistas_perfiles')
        .update({ plan, plan_pagado: true })
        .eq('id', userId)
    }
  }

  return Response.json({ ok: true })
}
