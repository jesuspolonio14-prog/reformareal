import { stripe, PLANES, type PlanKey } from '@/lib/stripe'
import type { NextRequest } from 'next/server'

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
    mode: 'payment',
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: { name: planData.nombre },
          unit_amount: planData.precio,
        },
        quantity: 1,
      },
    ],
    metadata: { userId, plan },
    success_url: `${baseUrl}/panel?pago=ok`,
    cancel_url:  `${baseUrl}/registro`,
  })

  return Response.json({ url: session.url })
}
