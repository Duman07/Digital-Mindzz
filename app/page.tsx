// ============================================================
// Digital Mindz — Página Principal (Landing Page)
// Stack: Next.js 14 · TailwindCSS · Supabase · Claude Agents
// ============================================================

import Navbar           from '@/components/layout/Navbar'
import Footer           from '@/components/layout/Footer'
import Hero             from '@/components/sections/Hero'
import Problem          from '@/components/sections/Problem'
import Services         from '@/components/sections/Services'
import ValueProposition from '@/components/sections/ValueProposition'
import HowItWorks       from '@/components/sections/HowItWorks'
import Benefits         from '@/components/sections/Benefits'
import ODS              from '@/components/sections/ODS'
import Testimonials     from '@/components/sections/Testimonials'
import CTA              from '@/components/sections/CTA'

// --- Agentes Claude (activar cuando se configure ANTHROPIC_API_KEY) ---
import SalesAgent from '@/components/agents/SalesAgent'
// import OnboardingAgent from '@/components/agents/OnboardingAgent'  // Próximamente
// import SupportAgent    from '@/components/agents/SupportAgent'      // Próximamente

export default function HomePage() {
  return (
    <>
      {/* Navegación fija */}
      <Navbar />

      <main>
        {/* 1. Hero — Propuesta de valor principal */}
        <Hero />

        {/* 2. Problema — Contexto y estadísticas */}
        <Problem />

        {/* 3. Servicios — Qué hacemos */}
        <Services />

        {/* 4. Propuesta de Valor — Por qué elegirnos */}
        <ValueProposition />

        {/* 5. Modelo de Trabajo — Cómo trabajamos */}
        <HowItWorks />

        {/* 6. Beneficios — Resultados tangibles */}
        <Benefits />

        {/* 7. ODS e Impacto Social */}
        <ODS />

        {/* 8. Testimonios */}
        <Testimonials />

        {/* 9. CTA Final — Formulario de contacto */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* === AGENTES CLAUDE (flotan sobre todo el contenido) === */}
      {/* Agente de Ventas: chatbot que califica leads */}
      <SalesAgent />

      {/*
        Para agregar más agentes, descomentar abajo y crear la API route correspondiente.
        Ver: components/agents/README.md para instrucciones de implementación.

        <OnboardingAgent />
        <SupportAgent />
      */}
    </>
  )
}
