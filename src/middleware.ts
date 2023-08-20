import getToken from '@/lib/getToken'
import getUser from '@/lib/getUser'
import setTokenCookies from '@/lib/setTokenCookies'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (request.nextUrl.pathname === '/auth') return response

  let user = await getUser(request.cookies.get('accessToken')?.value)
  if (!user?.email) {
    const token = await getToken(request)
    const currentUser = await getUser(token?.accessToken)
    user = currentUser
    setTokenCookies(response, token)
  }

  if (user)
    response.cookies.set('user', JSON.stringify(user), {
      path: '/',
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    })

  const { pathname } = request.nextUrl
  if (!(user?.email || user?.data?.email) && !pathname.startsWith('/auth'))
    return NextResponse.redirect(new URL('/auth', request.url))

  if ((user?.email || user?.data?.email) && pathname.startsWith('/auth'))
    return NextResponse.redirect(new URL('/', request.url))

  return response
}

export const config = {
  matcher: [
    '/auth/login',
    '/auth/signup',
    '/',
    '/edit-profile',
    '/profile/:path*',
  ],
}
