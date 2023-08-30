import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()

function getFromFolderId(folder_id: string) {
  return prisma.task.findMany({
    where: {
      folder_id: folder_id,
    },
    orderBy: [
      {
        order: 'asc',
      },
    ],
  })
}

function tasksInMainView() {
  return prisma.task.findMany({
    where: {
      inMainView: true,
    },
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { folder_id, user_id, inMainView } = req.query

    if (typeof user_id !== 'string') {
      return res.status(400).json({ message: 'Invalid user_id' })
    }

    if (typeof folder_id === 'string') {
      const tasks = await getFromFolderId(folder_id)

      res.status(201).json(tasks || [])
    } else if (inMainView === 'true') {
      const tasks = await tasksInMainView()

      res.status(201).json(tasks || [])
    } else {
      const tasks = await prisma.task.findMany({
        where: {
          createdByUserId: user_id,
        },
      })

      res.status(201).json(tasks || [])
    }
  }
}
