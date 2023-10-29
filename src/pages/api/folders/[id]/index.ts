import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query as { id: string }
    if (!id) return res.status(400).json({ error: 'Missing id' })

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
      // res.status(200).json(req.body)
      const data = await prisma.folder.update({
        where: {
          id,
        },
        data: {
          ...req.body,
        },
      })

      if (!data) return res.status(300).json({ error: 'Folder not found' })
      res.status(200).json(data)
    }

    if (req.method === 'DELETE') {
      const data = await prisma.folder.delete({
        where: {
          id,
        },
      })

      if (!data) return res.status(300).json({ error: 'Folder not found' })
      res.status(200).json(data)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export default handler
