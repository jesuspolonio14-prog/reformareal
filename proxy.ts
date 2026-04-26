import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Escribir en la request para que el servidor los vea
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // Recrear la respuesta con los nuevos valores de cookie
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, {
              ...options,
              // Sesión persistente: 7 días
              maxAge: 60 * 60 * 24 * 7,
              sameSite: 'lax',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            })
          )
        },
      },
    }
  )

  // Esto refresca el token automáticamente si está a punto de expirar
  const { data: { user } } = await supabase.auth.getUser()

  // Proteger /panel
  if (!user && request.nextUrl.pathname.startsWith('/panel')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si ya autenticado va a /login o /registro, redirigir al panel
  if (user && (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/registro'
  )) {
    return NextResponse.redirect(new URL('/panel', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo-rr.svg).*)'],
}
