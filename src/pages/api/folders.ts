import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../lib/prismadb'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { user_id } = req.query

    if (typeof user_id !== 'string') {
      return res.status(400).json({ message: 'Invalid user_id' })
    }

    const folders = await prismadb.folder.findMany({
      where: {
        createdByUserId: user_id,
      },
    })

    res.status(201).json(folders)
  } else if (req.method === 'POST') {
    const newData = req.body
    const folder = await prismadb.folder.create({
      data: newData,
    })

    res.status(201).json(folder)
  }
}
