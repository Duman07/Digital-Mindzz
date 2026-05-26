'use client'

/**
 * ============================================================
 * AGENTE CLAUDE: Sales Assistant (Asistente de Ventas)
 * ============================================================
 *
 * PROPÓSITO:
 *   Chatbot inteligente que ayuda a los visitantes a entender
 *   qué servicio de Digital Mindz se adapta mejor a sus necesidades,
 *   califica leads y agenda reuniones de forma autónoma.
 *
 * INTEGRACIÓN:
 *   - API: POST /api/agents/sales
 *   - Modelo: claude-opus-4-6 (para razonamiento complejo)
 *   - Herramientas disponibles:
 *       · get_services()          → lista de servicios y precios
 *       · qualify_lead(data)      → calificación de prospecto
 *       · schedule_meeting(time)  → integración con calendario
 *       · save_to_supabase(lead)  → guarda el lead en DB
 *
 * ACTIVACIÓN:
 *   1. Descomenta el import en app/page.tsx
 *   2. Crea la API route: app/api/agents/sales/route.ts
 *   3. Configura ANTHROPIC_API_KEY en .env.local
 *   4. Implementa las herramientas en lib/agents/sales-tools.ts
 *
 * EJEMPLO DE PROMPT SISTEMA:
 *   "Eres el asistente virtual de Digital Mindz, una agencia de
 *    transformación digital para MiPymes colombianas. Tu objetivo
 *    es entender la situación del negocio del visitante y recomendar
 *    el servicio más adecuado. Siempre habla en español, sé amigable
 *    y profesional. Cuando detectes un lead calificado, usa la
 *    herramienta schedule_meeting."
 * ============================================================
 */

import { useState } from 'react'
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Respuestas de placeholder mientras se integra el agente real
const PLACEHOLDER_RESPONSES = [
  '¡Hola! Soy el asistente de Digital Mindz 🤖. Estoy en configuración. Pronto podré ayudarte a encontrar la mejor solución para tu negocio.',
  '¿Cuéntame sobre tu empresa? Por ahora estoy en modo demo, pero muy pronto seré totalmente funcional con IA.',
]

export default function SalesAgent() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! 👋 Soy el asistente de Digital Mindz. ¿En qué puedo ayudarte hoy? Cuéntame sobre tu negocio.' },
  ])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: userMsg }])
    setLoading(true)

    // TODO: Reemplazar con llamada real a /api/agents/sales
    // const res = await fetch('/api/agents/sales', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMsg }] }),
    // })
    // const data = await res.json()
    // setMessages((m) => [...m, { role: 'assistant', content: data.response }])

    await new Promise((r) => setTimeout(r, 1000))
    const reply = PLACEHOLDER_RESPONSES[Math.floor(Math.random() * PLACEHOLDER_RESPONSES.length)]
    setMessages((m) => [...m, { role: 'assistant', content: reply }])
    setLoading(false)
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full btn-primary shadow-glow-blue flex items-center justify-center animate-glow-pulse"
        aria-label="Abrir asistente"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Panel de chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-dark rounded-2xl border border-dm-blue/30 shadow-glow-blue flex flex-col overflow-hidden"
             style={{ maxHeight: '480px' }}>

          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10"
               style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(6,182,212,0.1))' }}>
            <div className="w-9 h-9 rounded-full bg-dm-blue/20 border border-dm-blue/40 flex items-center justify-center">
              <Bot className="w-5 h-5 text-dm-cyan" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm flex items-center gap-1.5">
                Asistente Digital Mindz
                <Sparkles className="w-3.5 h-3.5 text-dm-cyan" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-dm-gray">En línea</span>
              </div>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-dm-blue text-white'
                    : 'bg-dm-dark border border-white/10 text-dm-white'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-dm-dark border border-white/10 rounded-xl px-3.5 py-2.5">
                  <div className="flex gap-1">
                    {[0,1,2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-dm-blue animate-bounce"
                           style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-dm-dark border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-dm-gray/50 focus:outline-none focus:border-dm-blue/50 transition-colors"
              />
              <button onClick={send} disabled={loading || !input.trim()}
                      className="w-10 h-10 rounded-xl bg-dm-blue flex items-center justify-center text-white disabled:opacity-50 hover:bg-dm-blue-light transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
