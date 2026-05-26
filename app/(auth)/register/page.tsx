'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Zap, UserPlus, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
  const router   = useRouter()
  const supabase = createClient()

  const [form,    setForm]    = useState({ full_name: '', business_name: '', email: '', password: '', confirm: '' })
  const [show,    setShow]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    setLoading(true)
    setError('')

    const { error: err } = await supabase.auth.signUp({
      email:    form.email,
      password: form.password,
      options:  {
        data: { full_name: form.full_name, business_name: form.business_name },
      },
    })

    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center px-4">
        <div className="glass-dark rounded-2xl p-10 border border-dm-blue/20 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">¡Cuenta creada!</h2>
          <p className="text-dm-gray text-sm mb-6">
            Revisa tu correo <span className="text-white font-semibold">{form.email}</span> y confirma tu cuenta para continuar.
          </p>
          <Link href="/login" className="btn-primary w-full justify-center">
            Ir al login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-4 py-12">

      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />

      <div className="w-full max-w-md relative z-10">

        <Link href="/" className="inline-flex items-center gap-2 text-dm-gray hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <div className="glass-dark rounded-2xl p-8 border border-dm-blue/20">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Digital</span>
                <span className="text-gradient"> Mindz</span>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">Crea tu cuenta</h1>
            <p className="text-dm-gray text-sm mt-1">Empieza tu transformación digital hoy</p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-dm-gray mb-1.5 block">Nombre completo *</label>
                <input name="full_name" value={form.full_name} onChange={handleChange} required
                       placeholder="Tu nombre"
                       className="w-full bg-dm-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/60 transition-colors" />
              </div>
              <div>
                <label className="text-xs text-dm-gray mb-1.5 block">Nombre del negocio</label>
                <input name="business_name" value={form.business_name} onChange={handleChange}
                       placeholder="Tu empresa"
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
              <label className="text-xs text-dm-gray mb-1.5 block">Contraseña *</label>
              <div className="relative">
                <input name="password" type={show ? 'text' : 'password'} value={form.password} onChange={handleChange} required
                       placeholder="Mínimo 8 caracteres"
                       className="w-full bg-dm-dark border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/60 transition-colors" />
                <button type="button" onClick={() => setShow(!show)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dm-gray hover:text-white p-1">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-dm-gray mb-1.5 block">Confirmar contraseña *</label>
              <input name="confirm" type="password" value={form.confirm} onChange={handleChange} required
                     placeholder="Repite tu contraseña"
                     className="w-full bg-dm-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/60 transition-colors" />
            </div>

            <button type="submit" disabled={loading}
                    className="btn-primary w-full justify-center py-3.5 disabled:opacity-70 disabled:cursor-not-allowed mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creando cuenta...
                </span>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Crear cuenta gratis
                </>
              )}
            </button>
          </form>

          <p className="text-center text-dm-gray text-xs mt-4">
            Al registrarte aceptas nuestra{' '}
            <a href="#" className="text-dm-blue hover:text-dm-cyan transition-colors">política de privacidad</a>
          </p>

          <p className="text-center text-dm-gray text-sm mt-4">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-dm-blue hover:text-dm-cyan transition-colors font-semibold">
              Ingresar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
