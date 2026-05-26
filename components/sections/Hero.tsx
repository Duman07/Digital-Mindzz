'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play, ChevronDown, Sparkles } from 'lucide-react'
import DemoModal from '@/components/sections/DemoModal'

// Partículas flotantes decorativas
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size:  Math.random() * 3 + 1,
  x:     Math.random() * 100,
  delay: Math.random() * 5,
  dur:   Math.random() * 5 + 5,
}))

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [demoOpen, setDemoOpen] = useState(false)

  // Efecto de partículas en canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * 0.3,
        vy:    (Math.random() - 0.5) * 0.3,
        r:     Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha})`
        ctx.fill()
      })

      // Líneas entre partículas cercanas
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg grid-pattern">

      {/* Canvas de partículas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden />

      {/* Orbes de luz de fondo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float"
           style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl animate-float"
           style={{ background: 'radial-gradient(circle, #06B6D4, transparent)', animationDelay: '3s' }} />

      {/* Contenido principal */}
      <div className="relative z-10 container-dm px-4 sm:px-6 lg:px-8 text-center pt-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 badge mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-dm-cyan" />
          <span>Transformación Digital para MiPymes 🇨🇴</span>
        </div>

        {/* Título principal */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-[1.05] animate-fade-up">
          <span className="text-white">Tu negocio,</span>
          <br />
          <span className="text-gradient">digitalizado</span>
          <br />
          <span className="text-white">y escalado.</span>
        </h1>

        {/* Descripción */}
        <p className="text-lg md:text-xl text-dm-gray max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-200">
          Ayudamos a micro, pequeñas y medianas empresas colombianas a transformar sus procesos con tecnología accesible, moderna y a su medida.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up delay-300">
          <a href="#contacto" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto justify-center">
            Empezar transformación
            <ArrowRight className="w-5 h-5" />
          </a>
          <button
            onClick={() => setDemoOpen(true)}
            className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto justify-center group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border border-dm-blue/50 group-hover:border-dm-cyan transition-colors">
              <Play className="w-3.5 h-3.5 text-dm-cyan ml-0.5" />
            </div>
            Ver demo
          </button>
        </div>

        {/* Stats rápidos */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-16 animate-fade-up delay-400">
          {[
            { value: '54%',   label: 'MiPymes sin presencia digital' },
            { value: '3x',    label: 'Mayor productividad' },
            { value: '100%',  label: 'Acompañamiento personalizado' },
          ].map(({ value, label }) => (
            <div key={value} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-gradient mb-1">{value}</div>
              <div className="text-xs text-dm-gray leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* Tecnologías */}
        <div className="flex items-center justify-center gap-2 flex-wrap animate-fade-up delay-500">
          <span className="text-xs text-dm-gray mr-1">Tecnologías:</span>
          {['Next.js', 'React', 'Supabase', 'TypeScript', 'TailwindCSS', 'IA'].map((tech) => (
            <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-mono bg-dm-dark-2 border border-white/10 text-dm-gray">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#problema"
         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-dm-gray hover:text-dm-cyan transition-colors animate-bounce-slow">
        <span className="text-xs font-medium tracking-widest uppercase">Descubrir</span>
        <ChevronDown className="w-5 h-5" />
      </a>

      {/* Modal de Demo */}
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  )
}
