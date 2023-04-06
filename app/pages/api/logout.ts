// ** next
import { NextApiResponse, NextApiRequest } from 'next'

// ** utils
import Cookie from '@/utils/Cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== 'POST') return res.status(404).end()
  const { removeCookie } = Cookie(req, res)
  removeCookie('auth')
  res.status(200).end()
}
