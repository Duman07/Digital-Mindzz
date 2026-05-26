# Agentes Claude — Digital Mindz

Este directorio contiene los componentes de integración con la API de Claude (Anthropic) para funcionalidades de IA en la plataforma.

---

## Agentes planificados

### 1. `SalesAgent.tsx` ✅ (placeholder listo)
**Propósito:** Chatbot flotante de ventas y calificación de leads.
- Entiende la situación del negocio del visitante
- Recomienda servicios adecuados
- Califica leads automáticamente
- Agenda reuniones de diagnóstico

**API Route a crear:** `app/api/agents/sales/route.ts`
**Modelo sugerido:** `claude-opus-4-6`

---

### 2. `OnboardingAgent.tsx` 🔲 (por implementar)
**Propósito:** Guía al nuevo cliente durante el proceso de diagnóstico inicial.
- Recopila información del negocio de forma conversacional
- Genera el reporte de diagnóstico automáticamente
- Identifica prioridades de digitalización

**API Route a crear:** `app/api/agents/onboarding/route.ts`
**Modelo sugerido:** `claude-sonnet-4-6`

---

### 3. `SupportAgent.tsx` 🔲 (por implementar)
**Propósito:** Soporte técnico post-venta para clientes activos.
- Responde preguntas sobre el uso de sus soluciones
- Escala tickets complejos al equipo humano
- Acceso a documentación del proyecto via RAG

**API Route a crear:** `app/api/agents/support/route.ts`
**Modelo sugerido:** `claude-haiku-4-5-20251001` (para velocidad y costo)

---

### 4. `ReportAgent.tsx` 🔲 (por implementar)
**Propósito:** Generación automática de reportes de progreso para clientes.
- Analiza métricas del proyecto en Supabase
- Genera resúmenes ejecutivos en lenguaje natural
- Envía reportes periódicos por email

**API Route a crear:** `app/api/agents/reports/route.ts`
**Modelo sugerido:** `claude-sonnet-4-6`

---

## Cómo implementar un agente

```typescript
// app/api/agents/[agentName]/route.ts
import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Solo en el servidor
})

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    system: `Eres el asistente de Digital Mindz...`,
    messages,
    // tools: [...] // Añadir herramientas según el agente
  })

  return NextResponse.json({
    response: response.content[0].type === 'text' ? response.content[0].text : '',
  })
}
```

## Seguridad

- La `ANTHROPIC_API_KEY` **nunca** se expone al cliente. Solo se usa en API routes (servidor).
- Rate limiting: implementar en middleware para evitar abuso.
- Validación de input: sanitizar mensajes antes de enviarlos a la API.
- Autenticación: los agentes de soporte requieren sesión activa de Supabase.
