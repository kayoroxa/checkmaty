import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../../lib/prismadb'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid id' })
  }

  if (req.method === 'GET') {
    const task = await prismadb.task.findMany({
      where: {
        id: id,
      },
    })

    res.status(201).json(task)
  } else if (req.method === 'PATCH') {
    const newData = req.body

    const task = await prismadb.task.update({
      where: {
        id: id,
      },
      data: newData,
    })

    res.status(201).json(task)
  } else if (req.method === 'DELETE') {
    const task = await prismadb.task.delete({
      where: {
        id: id,
      },
    })

    res.status(201).json(task)
  }
}
