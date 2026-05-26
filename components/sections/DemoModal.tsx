'use client'

import { useState, useEffect } from 'react'
import {
  X, ShoppingCart, Star, Search, ChevronRight,
  MapPin, Phone, Clock, Heart, Truck, Shield,
  Tag, Package, Zap, Coffee, Hammer, Sparkles,
  Shirt, Laptop, BadgeCheck, ArrowLeft, ArrowRight,
} from 'lucide-react'

// ─── Datos de plantillas ─────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: 'restaurante',
    icon: Coffee,
    label: 'Restaurante',
    name: 'La Cazuela Dorada',
    tagline: 'Sabores que enamoran desde 1998',
    color: '#E76F00',
    colorDark: '#7C3800',
    gradient: 'from-orange-600 to-amber-500',
    badge: 'Comidas típicas · Bogotá',
    rating: 4.9,
    reviews: 1240,
    banner: '🍲',
    products: [
      { name: 'Bandeja Paisa', price: 28000, original: 35000, img: '🍖', tag: 'Más pedido', stars: 5, sales: 320 },
      { name: 'Ajiaco Bogotano', price: 22000, original: null,  img: '🥣', tag: 'Tradicional', stars: 5, sales: 210 },
      { name: 'Caldo de Costilla', price: 18000, original: null, img: '🍵', tag: 'Desayuno', stars: 4, sales: 180 },
      { name: 'Lechona Tolimense', price: 32000, original: 40000, img: '🥘', tag: 'Oferta', stars: 5, sales: 95 },
      { name: 'Tamales Especiales', price: 15000, original: null, img: '🌯', tag: 'Nuevo', stars: 4, sales: 140 },
      { name: 'Postre de Natas', price: 8000, original: null, img: '🍮', tag: 'Postre', stars: 5, sales: 200 },
    ],
    info: ['Lun–Dom 7am–9pm', 'Cra 13 #45-67 Bogotá', '+57 310 555 0101'],
    shipping: 'Domicilio gratis +$50.000',
  },
  {
    id: 'ferreteria',
    icon: Hammer,
    label: 'Ferretería',
    name: 'El Maestro Ferretería',
    tagline: 'Todo para construir tus sueños',
    color: '#1D4ED8',
    colorDark: '#1e3a8a',
    gradient: 'from-blue-700 to-blue-500',
    badge: 'Construcción & Herramientas · Medellín',
    rating: 4.7,
    reviews: 890,
    banner: '🔧',
    products: [
      { name: 'Taladro Percutor 500W', price: 185000, original: 220000, img: '🔩', tag: '16% OFF', stars: 5, sales: 88 },
      { name: 'Cemento 50kg Argos', price: 38000, original: null, img: '🏗️', tag: 'Industrial', stars: 4, sales: 450 },
      { name: 'Pintura Blanca 1GL', price: 62000, original: 75000, img: '🪣', tag: 'Oferta', stars: 5, sales: 310 },
      { name: 'Kit Destornilladores x12', price: 45000, original: null, img: '🔨', tag: 'Más vendido', stars: 5, sales: 210 },
      { name: 'Tubo PVC 1/2"', price: 12000, original: null, img: '🪛', tag: 'Plomería', stars: 4, sales: 560 },
      { name: 'Cinta Métrica 5m', price: 18000, original: 25000, img: '📏', tag: 'Promo', stars: 4, sales: 175 },
    ],
    info: ['Lun–Sáb 7am–6pm', 'Carrera 80 #32-15 Medellín', '+57 4 444 5566'],
    shipping: 'Entrega en 24h · Medellín',
  },
  {
    id: 'boutique',
    icon: Shirt,
    label: 'Moda',
    name: 'Boutique Élite',
    tagline: 'Tu estilo, tu identidad',
    color: '#7C3AED',
    colorDark: '#4C1D95',
    gradient: 'from-violet-700 to-purple-500',
    badge: 'Ropa & Accesorios · Cali',
    rating: 4.8,
    reviews: 2100,
    banner: '👗',
    products: [
      { name: 'Vestido Floral Verano', price: 98000, original: 135000, img: '👗', tag: '27% OFF', stars: 5, sales: 430 },
      { name: 'Jean Skinny Premium', price: 85000, original: null, img: '👖', tag: 'Tendencia', stars: 5, sales: 320 },
      { name: 'Blusa Seda Italiana', price: 72000, original: 90000, img: '👚', tag: 'Lujo accesible', stars: 4, sales: 190 },
      { name: 'Zapatos Tacón 7cm', price: 145000, original: 180000, img: '👠', tag: 'Más amado', stars: 5, sales: 245 },
      { name: 'Bolso Cuero Genuino', price: 220000, original: null, img: '👜', tag: 'Premium', stars: 5, sales: 110 },
      { name: 'Gafas Sol UV400', price: 65000, original: 80000, img: '🕶️', tag: 'Verano', stars: 4, sales: 380 },
    ],
    info: ['Lun–Dom 9am–8pm', 'Av. 6N #25-40 Cali', '+57 2 558 4433'],
    shipping: 'Envío gratis en Colombia +$150k',
  },
  {
    id: 'spa',
    icon: Sparkles,
    label: 'Spa & Belleza',
    name: 'Spa Luminosa',
    tagline: 'Bienestar y belleza en un solo lugar',
    color: '#059669',
    colorDark: '#064E3B',
    gradient: 'from-emerald-700 to-teal-500',
    badge: 'Servicios de Belleza · Barranquilla',
    rating: 5.0,
    reviews: 730,
    banner: '💆',
    products: [
      { name: 'Masaje Relajante 60min', price: 95000, original: 120000, img: '🌿', tag: 'Más solicitado', stars: 5, sales: 280 },
      { name: 'Facial Hidratante', price: 75000, original: null, img: '✨', tag: 'Recomendado', stars: 5, sales: 195 },
      { name: 'Manicura + Pedicura', price: 55000, original: 70000, img: '💅', tag: '21% OFF', stars: 5, sales: 410 },
      { name: 'Tratamiento Capilar', price: 88000, original: null, img: '💇', tag: 'Reparador', stars: 4, sales: 150 },
      { name: 'Spa Día Completo', price: 250000, original: 320000, img: '🛁', tag: 'VIP', stars: 5, sales: 60 },
      { name: 'Depilación Láser', price: 130000, original: 160000, img: '⚡', tag: 'Tecnología', stars: 4, sales: 90 },
    ],
    info: ['Mar–Dom 9am–7pm', 'Calle 72 #43-10 Barranquilla', '+57 5 369 8800'],
    shipping: 'Reserva online · Pago seguro',
  },
  {
    id: 'tech',
    icon: Laptop,
    label: 'Tecnología',
    name: 'TechStore Colombia',
    tagline: 'La mejor tecnología al mejor precio',
    color: '#DC2626',
    colorDark: '#7F1D1D',
    gradient: 'from-red-700 to-rose-500',
    badge: 'Electrónica & Gaming · Nacional',
    rating: 4.6,
    reviews: 3400,
    banner: '💻',
    products: [
      { name: 'Laptop Gaming RTX 4060', price: 4200000, original: 5000000, img: '💻', tag: '16% OFF', stars: 5, sales: 42 },
      { name: 'iPhone 15 Pro 256GB', price: 4800000, original: null, img: '📱', tag: 'Nuevo', stars: 5, sales: 310 },
      { name: 'AirPods Pro 2da Gen', price: 890000, original: 1100000, img: '🎧', tag: 'Oferta', stars: 5, sales: 520 },
      { name: 'Monitor 4K 27" LG', price: 1350000, original: null, img: '🖥️', tag: 'Workstation', stars: 4, sales: 88 },
      { name: 'Teclado Mecánico RGB', price: 245000, original: 320000, img: '⌨️', tag: 'Gamer', stars: 4, sales: 195 },
      { name: 'Webcam Full HD 1080p', price: 185000, original: null, img: '📷', tag: 'Home Office', stars: 4, sales: 240 },
    ],
    info: ['Lun–Sáb 8am–7pm', 'Envíos a todo Colombia', '+57 300 222 3344'],
    shipping: 'Envío express 24-48h',
  },
]

// ─── Sub-componente: Tarjeta de producto ─────────────────────────────────────

function ProductCard({ p, color }: { p: typeof TEMPLATES[0]['products'][0]; color: string }) {
  const [added, setAdded] = useState(false)
  const [liked, setLiked] = useState(false)

  const formatPrice = (n: number) =>
    n >= 100000
      ? `$${(n / 1000).toFixed(0)}k`
      : `$${n.toLocaleString('es-CO')}`

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Badge */}
      {p.tag && (
        <span className="absolute top-2 left-2 z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
              style={{ background: color }}>
          {p.tag}
        </span>
      )}
      {/* Like */}
      <button onClick={() => setLiked(!liked)}
              className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition-colors">
        <Heart className={`w-3.5 h-3.5 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
      </button>

      {/* Imagen */}
      <div className="h-24 flex items-center justify-center text-4xl bg-gray-50 group-hover:scale-105 transition-transform duration-300">
        {p.img}
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p className="text-xs font-semibold text-gray-800 leading-tight mb-1 line-clamp-2">{p.name}</p>

        {/* Estrellas */}
        <div className="flex items-center gap-0.5 mb-1.5">
          {Array.from({ length: p.stars }).map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          ))}
          {Array.from({ length: 5 - p.stars }).map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 text-gray-200" />
          ))}
          <span className="text-[9px] text-gray-400 ml-1">({p.sales})</span>
        </div>

        {/* Precio */}
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-sm font-black" style={{ color }}>{formatPrice(p.price)}</span>
          {p.original && (
            <span className="text-[10px] text-gray-400 line-through">{formatPrice(p.original)}</span>
          )}
        </div>

        {/* Botón agregar */}
        <button
          onClick={handleAdd}
          className="w-full py-1.5 rounded-lg text-[11px] font-bold text-white transition-all duration-200 flex items-center justify-center gap-1"
          style={{ background: added ? '#10B981' : color }}
        >
          {added ? (
            <><BadgeCheck className="w-3 h-3" /> Agregado</>
          ) : (
            <><ShoppingCart className="w-3 h-3" /> Agregar</>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

interface DemoModalProps {
  open: boolean
  onClose: () => void
}

export default function DemoModal({ open, onClose }: DemoModalProps) {
  const [active, setActive] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [search, setSearch] = useState('')
  const [cartBounce, setCartBounce] = useState(false)

  const tmpl = TEMPLATES[active]

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Bloquear scroll del body
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const filteredProducts = tmpl.products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddToCart = () => {
    setCartCount(c => c + 1)
    setCartBounce(true)
    setTimeout(() => setCartBounce(false), 400)
  }

  const prev = () => { setActive(a => (a - 1 + TEMPLATES.length) % TEMPLATES.length); setSearch('') }
  const next = () => { setActive(a => (a + 1) % TEMPLATES.length); setSearch('') }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6"
         style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
         onClick={e => { if (e.target === e.currentTarget) onClose() }}>

      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/10">

        {/* ── Header del modal ── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 flex-shrink-0"
             style={{ background: 'rgba(15,23,42,0.95)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
                 style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}>
              DM
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Demo · Tiendas en Digital Mindz</p>
              <p className="text-xs text-slate-400 mt-0.5">Así se ve tu negocio en la plataforma</p>
            </div>
          </div>
          <button onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Tabs de plantillas ── */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 overflow-x-auto flex-shrink-0 scrollbar-hide"
             style={{ background: 'rgba(30,41,59,0.5)' }}>
          {TEMPLATES.map((t, i) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => { setActive(i); setSearch('') }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  active === i
                    ? 'text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                style={active === i ? { background: t.color } : {}}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            )
          })}
          <div className="ml-auto flex items-center gap-1 flex-shrink-0 pl-2">
            <button onClick={prev} className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button onClick={next} className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Contenido de la tienda demo ── */}
        <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">

          {/* Banner del negocio */}
          <div className={`relative bg-gradient-to-r ${tmpl.gradient} px-6 py-8 text-white overflow-hidden`}>
            {/* Patrón de fondo */}
            <div className="absolute inset-0 opacity-10"
                 style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0, transparent 50%), radial-gradient(circle at 80% 20%, white 0, transparent 40%)' }} />

            {/* Navbar simulada */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
                  {tmpl.banner}
                </div>
                <div>
                  <div className="font-black text-lg leading-tight">{tmpl.name}</div>
                  <div className="text-xs text-white/80">{tmpl.badge}</div>
                </div>
              </div>

              {/* Cart */}
              <button
                onClick={handleAddToCart}
                className={`relative flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all px-3 py-2 rounded-xl ${cartBounce ? 'scale-110' : 'scale-100'}`}
                style={{ transition: 'all 0.2s' }}>
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-semibold">{cartCount > 0 ? `${cartCount} items` : 'Carrito'}</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-xs font-black flex items-center justify-center"
                        style={{ color: tmpl.color }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Tagline + rating */}
            <div className="relative">
              <h2 className="text-2xl font-black mb-1">{tmpl.tagline}</h2>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(tmpl.rating) ? 'fill-amber-300 text-amber-300' : 'text-white/30'}`} />
                  ))}
                  <span className="ml-1 text-sm font-bold">{tmpl.rating}</span>
                  <span className="text-xs text-white/70">({tmpl.reviews.toLocaleString()} reseñas)</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <Truck className="w-3.5 h-3.5" />
                  {tmpl.shipping}
                </div>
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <Shield className="w-3.5 h-3.5" />
                  Compra protegida
                </div>
              </div>
            </div>
          </div>

          {/* Barra de búsqueda + info */}
          <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Buscar en ${tmpl.name}...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 text-gray-700 placeholder-gray-400 bg-gray-50"
                style={{ '--tw-ring-color': tmpl.color } as React.CSSProperties}
              />
            </div>
            <div className="hidden sm:flex items-center gap-3 text-xs text-gray-500">
              {tmpl.info.map((info, i) => {
                const Icon = [Clock, MapPin, Phone][i]
                return (
                  <div key={i} className="flex items-center gap-1">
                    <Icon className="w-3.5 h-3.5" style={{ color: tmpl.color }} />
                    <span>{info}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Grid de productos */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" style={{ color: tmpl.color }} />
                <span className="text-sm font-bold text-gray-700">
                  {search ? `Resultados para "${search}"` : 'Productos destacados'}
                  {' '}
                  <span className="text-gray-400 font-normal">({filteredProducts.length})</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500">Ordenar:</span>
                <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 bg-white focus:outline-none">
                  <option>Más vendidos</option>
                  <option>Menor precio</option>
                  <option>Mayor precio</option>
                  <option>Mejor calificados</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" onClick={handleAddToCart}>
                {filteredProducts.map((p, i) => (
                  <ProductCard key={i} p={p} color={tmpl.color} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No se encontraron productos</p>
              </div>
            )}

            {/* Banner promo */}
            <div className={`mt-4 bg-gradient-to-r ${tmpl.gradient} rounded-xl p-4 flex items-center justify-between text-white`}>
              <div>
                <p className="font-black text-sm">¡Oferta especial del mes!</p>
                <p className="text-xs text-white/80 mt-0.5">Hasta 30% de descuento en productos seleccionados</p>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-bold cursor-pointer hover:bg-white/30 transition-colors flex-shrink-0">
                Ver todo <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer del modal ── */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-[#0F172A] flex-shrink-0">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-dm-cyan" />
            <span className="text-xs text-slate-400">
              Plantilla <span className="text-white font-semibold">{active + 1}/{TEMPLATES.length}</span>
              {' '}— Tu tienda lista en minutos
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a href="#contacto"
               onClick={onClose}
               className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1.5"
               style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}>
              <Tag className="w-3.5 h-3.5" />
              Quiero esta plantilla
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
