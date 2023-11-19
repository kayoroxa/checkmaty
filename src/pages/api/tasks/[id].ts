import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query as { id: string }
    if (!id) return res.status(400).end()

    if (req.method === 'GET') {
      const data = await prisma.task.findUnique({
        where: {
          id: id,
        },
      })

      res.status(200).json(data)
    }
    if (req.method === 'PATCH') {
      //DateTime UTC format
      const data = await prisma.task.update({
        where: {
          id,
        },
        data: req.body,
      })
      if (!data) return res.status(300).json({ error: 'Task not found' })
      res.status(200).json(data)
    }
    if (req.method === 'DELETE') {
      const data = await prisma.task.delete({
        where: {
          id,
        },
      })

      res.status(200).json(data)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export default handler
