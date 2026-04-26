import { stripe, PLANES, type PlanKey } from '@/lib/stripe'
import type { NextRequest } from 'next/server'

const TRIAL_DAYS = 30

export async function POST(request: NextRequest) {
  const { plan, userId, email } = await request.json() as {
    plan: PlanKey
    userId: string
    email: string
  }

  const planData = PLANES[plan]
  if (!planData) {
    return Response.json({ error: 'Plan inválido' }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://reformareal.com'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // Suscripción mensual con 30 días de prueba gratuita
    mode: 'subscription',
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: { name: planData.nombre },
          unit_amount: planData.precio,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: TRIAL_DAYS,
      metadata: { userId, plan },
    },
    metadata: { userId, plan },
    success_url: `${baseUrl}/panel?pago=ok`,
    cancel_url:  `${baseUrl}/registro`,
  })

  return Response.json({ url: session.url })
}
