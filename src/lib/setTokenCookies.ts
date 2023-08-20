import { NextResponse } from 'next/server'

export default function setTokenCookies(
  response: NextResponse,
  token: Record<string, string>,
) {
  if (!token?.accessToken || !token?.refreshToken) return

  response.cookies.set('accessToken', token?.accessToken, {
    httpOnly: true,
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    path: '/',
    expires: new Date(token?.accessTokenExpiry),
  })
  response.cookies.set('accessTokenExpiry', token?.accessTokenExpiry, {
    httpOnly: true,
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    path: '/',
    expires: new Date(token?.accessTokenExpiry),
  })
  response.cookies.set('refreshToken', token?.refreshToken, {
    httpOnly: true,
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    expires: new Date(token?.refreshTokenExpiry),
    path: '/',
  })
  response.cookies.set('refreshTokenExpiry', token?.refreshTokenExpiry, {
    httpOnly: true,
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    expires: new Date(token?.refreshTokenExpiry),
    path: '/',
  })
}
