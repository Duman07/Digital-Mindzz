'use client'

import { useState } from 'react'
import { Globe, Zap, Link2, Rocket, MessageSquare, Cloud, ArrowRight } from 'lucide-react'

const services = [
  {
    id:          'web',
    Icon:        Globe,
    title:       'Desarrollo Web',
    short:       'Sitios y plataformas profesionales',
    description: 'Diseñamos y desarrollamos páginas web, tiendas en línea y aplicaciones web modernas, rápidas y seguras. Tu presencia digital comienza aquí.',
    features:    ['Landing pages de alta conversión', 'E-commerce completo', 'Paneles de administración', 'SEO optimizado', 'Diseño responsive'],
    color:       '#2563EB',
    gradient:    'from-blue-600 to-blue-400',
  },
  {
    id:          'auto',
    Icon:        Zap,
    title:       'Automatización',
    short:       'Procesos que corren solos',
    description: 'Eliminamos tareas repetitivas y manuales mediante flujos automatizados que ahorran tiempo, reducen errores y escalan con tu negocio.',
    features:    ['Automatización de ventas', 'Flujos de trabajo digitales', 'Notificaciones inteligentes', 'Reportes automáticos', 'Integración con WhatsApp'],
    color:       '#06B6D4',
    gradient:    'from-cyan-500 to-cyan-300',
  },
  {
    id:          'integra',
    Icon:        Link2,
    title:       'Integración de Sistemas',
    short:       'Todo conectado, todo sincronizado',
    description: 'Conectamos tus herramientas existentes (facturación, inventarios, CRM, etc.) para que trabajen juntas sin fricciones.',
    features:    ['APIs y webhooks', 'Sincronización de datos', 'Migración de información', 'ERP y CRM', 'Conectores personalizados'],
    color:       '#7C3AED',
    gradient:    'from-purple-600 to-purple-400',
  },
  {
    id:          'trans',
    Icon:        Rocket,
    title:       'Transformación Digital',
    short:       'De 0 a digital, paso a paso',
    description: 'Acompañamos a tu empresa en el proceso completo de digitalización: desde el diagnóstico hasta la implementación y adopción.',
    features:    ['Diagnóstico digital', 'Hoja de ruta personalizada', 'Implementación guiada', 'Capacitación del equipo', 'Seguimiento continuo'],
    color:       '#F59E0B',
    gradient:    'from-amber-500 to-amber-300',
  },
  {
    id:          'consul',
    Icon:        MessageSquare,
    title:       'Consultoría Tecnológica',
    short:       'Decisiones técnicas con estrategia',
    description: 'Asesoría experta para que tomes las mejores decisiones tecnológicas para tu negocio, sin desperdiciar recursos en herramientas equivocadas.',
    features:    ['Análisis de necesidades', 'Selección de tecnologías', 'Auditoría de procesos', 'Asesoría en seguridad', 'Plan de inversión tech'],
    color:       '#10B981',
    gradient:    'from-emerald-500 to-emerald-300',
  },
  {
    id:          'cloud',
    Icon:        Cloud,
    title:       'Soluciones Cloud',
    short:       'Infraestructura sin límites',
    description: 'Migra tu negocio a la nube con soluciones escalables, seguras y de bajo costo, para que siempre estés disponible y crezcas sin fricciones.',
    features:    ['Migración a la nube', 'Almacenamiento seguro', 'Servidores escalables', 'Backups automáticos', 'Alta disponibilidad'],
    color:       '#F97316',
    gradient:    'from-orange-500 to-orange-300',
  },
]

export default function Services() {
  const [active, setActive] = useState(services[0].id)
  const selected = services.find((s) => s.id === active)!

  return (
    <section id="servicios" className="section-padding bg-dm-dark relative overflow-hidden">

      {/* Orbe decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />

      <div className="container-dm">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge mb-4 inline-flex">
            <Zap className="w-3.5 h-3.5 text-dm-cyan" />
            <span>Lo que hacemos</span>
          </div>
          <h2 className="section-title">
            <span className="text-white">Nuestros </span>
            <span className="text-gradient">servicios</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Soluciones tecnológicas completas pensadas para las necesidades reales de las MiPymes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Tabs de servicios */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
            {services.map(({ id, Icon, title, short, color }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                  active === id
                    ? 'border-dm-blue/60 bg-dm-blue/10 shadow-glow-blue'
                    : 'border-white/5 bg-dm-dark-2 hover:border-white/15 hover:bg-white/5'
                }`}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                     style={{ background: `${color}22` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="text-sm font-semibold text-white mb-1">{title}</div>
                <div className="text-xs text-dm-gray leading-tight">{short}</div>
              </button>
            ))}
          </div>

          {/* Panel de detalle */}
          <div key={active} className="glass rounded-2xl p-7 border border-dm-blue/20 animate-fade-in">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                   style={{ background: `${selected.color}22` }}>
                <selected.Icon className="w-7 h-7" style={{ color: selected.color }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selected.title}</h3>
                <p className="text-dm-gray text-sm">{selected.short}</p>
              </div>
            </div>

            <p className="text-dm-gray leading-relaxed mb-6">{selected.description}</p>

            <div className="space-y-2.5 mb-6">
              {selected.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-dm-white">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                       style={{ background: `${selected.color}22` }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: selected.color }} />
                  </div>
                  {f}
                </div>
              ))}
            </div>

            <a href="#contacto"
               className="btn-primary w-full justify-center text-sm"
               style={{ background: `linear-gradient(135deg, ${selected.color}, #06B6D4)` }}>
              Solicitar este servicio
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
