import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.cookies.user = JSON.parse(req.cookies.user || '{}')
  res.status(200).json(req.cookies)
}
