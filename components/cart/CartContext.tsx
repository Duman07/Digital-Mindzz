'use client'

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import type { CartItem, CartState, Service, PlanType } from '@/lib/types'

// ============================================================
// Estado y acciones del carrito
// ============================================================
type CartAction =
  | { type: 'ADD_ITEM';    service: Service; plan_type: PlanType; price: number }
  | { type: 'REMOVE_ITEM'; serviceId: string; plan_type: PlanType }
  | { type: 'UPDATE_QTY';  serviceId: string; plan_type: PlanType; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE';     items: CartItem[] }

function calcTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0)
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {

    case 'ADD_ITEM': {
      const key = `${action.service.id}-${action.plan_type}`
      const existing = state.items.find(
        (i) => i.service.id === action.service.id && i.plan_type === action.plan_type
      )
      const items = existing
        ? state.items.map((i) =>
            i.service.id === action.service.id && i.plan_type === action.plan_type
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.items, { service: action.service, quantity: 1, plan_type: action.plan_type, price: action.price }]

      return { items, total: calcTotal(items), itemCount: items.reduce((s, i) => s + i.quantity, 0) }
    }

    case 'REMOVE_ITEM': {
      const items = state.items.filter(
        (i) => !(i.service.id === action.serviceId && i.plan_type === action.plan_type)
      )
      return { items, total: calcTotal(items), itemCount: items.reduce((s, i) => s + i.quantity, 0) }
    }

    case 'UPDATE_QTY': {
      const items = action.quantity <= 0
        ? state.items.filter((i) => !(i.service.id === action.serviceId && i.plan_type === action.plan_type))
        : state.items.map((i) =>
            i.service.id === action.serviceId && i.plan_type === action.plan_type
              ? { ...i, quantity: action.quantity }
              : i
          )
      return { items, total: calcTotal(items), itemCount: items.reduce((s, i) => s + i.quantity, 0) }
    }

    case 'CLEAR':
      return { items: [], total: 0, itemCount: 0 }

    case 'HYDRATE': {
      const items = action.items
      return { items, total: calcTotal(items), itemCount: items.reduce((s, i) => s + i.quantity, 0) }
    }

    default:
      return state
  }
}

// ============================================================
// Context
// ============================================================
interface CartContextValue {
  cart:        CartState
  addItem:     (service: Service, plan_type: PlanType, price: number) => void
  removeItem:  (serviceId: string, plan_type: PlanType) => void
  updateQty:   (serviceId: string, plan_type: PlanType, quantity: number) => void
  clearCart:   () => void
  isInCart:    (serviceId: string) => boolean
  drawerOpen:  boolean
  openDrawer:  () => void
  closeDrawer: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'dm_cart'
const INITIAL: CartState = { items: [], total: 0, itemCount: 0 }

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart,        dispatch]    = useReducer(cartReducer, INITIAL)
  const [drawerOpen,  setDrawer]   = useReducer((s: boolean, v: boolean) => v, false)

  // Rehidratar desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const items: CartItem[] = JSON.parse(stored)
        dispatch({ type: 'HYDRATE', items })
      }
    } catch { /* ignore */ }
  }, [])

  // Persistir en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.items))
    } catch { /* ignore */ }
  }, [cart.items])

  const addItem = useCallback((service: Service, plan_type: PlanType, price: number) => {
    dispatch({ type: 'ADD_ITEM', service, plan_type, price })
    setDrawer(true)
  }, [])

  const removeItem = useCallback((serviceId: string, plan_type: PlanType) =>
    dispatch({ type: 'REMOVE_ITEM', serviceId, plan_type }), [])

  const updateQty = useCallback((serviceId: string, plan_type: PlanType, quantity: number) =>
    dispatch({ type: 'UPDATE_QTY', serviceId, plan_type, quantity }), [])

  const clearCart  = useCallback(() => dispatch({ type: 'CLEAR' }), [])
  const isInCart   = useCallback((id: string) => cart.items.some((i) => i.service.id === id), [cart.items])
  const openDrawer  = useCallback(() => setDrawer(true),  [])
  const closeDrawer = useCallback(() => setDrawer(false), [])

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, isInCart, drawerOpen, openDrawer, closeDrawer }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
