import { NextRequest, NextResponse } from 'next/server'
import { stripe }                    from '@/lib/stripe/client'
import { createClient }              from '@/lib/supabase/server'
import type { CartItem }             from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Verificar sesión
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { items, successUrl, cancelUrl }: {
      items:      CartItem[]
      successUrl: string
      cancelUrl:  string
    } = await req.json()

    if (!items?.length) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 })
    }

    // Crear orden en Supabase
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({ user_id: user.id, total_amount: total, currency: 'COP' })
      .select()
      .single()

    if (orderErr || !order) {
      throw new Error('Error creando la orden: ' + orderErr?.message)
    }

    // Insertar items de la orden
    await supabase.from('order_items').insert(
      items.map((item) => ({
        order_id:     order.id,
        service_id:   item.service.id,
        service_name: item.service.name,
        quantity:     item.quantity,
        unit_price:   item.price,
        plan_type:    item.plan_type,
      }))
    )

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode:                 'payment',
      locale:               'es',
      customer_email:       user.email,
      metadata: {
        order_id:   order.id,
        user_id:    user.id,
        order_num:  order.order_number,
      },
      line_items: items.map((item) => ({
        price_data: {
          currency:     'cop',
          unit_amount:  Math.round(item.price * 100), // Stripe usa centavos
          product_data: {
            name:        item.service.name,
            description: item.service.short_desc,
          },
        },
        quantity: item.quantity,
      })),
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&order=${order.order_number}`,
      cancel_url:  cancelUrl,
    })

    // Registrar pago pendiente
    await supabase.from('payments').insert({
      order_id:          order.id,
      gateway:           'stripe',
      gateway_payment_id: session.id,
      gateway_status:    'created',
      amount:            total,
      currency:          'COP',
      status:            'pending',
      metadata:          { session_id: session.id },
    })

    return NextResponse.json({ url: session.url })

  } catch (err) {
    console.error('[Stripe Checkout]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error interno' },
      { status: 500 }
    )
  }
}
