'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartContext'
import { Menu, X, Zap, ShoppingCart, User } from 'lucide-react'

const navLinks = [
  { label: 'Servicios',     href: '/#servicios' },
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Impacto',       href: '/#impacto' },
  { label: 'Testimonios',   href: '/#testimonios' },
  { label: 'Precios',       href: '/pricing' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const { cart, openDrawer } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-dark border-b border-dm-blue/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-dm flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-18">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Digital Mindz - Inicio">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}>
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">
            <span className="text-white">Digital</span>
            <span className="text-gradient"> Mindz</span>
          </span>
        </Link>

        {/* Nav links — desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-dm-gray hover:text-white hover:bg-white/5 transition-all duration-200">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Acciones — desktop */}
        <div className="hidden md:flex items-center gap-2">
          {/* Carrito */}
          <button onClick={openDrawer}
                  className="relative p-2 rounded-lg text-dm-gray hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Abrir carrito">
            <ShoppingCart className="w-5 h-5" />
            {cart.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)', minWidth: '18px', height: '18px' }}>
                {cart.itemCount}
              </span>
            )}
          </button>

          {/* Cuenta */}
          <Link href="/dashboard"
                className="p-2 rounded-lg text-dm-gray hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Mi cuenta">
            <User className="w-5 h-5" />
          </Link>

          <Link href="/#contacto" className="btn-secondary text-sm px-4 py-2">
            Contactar
          </Link>
          <Link href="/pricing" className="btn-primary text-sm px-4 py-2">
            Empezar
          </Link>
        </div>

        {/* Hamburger + carrito — mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={openDrawer}
                  className="relative p-2 rounded-lg text-dm-gray hover:text-white transition-colors"
                  aria-label="Carrito">
            <ShoppingCart className="w-5 h-5" />
            {cart.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] font-bold text-white rounded-full flex items-center justify-center"
                    style={{ background: '#2563EB', minWidth: '16px', height: '16px', padding: '0 3px' }}>
                {cart.itemCount}
              </span>
            )}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 rounded-lg text-dm-gray hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Menú">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glass-dark border-t border-dm-blue/20 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-dm-gray hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link href="/login" className="btn-secondary text-sm text-center" onClick={() => setMenuOpen(false)}>
              Mi cuenta
            </Link>
            <Link href="/pricing" className="btn-primary text-sm justify-center" onClick={() => setMenuOpen(false)}>
              Empezar ahora
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
