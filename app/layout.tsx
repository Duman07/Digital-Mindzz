import type { Metadata, Viewport } from 'next'
import { CartProvider }  from '@/components/cart/CartContext'
import CartDrawer        from '@/components/cart/CartDrawer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default:  'Digital Mindz — Transformación Digital para MiPymes',
    template: '%s | Digital Mindz',
  },
  description:
    'Agencia de transformación digital para micro, pequeñas y medianas empresas colombianas. Desarrollo web, automatización, integración de sistemas y consultoría tecnológica.',
  keywords: [
    'transformación digital', 'MiPymes Colombia', 'desarrollo web', 'automatización',
    'agencia digital', 'consultoría tecnológica', 'digitalización empresas',
  ],
  authors:   [{ name: 'Digital Mindz', url: 'https://digitalmindz.co' }],
  creator:   'Digital Mindz',
  publisher: 'Digital Mindz',
  openGraph: {
    type:        'website',
    locale:      'es_CO',
    url:         'https://digitalmindz.co',
    title:       'Digital Mindz — Transformación Digital para MiPymes',
    description: 'Soluciones tecnológicas accesibles para digitalizar tu empresa.',
    siteName:    'Digital Mindz',
  },
  twitter: {
    card:  'summary_large_image',
    title: 'Digital Mindz — Transformación Digital para MiPymes',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  themeColor:   '#0F172A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-dm-dark text-dm-white antialiased">
        {/* CartProvider envuelve toda la app para acceso global al carrito */}
        <CartProvider>
          {children}
          {/* CartDrawer flota sobre todo el contenido */}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
