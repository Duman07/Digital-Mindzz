'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { AlertTriangle, TrendingDown, Clock, Users } from 'lucide-react'

const stats = [
  {
    value:  54,
    suffix: '%',
    label:  'de MiPymes operan en redes sociales sin estrategia digital real',
    Icon:   TrendingDown,
    color:  'text-red-400',
    bg:     'bg-red-500/10',
    border: 'border-red-500/20',
  },
  {
    value:  3700,
    suffix: '+',
    label:  'empresas evidencian bajo nivel de madurez digital según estudios',
    Icon:   Users,
    color:  'text-yellow-400',
    bg:     'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    value:  70,
    suffix: '%',
    label:  'de los procesos operativos siguen siendo 100% manuales',
    Icon:   Clock,
    color:  'text-orange-400',
    bg:     'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
]

const painPoints = [
  'Gestión de inventarios en hojas de cálculo o cuadernos',
  'Sin sistema de seguimiento de clientes (CRM)',
  'Procesos administrativos lentos y propensos a errores',
  'Dificultad para competir con empresas más digitalizadas',
  'Falta de visibilidad online y presencia web profesional',
  'Imposibilidad de escalar sin aumentar personal',
]

export default function Problem() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="problema" className="section-padding bg-dm-dark-2 relative overflow-hidden">

      {/* Decoración fondo */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
           style={{ background: 'radial-gradient(circle, #EF4444, transparent)' }} />

      <div ref={ref} className="container-dm relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mb-4 inline-flex">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
            <span>El problema real</span>
          </div>
          <h2 className="section-title">
            <span className="text-white">Las MiPymes están</span>
            <br />
            <span className="text-gradient">quedando atrás</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Mientras el mundo se digitaliza a gran velocidad, miles de negocios colombianos aún operan con procesos del siglo pasado.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map(({ value, suffix, label, Icon, color, bg, border }) => (
            <div key={value}
                 className={`card-dm text-center border ${border} ${bg}`}>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${bg}`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div className={`text-4xl font-black mb-2 ${color}`}>
                {inView ? <CountUp end={value} duration={2} suffix={suffix} /> : `0${suffix}`}
              </div>
              <p className="text-dm-gray text-sm leading-relaxed">{label}</p>
            </div>
          ))}
        </div>

        {/* Pain points */}
        <div className="glass rounded-2xl p-8 md:p-10 border border-white/5">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            ¿Te identificas con alguno de estos problemas?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {painPoints.map((point) => (
              <div key={point}
                   className="flex items-start gap-3 p-3 rounded-xl bg-dm-dark/50 border border-red-500/10">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                </div>
                <span className="text-dm-gray text-sm">{point}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-dm-cyan font-semibold mt-6 text-sm">
            Si marcaste al menos 2, Digital Mindz puede ayudarte 👇
          </p>
        </div>

        {/* Fuentes */}
        <p className="text-center text-dm-gray text-xs mt-6 opacity-60">
          Fuentes: Ministerio TIC Colombia · CCCE · Confecámaras · ACIS Colombia
        </p>
      </div>
    </section>
  )
}
