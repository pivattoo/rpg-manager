// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case "GET": {
      try {
        return res.status(200).json({ message: 'sucess' })
      } catch (e) {
        return res.status(400).json({error: e})
      }
    }
  }
}
