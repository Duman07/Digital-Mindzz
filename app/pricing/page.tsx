'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useCart } from '@/components/cart/CartContext'
import { CheckCircle2, ShoppingCart, Zap, Globe, Link2, Rocket, MessageSquare, Cloud, Star } from 'lucide-react'
import type { Service, PlanType } from '@/lib/types'

// Datos del catálogo (en producción vendrán de Supabase)
const SERVICES: Service[] = [
  {
    id: '1', slug: 'desarrollo-web', name: 'Desarrollo Web', short_desc: 'Sitios y plataformas profesionales',
    description: 'Diseñamos y desarrollamos páginas web, tiendas en línea y aplicaciones web modernas.',
    icon: 'Globe', color: '#2563EB',
    features: ['Landing page optimizada', 'E-commerce con pagos', 'Panel de administración', 'SEO técnico', 'Diseño responsive', 'SSL incluido'],
    price_base: 2500000, price_monthly: 350000, category: 'development', is_active: true, sort_order: 1, created_at: '',
  },
  {
    id: '2', slug: 'automatizacion', name: 'Automatización', short_desc: 'Procesos que corren solos 24/7',
    description: 'Eliminamos tareas repetitivas mediante flujos automatizados.',
    icon: 'Zap', color: '#06B6D4',
    features: ['Automatización de ventas', 'Flujos de trabajo digitales', 'Notificaciones inteligentes', 'Reportes automáticos', 'Integración WhatsApp', 'Dashboard de métricas'],
    price_base: 1800000, price_monthly: 280000, category: 'automation', is_active: true, sort_order: 2, created_at: '',
  },
  {
    id: '3', slug: 'integracion-sistemas', name: 'Integración de Sistemas', short_desc: 'Todo conectado y sincronizado',
    description: 'Conectamos tus herramientas para que trabajen juntas.',
    icon: 'Link2', color: '#7C3AED',
    features: ['APIs y webhooks', 'Sincronización de datos', 'Migración histórica', 'ERP y CRM', 'Conectores personalizados', 'Documentación técnica'],
    price_base: 2000000, price_monthly: 300000, category: 'integration', is_active: true, sort_order: 3, created_at: '',
  },
  {
    id: '4', slug: 'transformacion-digital', name: 'Transformación Digital', short_desc: 'De 0 a digital, paso a paso',
    description: 'Acompañamiento completo en digitalización.',
    icon: 'Rocket', color: '#F59E0B',
    features: ['Diagnóstico digital', 'Hoja de ruta personalizada', 'Implementación guiada', 'Capacitación equipo (10 personas)', 'Seguimiento 3 meses', 'Manual de operaciones'],
    price_base: 3500000, price_monthly: 450000, category: 'consulting', is_active: true, sort_order: 4, created_at: '',
  },
  {
    id: '5', slug: 'consultoria-tecnologica', name: 'Consultoría Tecnológica', short_desc: 'Decisiones técnicas con estrategia',
    description: 'Asesoría experta para decisiones tecnológicas.',
    icon: 'MessageSquare', color: '#10B981',
    features: ['Análisis de necesidades', 'Selección de tecnologías', 'Auditoría de procesos', 'Asesoría en seguridad', 'Plan de inversión', '4 sesiones de seguimiento'],
    price_base: 1200000, price_monthly: 200000, category: 'consulting', is_active: true, sort_order: 5, created_at: '',
  },
  {
    id: '6', slug: 'soluciones-cloud', name: 'Soluciones Cloud', short_desc: 'Infraestructura escalable',
    description: 'Migra a la nube con soluciones escalables y seguras.',
    icon: 'Cloud', color: '#F97316',
    features: ['Migración completa a la nube', 'Almacenamiento encriptado', 'Servidores escalables', 'Backups automáticos diarios', 'Alta disponibilidad 99.9%', 'Monitoreo 24/7'],
    price_base: 1500000, price_monthly: 250000, category: 'infrastructure', is_active: true, sort_order: 6, created_at: '',
  },
]

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Zap, Link2, Rocket, MessageSquare, Cloud,
}

const COP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n)

export default function PricingPage() {
  const [planMode, setPlanMode] = useState<'one_time' | 'monthly'>('one_time')
  const { addItem, isInCart } = useCart()

  const getPrice = (s: Service): number =>
    planMode === 'one_time' ? (s.price_base ?? 0) : (s.price_monthly ?? 0)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dm-dark pt-24 pb-20">

        {/* Header */}
        <div className="container-dm px-4 sm:px-6 lg:px-8 text-center mb-14">
          <div className="badge mb-4 inline-flex">
            <Star className="w-3.5 h-3.5 text-yellow-400" />
            <span>Planes y precios</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Inversión transparente,<br />
            <span className="text-gradient">resultados reales</span>
          </h1>
          <p className="text-dm-gray max-w-xl mx-auto text-lg">
            Sin letras pequeñas. Precios en COP adaptados a MiPymes colombianas.
          </p>

          {/* Toggle pago único / mensual */}
          <div className="inline-flex items-center gap-1 mt-8 glass rounded-xl p-1 border border-white/10">
            {(['one_time', 'monthly'] as const).map((mode) => (
              <button key={mode} onClick={() => setPlanMode(mode)}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        planMode === mode
                          ? 'bg-dm-blue text-white shadow-glow-blue'
                          : 'text-dm-gray hover:text-white'
                      }`}>
                {mode === 'one_time' ? 'Pago único' : 'Soporte mensual'}
              </button>
            ))}
          </div>
          {planMode === 'monthly' && (
            <p className="text-dm-cyan text-sm mt-3 font-medium">
              ✓ Incluye mantenimiento, actualizaciones y soporte técnico
            </p>
          )}
        </div>

        {/* Grid de servicios */}
        <div className="container-dm px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const Icon    = ICON_MAP[service.icon ?? 'Globe']
              const price   = getPrice(service)
              const inCart  = isInCart(service.id)
              const popular = i === 0 // Desarrollo web como el más popular

              return (
                <div key={service.id}
                     className={`card-dm flex flex-col relative ${popular ? 'border-dm-blue/50 shadow-glow-blue' : ''}`}>

                  {popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge whitespace-nowrap"
                         style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)', color: 'white', border: 'none' }}>
                      ⭐ Más solicitado
                    </div>
                  )}

                  {/* Icono + título */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                         style={{ background: `${service.color}20` }}>
                      <Icon className="w-6 h-6" style={{ color: service.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">{service.name}</h3>
                      <p className="text-dm-gray text-sm">{service.short_desc}</p>
                    </div>
                  </div>

                  {/* Precio */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">{COP(price)}</span>
                    </div>
                    <p className="text-dm-gray text-xs mt-0.5">
                      {planMode === 'one_time' ? 'Proyecto completo · pago único' : 'por mes · facturación mensual'}
                    </p>
                  </div>

                  {/* Divisor */}
                  <div className="neon-divider mb-5" />

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-dm-gray">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: service.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => addItem(service, planMode, price)}
                    className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                      inCart
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 cursor-default'
                        : 'btn-primary'
                    }`}
                    disabled={inCart}
                    style={!inCart ? { background: `linear-gradient(135deg, ${service.color}, #06B6D4)` } : {}}
                  >
                    {inCart ? (
                      <><CheckCircle2 className="w-4 h-4" /> Agregado al carrito</>
                    ) : (
                      <><ShoppingCart className="w-4 h-4" /> Agregar al carrito</>
                    )}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Nota de diagnóstico */}
          <div className="mt-12 glass rounded-2xl p-7 border border-dm-blue/20 text-center">
            <p className="text-white font-bold text-lg mb-2">¿No sabes qué servicio necesitas?</p>
            <p className="text-dm-gray text-sm mb-5">
              Agenda tu diagnóstico gratuito. Analizamos tu negocio y te recomendamos exactamente lo que necesitas.
            </p>
            <a href="/#contacto" className="btn-primary inline-flex px-7 py-3">
              Diagnóstico gratuito →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
