import Stripe from 'stripe'

/**
 * Cliente Stripe — SOLO para uso en el servidor (API routes).
 * Nunca importar en componentes client-side.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript:  true,
})

/** Formatea monto de COP a centavos para Stripe (Stripe usa centavos) */
export const toStripeAmount = (copAmount: number) => Math.round(copAmount * 100)

/** Precio en COP formateado */
export const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n)
