import { NextRequest, NextResponse }        from 'next/server'
import { generateWompiSignature, toWompiAmount } from '@/lib/wompi/client'
import { createClient }                    from '@/lib/supabase/server'
import type { CartItem }                   from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Verificar sesión
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { items }: { items: CartItem[] } = await req.json()

    if (!items?.length) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 })
    }

    const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

    // Crear orden en Supabase
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({ user_id: user.id, total_amount: total, currency: 'COP' })
      .select()
      .single()

    if (orderErr || !order) {
      throw new Error('Error creando orden: ' + orderErr?.message)
    }

    // Insertar items
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

    // Generar firma de integridad Wompi
    const amountCents = toWompiAmount(total)
    const signature   = await generateWompiSignature(
      order.order_number,
      amountCents,
      'COP'
    )

    // Registrar pago pendiente
    await supabase.from('payments').insert({
      order_id:       order.id,
      gateway:        'wompi',
      gateway_status: 'pending',
      amount:         total,
      currency:       'COP',
      status:         'pending',
      metadata:       { reference: order.order_number },
    })

    // Devolvemos los datos necesarios para el widget de Wompi en el frontend
    return NextResponse.json({
      reference:    order.order_number,
      amountCents,
      currency:     'COP',
      signature,
      orderId:      order.id,
    })

  } catch (err) {
    console.error('[Wompi Checkout]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error interno' },
      { status: 500 }
    )
  }
}
