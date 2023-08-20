import { IncomingMessage } from 'http'

export default function extractAccessTFromReq(
  req: IncomingMessage & {
    cookies: Partial<Record<string, string>>
  },
) {
  let token = req.cookies.accessToken
  if (!token) {
    const cookieSet = req.headers['set-cookie']?.[0]
      .split(',')
      .find((k) => k.startsWith('accessToken'))
    const pair = cookieSet?.split(';')?.[0]
    token = pair?.split('=')?.[1]
  }
  return token
}
