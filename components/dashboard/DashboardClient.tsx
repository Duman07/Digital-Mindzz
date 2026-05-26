'use client'

import { useState }      from 'react'
import Link              from 'next/link'
import { createClient }  from '@/lib/supabase/client'
import { useRouter }     from 'next/navigation'
import type { User }     from '@supabase/supabase-js'
import type { Profile, Order } from '@/lib/types'
import {
  LayoutDashboard, ShoppingBag, User as UserIcon, LogOut,
  Zap, CheckCircle2, Clock, AlertCircle, XCircle, TrendingUp,
  Package, ArrowRight, RefreshCw
} from 'lucide-react'

const COP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n)

const STATUS_CONFIG: Record<string, { label: string; color: string; Icon: React.ElementType; bg: string }> = {
  pending:     { label: 'Pendiente',    color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', Icon: Clock },
  confirmed:   { label: 'Confirmado',   color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20',   Icon: CheckCircle2 },
  in_progress: { label: 'En progreso',  color: 'text-cyan-400',   bg: 'bg-cyan-500/10 border-cyan-500/20',   Icon: RefreshCw },
  completed:   { label: 'Completado',   color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20', Icon: CheckCircle2 },
  cancelled:   { label: 'Cancelado',    color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20',     Icon: XCircle },
}

const TABS = [
  { id: 'overview', label: 'Resumen',  Icon: LayoutDashboard },
  { id: 'orders',   label: 'Mis órdenes', Icon: ShoppingBag },
  { id: 'profile',  label: 'Mi perfil',   Icon: UserIcon },
]

interface Props {
  user:    User
  profile: Profile | null
  orders:  Order[]
}

export default function DashboardClient({ user, profile, orders }: Props) {
  const router   = useRouter()
  const supabase = createClient()
  const [tab, setTab] = useState<'overview' | 'orders' | 'profile'>('overview')

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const totalSpent = orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total_amount, 0)
  const activeOrders = orders.filter((o) => ['confirmed', 'in_progress'].includes(o.status)).length

  return (
    <div className="min-h-screen bg-dm-dark flex">

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-dm-dark-2 border-r border-white/5 p-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}>
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-lg">
            Digital<span className="text-gradient"> Mindz</span>
          </span>
        </Link>

        {/* Perfil mini */}
        <div className="glass rounded-xl p-3 mb-6 border border-white/5">
          <div className="w-10 h-10 rounded-full bg-dm-blue/20 border border-dm-blue/30 flex items-center justify-center mb-2">
            <span className="text-dm-cyan font-bold text-sm">
              {(profile?.full_name ?? user.email ?? 'U')[0].toUpperCase()}
            </span>
          </div>
          <p className="text-white font-semibold text-sm truncate">{profile?.full_name ?? 'Usuario'}</p>
          <p className="text-dm-gray text-xs truncate">{user.email}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id as typeof tab)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      tab === id
                        ? 'bg-dm-blue/15 text-white border border-dm-blue/30'
                        : 'text-dm-gray hover:text-white hover:bg-white/5'
                    }`}>
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout}
                className="flex items-center gap-2 text-dm-gray hover:text-red-400 transition-colors text-sm px-3 py-2 rounded-xl hover:bg-red-500/5 mt-4">
          <LogOut className="w-4 h-4" /> Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto">

        {/* Header mobile */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-dm-dark-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">Digital<span className="text-gradient"> Mindz</span></span>
          </Link>
          <button onClick={handleLogout} className="text-dm-gray hover:text-red-400 p-2">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs mobile */}
        <div className="md:hidden flex border-b border-white/5">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id as typeof tab)}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                      tab === id ? 'text-dm-cyan border-b-2 border-dm-cyan' : 'text-dm-gray'
                    }`}>
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="p-6 max-w-5xl">

          {/* === TAB: OVERVIEW === */}
          {tab === 'overview' && (
            <div>
              <h1 className="text-2xl font-black text-white mb-1">
                Hola, {profile?.full_name?.split(' ')[0] ?? 'Usuario'} 👋
              </h1>
              <p className="text-dm-gray text-sm mb-8">Aquí tienes el resumen de tu cuenta Digital Mindz.</p>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total órdenes', value: orders.length,  Icon: Package,     color: '#2563EB' },
                  { label: 'En progreso',   value: activeOrders,   Icon: RefreshCw,   color: '#06B6D4' },
                  { label: 'Completadas',   value: orders.filter((o) => o.status === 'completed').length, Icon: CheckCircle2, color: '#10B981' },
                  { label: 'Invertido',     value: COP(totalSpent), Icon: TrendingUp, color: '#F59E0B' },
                ].map(({ label, value, Icon, color }) => (
                  <div key={label} className="card-dm text-center">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                         style={{ background: `${color}20` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div className="text-xl font-black text-white">{value}</div>
                    <div className="text-dm-gray text-xs mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* Última orden */}
              {orders.length > 0 ? (
                <div className="glass rounded-2xl p-6 border border-dm-blue/20 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-white font-bold">Última orden</h2>
                    <button onClick={() => setTab('orders')}
                            className="text-dm-blue text-sm hover:text-dm-cyan transition-colors flex items-center gap-1">
                      Ver todas <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <OrderCard order={orders[0]} />
                </div>
              ) : (
                <div className="glass rounded-2xl p-10 border border-white/5 text-center">
                  <Package className="w-12 h-12 text-dm-gray/40 mx-auto mb-3" />
                  <p className="text-white font-semibold mb-1">Aún no tienes órdenes</p>
                  <p className="text-dm-gray text-sm mb-5">Explora nuestros servicios y empieza tu transformación digital.</p>
                  <Link href="/pricing" className="btn-primary inline-flex text-sm px-5 py-2.5">
                    Ver servicios <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* === TAB: ORDERS === */}
          {tab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-black text-white">Mis órdenes</h1>
                <Link href="/pricing" className="btn-primary text-sm px-4 py-2">
                  + Nueva orden
                </Link>
              </div>

              {orders.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center border border-white/5">
                  <ShoppingBag className="w-12 h-12 text-dm-gray/40 mx-auto mb-3" />
                  <p className="text-white font-semibold">No tienes órdenes todavía</p>
                  <Link href="/pricing" className="btn-primary inline-flex mt-5 text-sm px-5 py-2.5">
                    Explorar servicios
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => <OrderCard key={order.id} order={order} expanded />)}
                </div>
              )}
            </div>
          )}

          {/* === TAB: PROFILE === */}
          {tab === 'profile' && (
            <ProfileTab user={user} profile={profile} />
          )}
        </div>
      </main>
    </div>
  )
}

// ---- Sub-componentes ----

function OrderCard({ order, expanded = false }: { order: Order; expanded?: boolean }) {
  const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending
  const StatusIcon = cfg.Icon

  return (
    <div className={`glass rounded-xl p-5 border ${cfg.bg}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-white font-bold">{order.order_number}</p>
          <p className="text-dm-gray text-xs mt-0.5">
            {new Date(order.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color}`}>
          <StatusIcon className="w-3 h-3" />
          {cfg.label}
        </div>
      </div>

      {expanded && order.items && order.items.length > 0 && (
        <div className="space-y-2 mb-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-dm-gray">{item.service_name} × {item.quantity}</span>
              <span className="text-white">{COP(item.total_price)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-2">
        <span className="text-dm-gray text-sm">Total</span>
        <span className="text-white font-black">{COP(order.total_amount)}</span>
      </div>
    </div>
  )
}

function ProfileTab({ user, profile }: { user: User; profile: Profile | null }) {
  const supabase = createClient()
  const [form,    setForm]    = useState({ full_name: profile?.full_name ?? '', business_name: profile?.business_name ?? '', phone: profile?.phone ?? '', city: profile?.city ?? '' })
  const [loading, setLoading] = useState(false)
  const [saved,   setSaved]   = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from('profiles').update(form).eq('id', user.id)
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-white mb-8">Mi perfil</h1>
      <div className="glass rounded-2xl p-7 border border-dm-blue/20 max-w-lg">
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { name: 'full_name',     label: 'Nombre completo',   placeholder: 'Tu nombre' },
            { name: 'business_name', label: 'Nombre del negocio', placeholder: 'Tu empresa' },
            { name: 'phone',         label: 'Teléfono / WhatsApp', placeholder: '+57 300 000 0000' },
            { name: 'city',          label: 'Ciudad',              placeholder: 'Bogotá' },
          ].map(({ name, label, placeholder }) => (
            <div key={name}>
              <label className="text-xs text-dm-gray mb-1.5 block">{label}</label>
              <input value={(form as Record<string, string>)[name]}
                     onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
                     placeholder={placeholder}
                     className="w-full bg-dm-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/60 transition-colors" />
            </div>
          ))}

          <div>
            <label className="text-xs text-dm-gray mb-1.5 block">Correo electrónico</label>
            <input value={user.email ?? ''} disabled
                   className="w-full bg-dm-dark/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-dm-gray cursor-not-allowed" />
          </div>

          <button type="submit" disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-60">
            {loading ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  )
}
