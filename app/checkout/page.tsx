'use client'

import { useState }       from 'react'
import { useRouter }      from 'next/navigation'
import Link               from 'next/link'
import Navbar             from '@/components/layout/Navbar'
import { useCart }        from '@/components/cart/CartContext'
import { ArrowLeft, ShoppingCart, CreditCard, Building2, Smartphone, CheckCircle2, Lock } from 'lucide-react'
import { WOMPI_PUBLIC_KEY } from '@/lib/wompi/client'

const COP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n)

const PLAN_LABELS: Record<string, string> = {
  one_time: 'Pago único',
  monthly:  'Mensual',
  annual:   'Anual',
}

type Gateway = 'wompi' | 'stripe'

export default function CheckoutPage() {
  const router              = useRouter()
  const { cart, clearCart } = useCart()
  const [gateway, setGateway] = useState<Gateway>('wompi')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  if (cart.items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-dm-dark flex items-center justify-center">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 text-dm-gray/40 mx-auto mb-4" />
            <h2 className="text-white text-2xl font-bold mb-2">Tu carrito está vacío</h2>
            <Link href="/pricing" className="btn-primary mt-4 inline-flex">Ver servicios</Link>
          </div>
        </div>
      </>
    )
  }

  const handleStripeCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout/stripe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          items:      cart.items,
          successUrl: `${window.location.origin}/dashboard?tab=orders`,
          cancelUrl:  `${window.location.origin}/checkout`,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      clearCart()
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar el pago')
      setLoading(false)
    }
  }

  const handleWompiCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout/wompi', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ items: cart.items }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      // Inyectar widget de Wompi dinámicamente
      const form        = document.getElementById('wompi-form') as HTMLFormElement
      const script      = document.createElement('script')
      script.src        = 'https://checkout.wompi.co/widget.js'
      script.setAttribute('data-render',           'button')
      script.setAttribute('data-public-key',       WOMPI_PUBLIC_KEY)
      script.setAttribute('data-currency',         'COP')
      script.setAttribute('data-amount-in-cents',  String(data.amountCents))
      script.setAttribute('data-reference',        data.reference)
      script.setAttribute('data-signature:integrity', data.signature)
      script.setAttribute('data-redirect-url',
        `${window.location.origin}/dashboard?tab=orders&order=${data.reference}`)
      form.appendChild(script)
      clearCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar Wompi')
      setLoading(false)
    }
  }

  const handlePay = () => gateway === 'stripe' ? handleStripeCheckout() : handleWompiCheckout()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dm-dark pt-24 pb-20 px-4">
        <div className="container-dm max-w-5xl">

          <Link href="/pricing" className="inline-flex items-center gap-2 text-dm-gray hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver al catálogo
          </Link>

          <h1 className="text-3xl font-black text-white mb-8">
            <span className="text-gradient">Checkout</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Panel izquierdo: método de pago */}
            <div className="lg:col-span-3 space-y-5">

              {/* Selector de pasarela */}
              <div className="glass rounded-2xl p-6 border border-dm-blue/20">
                <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-dm-cyan" /> Método de pago
                </h2>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { id: 'wompi'  as Gateway, label: 'Wompi', sub: 'PSE · Nequi · Efectivo · Tarjeta', flag: '🇨🇴' },
                    { id: 'stripe' as Gateway, label: 'Stripe', sub: 'Tarjeta internacional', flag: '🌍' },
                  ].map(({ id, label, sub, flag }) => (
                    <button key={id} onClick={() => setGateway(id)}
                            className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                              gateway === id
                                ? 'border-dm-blue/60 bg-dm-blue/10'
                                : 'border-white/10 bg-dm-dark-2 hover:border-white/20'
                            }`}>
                      <div className="text-lg mb-1">{flag}</div>
                      <div className="text-white font-bold text-sm">{label}</div>
                      <div className="text-dm-gray text-xs mt-0.5">{sub}</div>
                    </button>
                  ))}
                </div>

                {/* Info según pasarela */}
                {gateway === 'wompi' ? (
                  <div className="glass rounded-xl p-4 border border-dm-cyan/20">
                    <p className="text-dm-gray text-sm">
                      Pagarás a través del <span className="text-white font-semibold">widget seguro de Wompi</span> (Bancolombia).
                      Acepta PSE, Nequi, tarjetas débito/crédito y pago en efectivo.
                    </p>
                  </div>
                ) : (
                  <div className="glass rounded-xl p-4 border border-blue-400/20">
                    <p className="text-dm-gray text-sm">
                      Serás redirigido al <span className="text-white font-semibold">portal seguro de Stripe</span>.
                      Acepta Visa, Mastercard y American Express.
                    </p>
                  </div>
                )}
              </div>

              {/* Seguridad */}
              <div className="flex items-center gap-3 text-dm-gray text-xs px-1">
                <Lock className="w-4 h-4 text-dm-cyan flex-shrink-0" />
                <span>Pago 100% seguro · Encriptación SSL · Tus datos nunca se almacenan en nuestros servidores</span>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Botón de pago */}
              <button onClick={handlePay} disabled={loading}
                      className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Procesando...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pagar {COP(cart.total)} con {gateway === 'wompi' ? 'Wompi' : 'Stripe'}
                  </>
                )}
              </button>

              {/* Wompi widget container */}
              <form id="wompi-form" />
            </div>

            {/* Panel derecho: resumen del pedido */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-6 border border-dm-blue/20 sticky top-24">
                <h2 className="text-white font-bold text-lg mb-4">Resumen del pedido</h2>

                <div className="space-y-3 mb-5">
                  {cart.items.map((item) => (
                    <div key={`${item.service.id}-${item.plan_type}`}
                         className="flex items-start justify-between gap-3 pb-3 border-b border-white/5 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{item.service.name}</p>
                        <p className="text-dm-gray text-xs mt-0.5">
                          {PLAN_LABELS[item.plan_type]} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-dm-cyan text-sm font-bold flex-shrink-0">
                        {COP(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="neon-divider mb-4" />

                <div className="flex justify-between items-center mb-1">
                  <span className="text-dm-gray text-sm">Subtotal</span>
                  <span className="text-white text-sm">{COP(cart.total)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-dm-gray text-sm">IVA</span>
                  <span className="text-dm-gray text-sm">Incluido</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-black text-gradient">{COP(cart.total)}</span>
                </div>

                <div className="mt-5 space-y-2">
                  {['Diagnóstico gratuito incluido', 'Garantía de satisfacción 15 días', 'Soporte durante todo el proyecto'].map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs text-dm-gray">
                      <CheckCircle2 className="w-3.5 h-3.5 text-dm-cyan flex-shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
