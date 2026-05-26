import Link from 'next/link'
import { Zap, Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react'

const services = [
  'Desarrollo Web',
  'Automatización',
  'Integración de Sistemas',
  'Transformación Digital',
  'Consultoría Tecnológica',
  'Soluciones Cloud',
]

const company = [
  { label: 'Nosotros',       href: '#nosotros' },
  { label: 'Servicios',      href: '#servicios' },
  { label: 'Cómo funciona',  href: '#como-funciona' },
  { label: 'Impacto social', href: '#impacto' },
  { label: 'Testimonios',    href: '#testimonios' },
]

const socials = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Linkedin,  href: '#', label: 'LinkedIn' },
  { Icon: Facebook,  href: '#', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="bg-dm-dark border-t border-white/5 pt-16 pb-8">
      <div className="container-dm px-4 sm:px-6 lg:px-8">

        {/* Grid superior */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Marca */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Digital</span>
                <span className="text-gradient"> Mindz</span>
              </span>
            </Link>
            <p className="text-dm-gray text-sm leading-relaxed mb-5">
              Transformación digital para MiPymes colombianas. Tecnología accesible, innovadora y personalizada.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                   className="w-9 h-9 rounded-lg glass flex items-center justify-center text-dm-gray hover:text-dm-cyan hover:border-dm-blue/50 transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Servicios</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <a href="#servicios"
                     className="text-dm-gray hover:text-dm-cyan text-sm transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-dm-blue group-hover:bg-dm-cyan transition-colors" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Empresa</h3>
            <ul className="space-y-2">
              {company.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                     className="text-dm-gray hover:text-dm-cyan text-sm transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-dm-blue group-hover:bg-dm-cyan transition-colors" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-dm-gray text-sm">
                <Mail className="w-4 h-4 text-dm-blue mt-0.5 flex-shrink-0" />
                <a href="mailto:hola@digitalmindz.co" className="hover:text-dm-cyan transition-colors">
                  hola@digitalmindz.co
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-dm-gray text-sm">
                <Phone className="w-4 h-4 text-dm-blue mt-0.5 flex-shrink-0" />
                <a href="tel:+57300000000" className="hover:text-dm-cyan transition-colors">
                  +57 300 000 0000
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-dm-gray text-sm">
                <MapPin className="w-4 h-4 text-dm-blue mt-0.5 flex-shrink-0" />
                <span>Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider neón */}
        <div className="neon-divider mb-6" />

        {/* Pie */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-dm-gray text-xs">
          <p>© {new Date().getFullYear()} Digital Mindz. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-dm-cyan transition-colors">Política de privacidad</a>
            <a href="#" className="hover:text-dm-cyan transition-colors">Términos de uso</a>
          </div>
          <p className="flex items-center gap-1">
            Hecho con <span className="text-dm-blue">♥</span> en Colombia
          </p>
        </div>

      </div>
    </footer>
  )
}
