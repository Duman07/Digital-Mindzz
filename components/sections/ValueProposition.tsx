'use client'

import { Shield, Target, HeartHandshake, Gauge, Layers, TrendingUp } from 'lucide-react'

const pillars = [
  {
    Icon:        Shield,
    title:       'Seguro y confiable',
    description: 'Implementamos buenas prácticas de seguridad en cada proyecto: encriptación, autenticación robusta y backups automáticos.',
    color:       '#2563EB',
  },
  {
    Icon:        Target,
    title:       'Personalizado para ti',
    description: 'No somos una agencia de templates. Cada solución se diseña según los procesos, el tamaño y las metas de tu empresa.',
    color:       '#06B6D4',
  },
  {
    Icon:        HeartHandshake,
    title:       'Acompañamiento real',
    description: 'Desde el primer diagnóstico hasta el soporte post-lanzamiento. No te dejamos solo en ninguna etapa del proceso.',
    color:       '#7C3AED',
  },
  {
    Icon:        Gauge,
    title:       'Resultados medibles',
    description: 'Definimos indicadores claros antes de empezar. Puedes ver el impacto real de la tecnología en tus operaciones.',
    color:       '#10B981',
  },
  {
    Icon:        Layers,
    title:       'Tecnología escalable',
    description: 'Lo que construimos hoy crece contigo mañana. Arquitecturas modernas que se adaptan al tamaño de tu negocio.',
    color:       '#F59E0B',
  },
  {
    Icon:        TrendingUp,
    title:       'Precios accesibles',
    description: 'Sabemos que las MiPymes tienen presupuestos reales. Nuestros planes se adaptan a tus posibilidades de inversión.',
    color:       '#F97316',
  },
]

export default function ValueProposition() {
  return (
    <section id="nosotros" className="section-padding bg-dm-dark-2 relative overflow-hidden">

      {/* Fondo grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-dm relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge mb-4 inline-flex">
            <Target className="w-3.5 h-3.5 text-dm-cyan" />
            <span>Por qué elegirnos</span>
          </div>
          <h2 className="section-title">
            <span className="text-white">Nuestra </span>
            <span className="text-gradient">propuesta de valor</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Digital Mindz nace para cerrar la brecha tecnológica en Colombia. Aquí los 6 pilares que nos diferencian.
          </p>
        </div>

        {/* Grid de pilares */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map(({ Icon, title, description, color }) => (
            <div key={title} className="card-dm group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                     style={{ background: `${color}20` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2 text-lg">{title}</h3>
                  <p className="text-dm-gray text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner central */}
        <div className="mt-14 glass rounded-2xl p-8 md:p-10 text-center border border-dm-blue/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
               style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }} />
          <div className="relative z-10">
            <p className="text-2xl md:text-3xl font-black text-white mb-3">
              "Tecnología a tu medida.<br />
              <span className="text-gradient">Resultados que se notan."</span>
            </p>
            <p className="text-dm-gray max-w-lg mx-auto text-sm">
              Somos un equipo de ingenieros de sistemas apasionados por el impacto social de la tecnología en las empresas colombianas.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
