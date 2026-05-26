-- ============================================================
-- DIGITAL MINDZ — Datos iniciales (Seed)
-- Catálogo de 6 servicios con precios en COP
-- ============================================================

INSERT INTO public.services (slug, name, short_desc, description, icon, color, features, price_base, price_monthly, category, sort_order)
VALUES
(
  'desarrollo-web',
  'Desarrollo Web',
  'Sitios y plataformas profesionales',
  'Diseñamos y desarrollamos páginas web, tiendas en línea y aplicaciones web modernas, rápidas y seguras. Desde una landing page de alta conversión hasta un e-commerce completo.',
  'Globe',
  '#2563EB',
  ARRAY[
    'Landing page optimizada para conversión',
    'E-commerce con carrito y pagos',
    'Panel de administración incluido',
    'SEO técnico y on-page',
    'Diseño responsive mobile-first',
    'SSL y seguridad básica'
  ],
  2500000,
  350000,
  'development',
  1
),
(
  'automatizacion',
  'Automatización de Procesos',
  'Procesos que corren solos 24/7',
  'Eliminamos tareas repetitivas y manuales mediante flujos automatizados que ahorran tiempo, reducen errores y escalan con tu negocio sin aumentar personal.',
  'Zap',
  '#06B6D4',
  ARRAY[
    'Automatización de ventas y seguimiento',
    'Flujos de trabajo digitales',
    'Notificaciones y alertas inteligentes',
    'Reportes automáticos programados',
    'Integración con WhatsApp Business',
    'Dashboard de métricas en tiempo real'
  ],
  1800000,
  280000,
  'automation',
  2
),
(
  'integracion-sistemas',
  'Integración de Sistemas',
  'Todo conectado y sincronizado',
  'Conectamos tus herramientas existentes (facturación, inventarios, CRM, etc.) para que trabajen juntas sin fricciones y sin duplicar datos.',
  'Link2',
  '#7C3AED',
  ARRAY[
    'Integración vía APIs y webhooks',
    'Sincronización bidireccional de datos',
    'Migración de información histórica',
    'Conectores para ERP y CRM',
    'Conectores personalizados a medida',
    'Documentación técnica incluida'
  ],
  2000000,
  300000,
  'integration',
  3
),
(
  'transformacion-digital',
  'Transformación Digital',
  'De 0 a digital, paso a paso',
  'Acompañamos a tu empresa en el proceso completo de digitalización: desde el diagnóstico inicial hasta la implementación, capacitación y adopción tecnológica.',
  'Rocket',
  '#F59E0B',
  ARRAY[
    'Diagnóstico digital completo',
    'Hoja de ruta personalizada',
    'Implementación guiada y asistida',
    'Capacitación del equipo (hasta 10 personas)',
    'Seguimiento mensual por 3 meses',
    'Manual de operaciones digitales'
  ],
  3500000,
  450000,
  'consulting',
  4
),
(
  'consultoria-tecnologica',
  'Consultoría Tecnológica',
  'Decisiones técnicas con estrategia',
  'Asesoría experta para tomar las mejores decisiones tecnológicas para tu negocio, sin desperdiciar recursos en herramientas equivocadas.',
  'MessageSquare',
  '#10B981',
  ARRAY[
    'Análisis profundo de necesidades',
    'Selección de tecnologías óptimas',
    'Auditoría de procesos actuales',
    'Asesoría en seguridad digital',
    'Plan de inversión tecnológica',
    '4 sesiones de seguimiento incluidas'
  ],
  1200000,
  200000,
  'consulting',
  5
),
(
  'soluciones-cloud',
  'Soluciones Cloud',
  'Infraestructura escalable sin límites',
  'Migra tu negocio a la nube con soluciones escalables, seguras y de bajo costo. Siempre disponible, siempre respaldado, listo para crecer.',
  'Cloud',
  '#F97316',
  ARRAY[
    'Migración completa a la nube',
    'Almacenamiento seguro y encriptado',
    'Servidores escalables automáticamente',
    'Backups automáticos diarios',
    'Alta disponibilidad (99.9% uptime)',
    'Monitoreo 24/7 incluido'
  ],
  1500000,
  250000,
  'infrastructure',
  6
)
ON CONFLICT (slug) DO NOTHING;
