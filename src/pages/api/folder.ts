import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../lib/prismadb'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query

    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid id' })
    }

    const folder = await prismadb.folder.findMany({
      where: {
        id: id,
      },
    })

    res.status(201).json(folder)
  } else if (req.method === 'PATCH') {
    const { id } = req.query

    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid id' })
    }

    const newData = req.body

    const folder = await prismadb.folder.update({
      where: {
        id: id,
      },
      data: newData,
    })

    res.status(201).json({ folder })
  } else if (req.method === 'DELETE') {
    const { id } = req.query

    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid id' })
    }

    const folder = await prismadb.folder.delete({
      where: {
        id: id,
      },
    })

    res.status(201).json({ folder })
  }
}
