'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { Clock, DollarSign, BarChart3, Users2, CheckCircle2, Star } from 'lucide-react'

const metrics = [
  { value: 40, suffix: '%',  label: 'Reducción en tiempo de procesos administrativos', Icon: Clock,        color: '#2563EB' },
  { value: 30, suffix: '%',  label: 'Ahorro en costos operativos el primer año',        Icon: DollarSign,   color: '#10B981' },
  { value: 3,  suffix: 'x',  label: 'Mayor capacidad de atención a clientes',           Icon: Users2,       color: '#06B6D4' },
  { value: 95, suffix: '%',  label: 'De satisfacción en nuestros proyectos',            Icon: Star,         color: '#F59E0B' },
]

const benefits = [
  'Procesos automatizados que trabajan 24/7 sin tu intervención',
  'Visibilidad completa de tu negocio en tiempo real',
  'Reducción de errores humanos en gestión de datos',
  'Escalabilidad sin necesidad de contratar más personal',
  'Acceso a tu información desde cualquier dispositivo',
  'Mayor confianza y profesionalismo ante tus clientes',
  'Integración con herramientas que ya usas',
  'Soporte técnico cuando lo necesitas',
]

export default function Benefits() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="beneficios" className="section-padding bg-dm-dark-2 relative overflow-hidden">

      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
           style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />

      <div ref={ref} className="container-dm relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge mb-4 inline-flex">
            <BarChart3 className="w-3.5 h-3.5 text-dm-cyan" />
            <span>Resultados reales</span>
          </div>
          <h2 className="section-title">
            <span className="text-white">Los </span>
            <span className="text-gradient">beneficios</span>
            <span className="text-white"> que obtienes</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Números concretos que reflejan el impacto de la digitalización en empresas como la tuya.
          </p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {metrics.map(({ value, suffix, label, Icon, color }) => (
            <div key={value}
                 className="card-dm text-center group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                   style={{ background: `${color}20` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div className="text-3xl md:text-4xl font-black mb-2" style={{ color }}>
                {inView ? <CountUp end={value} duration={2.5} suffix={suffix} /> : `0${suffix}`}
              </div>
              <p className="text-dm-gray text-xs leading-relaxed">{label}</p>
            </div>
          ))}
        </div>

        {/* Lista de beneficios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

          {/* Lista */}
          <div className="glass rounded-2xl p-7 border border-dm-blue/20">
            <h3 className="text-white font-bold text-xl mb-5">Con Digital Mindz obtienes:</h3>
            <div className="space-y-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-dm-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-dm-gray text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="glass rounded-2xl p-7 border border-dm-blue/20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5"
                 style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }} />
            <div className="relative z-10">
              <div className="text-6xl font-black text-gradient mb-3">+ROI</div>
              <p className="text-dm-gray mb-6 text-sm">Las empresas que se digitalizan con nosotros recuperan su inversión en promedio en:</p>
              <div className="text-5xl font-black text-white mb-2">6 meses</div>
              <p className="text-dm-cyan text-sm font-semibold">y continúan creciendo 📈</p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { label: 'Antes', val: 'Procesos lentos',    bg: 'bg-red-500/10',  border: 'border-red-500/20', text: 'text-red-400' },
                  { label: 'Después', val: 'Eficiencia total', bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
                ].map(({ label, val, bg, border, text }) => (
                  <div key={label} className={`rounded-xl p-3 border ${bg} ${border}`}>
                    <div className={`text-xs font-bold mb-1 ${text}`}>{label}</div>
                    <div className="text-white text-sm font-semibold">{val}</div>
                  </div>
                ))}
              </div>

              <a href="#contacto" className="btn-primary mt-6 w-full justify-center text-sm">
                Quiero estos beneficios →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
