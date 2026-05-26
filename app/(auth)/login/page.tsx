'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Zap, LogIn, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirect     = searchParams.get('redirect') || '/dashboard'
  const supabase     = createClient()

  const [form,    setForm]    = useState({ email: '', password: '' })
  const [show,    setShow]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: err } = await supabase.auth.signInWithPassword({
      email:    form.email,
      password: form.password,
    })

    if (err) {
      setError(err.message === 'Invalid login credentials'
        ? 'Correo o contraseña incorrectos'
        : err.message)
      setLoading(false)
    } else {
      router.push(redirect)
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-4">

      {/* Orbes de luz */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full opacity-10 blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />

      <div className="w-full max-w-md relative z-10">

        {/* Volver */}
        <Link href="/" className="inline-flex items-center gap-2 text-dm-gray hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        {/* Card */}
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
            <h1 className="text-2xl font-bold text-white">Bienvenido de vuelta</h1>
            <p className="text-dm-gray text-sm mt-1">Accede a tu panel de cliente</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-dm-gray mb-1.5 block">Correo electrónico</label>
              <input
                name="email" type="email" value={form.email}
                onChange={handleChange} required autoComplete="email"
                placeholder="tu@empresa.com"
                className="w-full bg-dm-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/60 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-dm-gray">Contraseña</label>
                <a href="#" className="text-xs text-dm-blue hover:text-dm-cyan transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <input
                  name="password" type={show ? 'text' : 'password'} value={form.password}
                  onChange={handleChange} required autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-dm-dark border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/60 transition-colors"
                />
                <button type="button" onClick={() => setShow(!show)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dm-gray hover:text-white transition-colors p-1">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
                    className="btn-primary w-full justify-center py-3.5 disabled:opacity-70 disabled:cursor-not-allowed mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Ingresar
                </>
              )}
            </button>
          </form>

          {/* Registro */}
          <p className="text-center text-dm-gray text-sm mt-6">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-dm-blue hover:text-dm-cyan transition-colors font-semibold">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
