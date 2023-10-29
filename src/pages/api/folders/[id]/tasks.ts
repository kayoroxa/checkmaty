import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query as { id: string }
    if (!id) return res.status(400).end()

    if (req.method === 'GET') {
      const data = await prisma.task.findMany({
        where: {
          folder: {
            id: id,
          },
        },
      })

      res.status(200).json(data)
    }

    if (req.method === 'POST') {
      const data = await prisma.task.create({
        data: {
          ...req.body,
          folder: {
            connect: {
              id: id,
            },
          },
        },
      })

      res.status(200).json(data)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export default handler
