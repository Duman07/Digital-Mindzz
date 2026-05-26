'use client'

import { Search, FileText, Code2, Rocket, HeadphonesIcon } from 'lucide-react'

const steps = [
  {
    num:         '01',
    Icon:        Search,
    title:       'Diagnóstico digital',
    description: 'Analizamos tus procesos, herramientas actuales y metas de negocio para identificar las oportunidades de digitalización con mayor impacto.',
    duration:    '1-2 días',
    color:       '#2563EB',
  },
  {
    num:         '02',
    Icon:        FileText,
    title:       'Plan a medida',
    description: 'Diseñamos una hoja de ruta personalizada con las soluciones, tecnologías, tiempos y presupuesto adaptados a tu empresa.',
    duration:    '2-3 días',
    color:       '#06B6D4',
  },
  {
    num:         '03',
    Icon:        Code2,
    title:       'Desarrollo e implementación',
    description: 'Construimos las soluciones con revisiones periódicas. Tú ves el avance en tiempo real y das retroalimentación directa.',
    duration:    '2-8 semanas',
    color:       '#7C3AED',
  },
  {
    num:         '04',
    Icon:        Rocket,
    title:       'Lanzamiento y adopción',
    description: 'Desplegamos la solución, capacitamos a tu equipo y hacemos acompañamiento durante los primeros días para asegurar el éxito.',
    duration:    '1 semana',
    color:       '#10B981',
  },
  {
    num:         '05',
    Icon:        HeadphonesIcon,
    title:       'Soporte continuo',
    description: 'No desaparecemos después del lanzamiento. Ofrecemos planes de soporte, mantenimiento y evolución continua de tu solución.',
    duration:    'Mensual',
    color:       '#F59E0B',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section-padding bg-dm-dark relative overflow-hidden">

      {/* Orbe de luz */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
           style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />

      <div className="container-dm relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mb-4 inline-flex">
            <Rocket className="w-3.5 h-3.5 text-dm-cyan" />
            <span>El proceso</span>
          </div>
          <h2 className="section-title">
            <span className="text-white">Cómo </span>
            <span className="text-gradient">trabajamos</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Un proceso claro, transparente y orientado a resultados. Siempre sabes en qué etapa estás.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical — desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
               style={{ background: 'linear-gradient(to bottom, transparent, #2563EB, #06B6D4, #7C3AED, #10B981, #F59E0B, transparent)' }} />

          <div className="space-y-10">
            {steps.map(({ num, Icon, title, description, duration, color }, i) => (
              <div key={num}
                   className={`flex flex-col lg:flex-row items-center gap-6 ${
                     i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                   }`}>

                {/* Card */}
                <div className="w-full lg:w-5/12">
                  <div className="card-dm group" style={{ borderColor: `${color}30` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                           style={{ background: `${color}20` }}>
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono font-bold" style={{ color }}>{num}</span>
                          <span className="badge text-xs">{duration}</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                        <p className="text-dm-gray text-sm leading-relaxed">{description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nodo central — desktop */}
                <div className="hidden lg:flex w-2/12 justify-center">
                  <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-black text-sm z-10 bg-dm-dark"
                       style={{ borderColor: color, color, boxShadow: `0 0 20px ${color}40` }}>
                    {num}
                  </div>
                </div>

                {/* Espacio derecho */}
                <div className="hidden lg:block w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-dm-gray mb-5">¿Listo para comenzar tu transformación?</p>
          <a href="#contacto" className="btn-primary text-base px-8 py-3.5">
            Agenda tu diagnóstico gratuito →
          </a>
        </div>
      </div>
    </section>
  )
}
