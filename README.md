# Digital Mindz — Plataforma Web

> Transformación digital para MiPymes colombianas. Stack: Next.js 14 · TailwindCSS · Supabase · Claude AI Agents.

---

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.local.example .env.local
# → Edita .env.local con tus credenciales de Supabase y Anthropic

# 3. Ejecutar en desarrollo
npm run dev
# → Abre http://localhost:3000
```

---

## Estructura del proyecto

```
digital-mindz-app/
├── app/
│   ├── layout.tsx          # Layout root con metadata SEO
│   ├── page.tsx            # Página principal (landing)
│   ├── globals.css         # Estilos globales, variables, animaciones
│   └── api/                # API Routes (por implementar)
│       └── agents/         # Endpoints para agentes Claude
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Nav sticky con menú mobile
│   │   └── Footer.tsx      # Footer con links y contacto
│   ├── sections/           # 10 secciones de la landing
│   │   ├── Hero.tsx
│   │   ├── Problem.tsx
│   │   ├── Services.tsx
│   │   ├── ValueProposition.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Benefits.tsx
│   │   ├── ODS.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTA.tsx
│   ├── agents/             # Integraciones Claude AI
│   │   ├── SalesAgent.tsx  # Chatbot de ventas (placeholder)
│   │   └── README.md       # Guía para implementar agentes
│   └── ui/                 # Componentes UI reutilizables (por agregar)
├── lib/
│   └── supabase/
│       ├── client.ts       # Cliente Supabase (browser)
│       └── server.ts       # Cliente Supabase (server)
├── .env.local.example      # Variables de entorno requeridas
├── next.config.js          # Config Next.js + Security Headers
├── tailwind.config.ts      # Paleta de colores Digital Mindz
└── tsconfig.json
```

---

## Paleta de colores

| Token           | Hex       | Uso                          |
|-----------------|-----------|------------------------------|
| `dm-dark`       | `#0F172A` | Fondo principal              |
| `dm-dark-2`     | `#1E293B` | Fondo secciones alternas     |
| `dm-blue`       | `#2563EB` | Primario / CTAs              |
| `dm-cyan`       | `#06B6D4` | Acentos y gradientes         |
| `dm-white`      | `#F8FAFC` | Textos principales           |
| `dm-gray`       | `#94A3B8` | Textos secundarios           |

---

## Seguridad implementada

- ✅ HTTP Security Headers (X-Frame-Options, CSP, XSS Protection)
- ✅ Variables sensibles solo en servidor (ANTHROPIC_API_KEY nunca al cliente)
- ✅ Cliente Supabase separado para browser y server
- ✅ Validación de inputs en formularios
- 🔲 Rate limiting en API routes (pendiente)
- 🔲 Autenticación Supabase (para panel admin y soporte)
- 🔲 Row Level Security en tablas Supabase

---

## Próximas fases de desarrollo

### Fase 2 — Ecommerce de Servicios
- Catálogo de servicios con precios
- Carrito y selección de planes
- Checkout con Stripe / Wompi (Colombia)
- Panel de cliente con seguimiento de proyecto

### Fase 3 — Panel de Administración
- Dashboard de leads y clientes
- Gestión de proyectos
- CRM básico integrado

### Fase 4 — Agentes Claude (IA)
- Sales Agent completamente funcional
- Onboarding Agent automatizado
- Support Agent con RAG sobre documentación
- Report Agent para clientes activos

---

## Agentes Claude

Ver `components/agents/README.md` para instrucciones detalladas de implementación.

**Importante:** La `ANTHROPIC_API_KEY` solo debe usarse en API Routes del servidor. Nunca en componentes client-side.
"# Digital-Mindzz" 
