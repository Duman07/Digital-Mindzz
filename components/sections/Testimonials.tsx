'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name:    'Carolina Martínez',
    role:    'Propietaria · Tienda de ropa',
    city:    'Bogotá',
    avatar:  'CM',
    color:   '#2563EB',
    stars:   5,
    text:    'Antes manejaba todo en cuadernos. Digital Mindz nos creó un sistema de inventario y ventas online que nos ahorra 3 horas diarias. Las ventas crecieron un 40% en 2 meses.',
  },
  {
    name:    'Andrés Pérez',
    role:    'Director · Restaurante familiar',
    city:    'Medellín',
    avatar:  'AP',
    color:   '#06B6D4',
    stars:   5,
    text:    'El sistema de pedidos online que nos implementaron cambió todo. Ahora procesamos el doble de pedidos con el mismo equipo. El proceso fue muy claro y el soporte es excelente.',
  },
  {
    name:    'Lucía Gómez',
    role:    'Gerente · Consultora contable',
    city:    'Cali',
    avatar:  'LG',
    color:   '#7C3AED',
    stars:   5,
    text:    'Necesitaba digitalizar mis procesos de gestión de clientes. El CRM que me diseñaron es simple pero poderoso. Ahora hago seguimiento de 150 clientes sin perder ningún detalle.',
  },
  {
    name:    'Roberto Silva',
    role:    'Dueño · Ferretería',
    city:    'Barranquilla',
    avatar:  'RS',
    color:   '#10B981',
    stars:   5,
    text:    'Dudé al principio porque pensé que era muy costoso. Pero el plan se adaptó a mi presupuesto y el retorno fue increíble. En 4 meses recuperé la inversión con creces.',
  },
]

const ratings = [
  { platform: 'Google',   score: 4.9, reviews: 48 },
  { platform: 'Facebook', score: 4.8, reviews: 32 },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const t = testimonials[idx]

  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <section id="testimonios" className="section-padding bg-dm-dark-2 relative overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-8 blur-3xl"
           style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />

      <div className="container-dm relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge mb-4 inline-flex">
            <Star className="w-3.5 h-3.5 text-yellow-400" />
            <span>Testimonios</span>
          </div>
          <h2 className="section-title">
            <span className="text-white">Lo que dicen</span>
            <br />
            <span className="text-gradient">nuestros clientes</span>
          </h2>
        </div>

        {/* Testimonial principal */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="glass rounded-2xl p-8 md:p-10 border border-dm-blue/20 relative">

            <Quote className="absolute top-6 right-6 w-10 h-10 text-dm-blue/20" />

            {/* Estrellas */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Texto */}
            <p className="text-dm-white text-lg md:text-xl leading-relaxed mb-8 italic">
              "{t.text}"
            </p>

            {/* Autor */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                   style={{ background: `linear-gradient(135deg, ${t.color}, #06B6D4)` }}>
                {t.avatar}
              </div>
              <div>
                <div className="text-white font-bold">{t.name}</div>
                <div className="text-dm-gray text-sm">{t.role} · {t.city}</div>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <div className="flex items-center justify-between mt-5">
            <button onClick={prev}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-dm-gray hover:text-white hover:border-dm-blue/40 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === idx ? 'bg-dm-blue w-6' : 'bg-dm-gray/40'
                        }`} />
              ))}
            </div>

            <button onClick={next}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-dm-gray hover:text-white hover:border-dm-blue/40 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ratings */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {ratings.map(({ platform, score, reviews }) => (
            <div key={platform} className="flex items-center gap-3 glass rounded-xl px-5 py-3 border border-white/5">
              <div>
                <div className="text-white font-bold text-sm">{platform}</div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(score) ? 'text-yellow-400 fill-yellow-400' : 'text-dm-gray'}`} />
                  ))}
                </div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-white">{score}</div>
                <div className="text-xs text-dm-gray">{reviews} reseñas</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
