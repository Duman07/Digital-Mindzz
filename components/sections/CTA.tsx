'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, Send, Phone, Mail, MapPin } from 'lucide-react'

const benefits = [
  'Diagnóstico inicial gratuito',
  'Sin compromisos ni letras pequeñas',
  'Respuesta en menos de 24 horas',
  'Plan personalizado para tu empresa',
]

export default function CTA() {
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: Conectar con API route /api/contact que envía email via Supabase + notificación
    // Por ahora simulamos el envío
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
  }

  return (
    <section id="contacto" className="section-padding bg-dm-dark relative overflow-hidden">

      {/* Orbes */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-15 blur-3xl"
           style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
           style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />

      <div className="container-dm relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge mb-4 inline-flex">
            <Send className="w-3.5 h-3.5 text-dm-cyan" />
            <span>Hablemos</span>
          </div>
          <h2 className="section-title">
            <span className="text-gradient">Comencemos</span>
            <span className="text-white"> tu</span>
            <br />
            <span className="text-white">transformación digital</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Cuéntanos sobre tu negocio. El diagnóstico inicial es completamente gratuito.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {/* Info lateral */}
          <div className="space-y-6">
            {/* Beneficios de contactar */}
            <div className="glass rounded-2xl p-6 border border-dm-blue/20">
              <h3 className="text-white font-bold text-lg mb-4">Al contactarnos obtienes:</h3>
              <div className="space-y-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-dm-cyan flex-shrink-0" />
                    <span className="text-dm-gray text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Datos de contacto */}
            <div className="glass rounded-2xl p-6 border border-dm-blue/20 space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">Canales directos</h3>
              {[
                { Icon: Mail,    label: 'Email',    value: 'hola@digitalmindz.co',   href: 'mailto:hola@digitalmindz.co' },
                { Icon: Phone,   label: 'WhatsApp', value: '+57 300 000 0000',        href: 'https://wa.me/57300000000' },
                { Icon: MapPin,  label: 'Ubicación', value: 'Colombia',              href: '#' },
              ].map(({ Icon, label, value, href }) => (
                <a key={label} href={href}
                   className="flex items-center gap-3 text-dm-gray hover:text-dm-cyan transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-dm-blue/10 border border-dm-blue/20 flex items-center justify-center group-hover:border-dm-blue/40 transition-colors">
                    <Icon className="w-4 h-4 text-dm-blue" />
                  </div>
                  <div>
                    <div className="text-xs text-dm-gray/60">{label}</div>
                    <div className="text-sm text-dm-white">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div className="glass rounded-2xl p-7 border border-dm-blue/20">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">¡Mensaje enviado!</h3>
                <p className="text-dm-gray text-sm">Te contactaremos en menos de 24 horas. Revisa tu correo.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-dm-gray mb-1.5 block">Nombre *</label>
                    <input name="name" value={form.name} onChange={handleChange} required
                           placeholder="Tu nombre"
                           className="w-full bg-dm-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/60 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-dm-gray mb-1.5 block">Negocio *</label>
                    <input name="business" value={form.business} onChange={handleChange} required
                           placeholder="Nombre de tu empresa"
                           className="w-full bg-dm-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/60 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-dm-gray mb-1.5 block">Correo electrónico *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                         placeholder="tu@empresa.com"
                         className="w-full bg-dm-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/60 transition-colors" />
                </div>

                <div>
                  <label className="text-xs text-dm-gray mb-1.5 block">WhatsApp / Teléfono</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                         placeholder="+57 300 000 0000"
                         className="w-full bg-dm-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/60 transition-colors" />
                </div>

                <div>
                  <label className="text-xs text-dm-gray mb-1.5 block">¿Qué necesitas? *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
                            placeholder="Cuéntanos sobre tu negocio y qué procesos quieres digitalizar..."
                            className="w-full bg-dm-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/60 transition-colors resize-none" />
                </div>

                <button type="submit" disabled={status === 'sending'}
                        className="btn-primary w-full justify-center text-sm py-3.5 disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <>
                      Solicitar diagnóstico gratuito
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-xs text-dm-gray text-center">
                  Al enviar aceptas nuestra{' '}
                  <a href="#" className="text-dm-blue hover:text-dm-cyan transition-colors">política de privacidad</a>.
                  Sin spam, prometido.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
