import { IncomingMessage } from 'http'

export default function extractUserFromReq(
  req: IncomingMessage & {
    cookies: Partial<Record<string, string>>
  },
) {
  let user = req.cookies.user
  if (!user) {
    const cookieSet = req.headers['set-cookie']?.[0]
      .split(',')
      .find((k) => k.startsWith('user'))
    const pair = cookieSet?.split(';')?.[0]
    user = pair?.split('=')?.[1]
  }
  return JSON.parse(decodeURIComponent(user || ''))
}
