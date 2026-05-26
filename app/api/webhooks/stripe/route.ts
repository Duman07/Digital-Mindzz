import { NextRequest, NextResponse } from 'next/server'
import { stripe }                    from '@/lib/stripe/client'
import { createClient }              from '@/lib/supabase/server'
import Stripe                        from 'stripe'

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[Stripe Webhook] Firma inválida:', err)
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 })
  }

  const supabase = await createClient()

  switch (event.type) {

    case 'checkout.session.completed': {
      const session  = event.data.object as Stripe.Checkout.Session
      const orderId  = session.metadata?.order_id

      if (orderId) {
        // Actualizar estado de la orden
        await supabase.from('orders').update({ status: 'confirmed' }).eq('id', orderId)
        // Actualizar pago
        await supabase.from('payments')
          .update({
            status:         'approved',
            gateway_status: session.payment_status,
            paid_at:        new Date().toISOString(),
            payment_method: session.payment_method_types?.[0] ?? 'card',
          })
          .eq('gateway_payment_id', session.id)
      }
      break
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session
      await supabase.from('payments')
        .update({ status: 'declined', gateway_status: 'expired' })
        .eq('gateway_payment_id', session.id)
      break
    }

    default:
      console.log('[Stripe Webhook] Evento no manejado:', event.type)
  }

  return NextResponse.json({ received: true })
}
