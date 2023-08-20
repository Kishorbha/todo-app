import config from '@/config'
import { NextRequest } from 'next/server'

const MAX_RETRY = 3

export default async function getToken(req: NextRequest) {
  let retry = 0
  let data: Record<string, string> = {}

  while (!data?.accessToken && retry < MAX_RETRY) {
    data = await fetch(`${config.server_url}/users/refresh-token`, {
      headers: {
        Authorization: `Bearer ${req.cookies.get('refreshToken')?.value}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => err)

    retry += 1
  }
  return data
}
