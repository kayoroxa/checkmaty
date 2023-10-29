import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //user id from cookie
  try {
    if (req.method === 'GET') {
      const data = await prisma.project.findMany()

      res.status(200).json(data)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export default handler
