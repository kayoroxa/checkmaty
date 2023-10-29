import { endOfDay, startOfDay } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

async function getDashBoard() {
  const folders = await prisma.folder.findMany({
    where: {
      tasksInMainView: true,
    },
    include: {
      tasks: {
        where: {
          done: false, // Garantindo que a tarefa não está marcada como concluída
        },
        orderBy: {
          createdAt: 'asc',
        },
        take: 1, // Limita a busca a apenas 1 tarefa por pasta
      },
    },
  })

  const unfinishedTask = folders.map(rawFolder => {
    let { tasks, ...folder } = rawFolder
    return { ...tasks[0], folder }
  })

  const today = new Date() // Data de hoje
  const startOfToday = startOfDay(today) // Início do dia de hoje
  const endOfToday = endOfDay(today) // Fim do dia de hoje

  const completedTasks = await prisma.task.findMany({
    where: {
      done: true,
      doneDate: {
        gte: startOfToday,
        lte: endOfToday,
      },
      folder: {
        tasksInMainView: true, // Da pasta com tasksInMainView true
      },
    },
    include: {
      folder: true,
    },
  })

  return [...unfinishedTask, ...completedTasks]
}

async function getInMainView() {
  const tasks = await prisma.task.findMany({
    where: {
      inMainView: true,
    },
  })
  return tasks
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //user id from cookie
  // const cookieStore = cookies()
  // const userId = cookieStore.get('userId')
  try {
    if (req.method === 'GET') {
      const { dashboard, parentId, inMainView } = req.query
      if (dashboard) {
        const tasks = await getDashBoard()
        res.status(200).json(tasks)
      }
      if (parentId) {
        res.status(200).json([])
      }
      if (inMainView) {
        const tasks = await getInMainView()
        res.status(200).json(tasks)
      }
      const data = await prisma.task.findMany()
      res.status(200).json(data)
    }

    if (req.method === 'POST') {
      const data = await prisma.task.create({
        data: { ...req.body },
      })
      res.status(200).json(data)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export default handler
