'use client'

import Link from 'next/link'
import { useCart } from './CartContext'
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, PackageOpen } from 'lucide-react'

const COP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n)

const PLAN_LABELS: Record<string, string> = {
  one_time: 'Pago único',
  monthly:  'Mensual',
  annual:   'Anual',
}

export default function CartDrawer() {
  const { cart, drawerOpen, closeDrawer, removeItem, updateQty, clearCart } = useCart()

  return (
    <>
      {/* Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
             onClick={closeDrawer} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-96 glass-dark border-l border-dm-blue/20
                       flex flex-col transition-transform duration-300 ease-out ${
                         drawerOpen ? 'translate-x-0' : 'translate-x-full'
                       }`}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-dm-cyan" />
            <h2 className="text-white font-bold">Tu carrito</h2>
            {cart.itemCount > 0 && (
              <span className="badge text-xs px-2 py-0.5">{cart.itemCount}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {cart.itemCount > 0 && (
              <button onClick={clearCart}
                      className="text-xs text-dm-gray hover:text-red-400 transition-colors flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> Limpiar
              </button>
            )}
            <button onClick={closeDrawer}
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center text-dm-gray hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <PackageOpen className="w-12 h-12 text-dm-gray/40 mb-3" />
              <p className="text-dm-gray font-medium">Tu carrito está vacío</p>
              <p className="text-dm-gray/60 text-sm mt-1">Explora nuestros servicios</p>
              <Link href="/pricing" onClick={closeDrawer}
                    className="btn-primary text-sm mt-5 px-5 py-2.5">
                Ver servicios
              </Link>
            </div>
          ) : (
            cart.items.map((item) => (
              <div key={`${item.service.id}-${item.plan_type}`}
                   className="glass rounded-xl p-4 border border-white/5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{item.service.name}</p>
                    <span className="badge text-xs mt-1">{PLAN_LABELS[item.plan_type]}</span>
                  </div>
                  <button onClick={() => removeItem(item.service.id, item.plan_type)}
                          className="text-dm-gray hover:text-red-400 transition-colors flex-shrink-0 p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  {/* Cantidad */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.service.id, item.plan_type, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-dm-dark border border-white/10 flex items-center justify-center text-dm-gray hover:text-white transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-white font-semibold text-sm w-5 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.service.id, item.plan_type, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-dm-dark border border-white/10 flex items-center justify-center text-dm-gray hover:text-white transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-dm-cyan font-bold text-sm">
                    {COP(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer con total y CTA */}
        {cart.items.length > 0 && (
          <div className="p-5 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-dm-gray">Total</span>
              <span className="text-2xl font-black text-white">{COP(cart.total)}</span>
            </div>
            <Link href="/checkout" onClick={closeDrawer} className="btn-primary w-full justify-center">
              Ir al checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={closeDrawer}
                    className="btn-secondary w-full justify-center text-sm">
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}
