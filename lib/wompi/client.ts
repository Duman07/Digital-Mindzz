/**
 * Wompi — Pasarela de pagos colombiana de Bancolombia
 * Docs: https://docs.wompi.co
 *
 * Modos:
 *   - Sandbox:    https://sandbox.wompi.co/v1
 *   - Producción: https://production.wompi.co/v1
 */

const WOMPI_BASE = process.env.NODE_ENV === 'production'
  ? 'https://production.wompi.co/v1'
  : 'https://sandbox.wompi.co/v1'

export const WOMPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY ?? ''
const WOMPI_PRIVATE_KEY       = process.env.WOMPI_PRIVATE_KEY ?? ''

/** Genera la firma de integridad para Wompi */
export async function generateWompiSignature(
  reference:  string,
  amountCents: number,
  currency:   string,
  secret:     string = process.env.WOMPI_INTEGRITY_SECRET ?? ''
): Promise<string> {
  const raw     = `${reference}${amountCents}${currency}${secret}`
  const encoder = new TextEncoder()
  const data    = encoder.encode(raw)
  const hashBuf = await crypto.subtle.digest('SHA-256', data)
  const hashArr = Array.from(new Uint8Array(hashBuf))
  return hashArr.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Obtiene los medios de pago disponibles en Wompi */
export async function getWompiPaymentMethods() {
  const res = await fetch(`${WOMPI_BASE}/merchants/${WOMPI_PUBLIC_KEY}`)
  if (!res.ok) throw new Error('Error consultando Wompi')
  return res.json()
}

/** Consulta el estado de una transacción Wompi */
export async function getWompiTransaction(transactionId: string) {
  const res = await fetch(`${WOMPI_BASE}/transactions/${transactionId}`, {
    headers: { Authorization: `Bearer ${WOMPI_PRIVATE_KEY}` },
  })
  if (!res.ok) throw new Error('Error consultando transacción Wompi')
  return res.json()
}

/** Monto en centavos para Wompi (COP ya viene en centavos nativamente) */
export const toWompiAmount = (copAmount: number) => Math.round(copAmount * 100)
