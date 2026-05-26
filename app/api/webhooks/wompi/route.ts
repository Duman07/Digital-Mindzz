import { NextRequest, NextResponse } from 'next/server'
import { generateWompiSignature }    from '@/lib/wompi/client'
import { createClient }              from '@/lib/supabase/server'

interface WompiEvent {
  event:     string
  data:      { transaction: WompiTransaction }
  sent_at:   string
  timestamp: number
  signature: { properties: string[]; checksum: string }
}

interface WompiTransaction {
  id:                 string
  reference:          string
  status:             string
  amount_in_cents:    number
  currency:           string
  payment_method_type: string
}

export async function POST(req: NextRequest) {
  try {
    const body: WompiEvent = await req.json()

    // Verificar firma de Wompi
    const { properties, checksum } = body.signature
    const concatStr = properties.map((p) => {
      const parts = p.split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return parts.reduce((o: any, k) => o?.[k], body)
    }).join('') + process.env.WOMPI_EVENTS_SECRET

    const encoder  = new TextEncoder()
    const hashBuf  = await crypto.subtle.digest('SHA-256', encoder.encode(concatStr))
    const computed = Array.from(new Uint8Array(hashBuf)).map((b) => b.toString(16).padStart(2, '0')).join('')

    if (computed !== checksum) {
      console.error('[Wompi Webhook] Firma inválida')
      return NextResponse.json({ error: 'Firma inválida' }, { status: 400 })
    }

    const tx      = body.data.transaction
    const supabase = await createClient()

    if (body.event === 'transaction.updated') {
      const isApproved = tx.status === 'APPROVED'

      // Buscar pago por referencia
      const { data: payment } = await supabase
        .from('payments')
        .select('order_id')
        .eq('metadata->>reference', tx.reference)
        .single()

      if (payment) {
        await supabase.from('payments').update({
          gateway_payment_id: tx.id,
          gateway_status:     tx.status,
          status:             isApproved ? 'approved' : 'declined',
          payment_method:     tx.payment_method_type,
          paid_at:            isApproved ? new Date().toISOString() : null,
        }).eq('metadata->>reference', tx.reference)

        if (isApproved) {
          await supabase.from('orders')
            .update({ status: 'confirmed' })
            .eq('id', payment.order_id)
        }
      }
    }

    return NextResponse.json({ received: true })

  } catch (err) {
    console.error('[Wompi Webhook]', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
