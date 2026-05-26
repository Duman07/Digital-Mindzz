import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Rutas que requieren autenticación
const PROTECTED_ROUTES = ['/dashboard', '/checkout']
// Rutas solo para no autenticados
const AUTH_ROUTES      = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request })

  // Si Supabase no está configurado aún (sin .env.local),
  // dejamos pasar todo sin verificar sesión
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey ||
      supabaseUrl.includes('tu-proyecto') || supabaseKey === 'tu-anon-key-aqui') {
    return supabaseResponse
  }

  let response = supabaseResponse

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  // Refrescar sesión (necesario para SSR)
  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // Redirigir a login si intenta acceder a ruta protegida sin sesión
  if (PROTECTED_ROUTES.some((r) => path.startsWith(r)) && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  // Redirigir al dashboard si ya está autenticado e intenta entrar a auth pages
  if (AUTH_ROUTES.some((r) => path.startsWith(r)) && user) {
    const dashUrl = request.nextUrl.clone()
    dashUrl.pathname = '/dashboard'
    return NextResponse.redirect(dashUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
