import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

export const PLANES = {
  basico: { nombre: 'ReformaReal — Plan Básico',  precio: 1900  },
  pro:    { nombre: 'ReformaReal — Plan Pro',      precio: 4900  },
  elite:  { nombre: 'ReformaReal — Plan Elite',    precio: 9900  },
} as const

export type PlanKey = keyof typeof PLANES
