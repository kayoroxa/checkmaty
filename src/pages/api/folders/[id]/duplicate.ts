import { Folder } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const { id } = req.query as { id: string }

    if (!id) return res.status(400).end()

    const elementoDuplicado = await duplicarElementoComRelacionamentos(id)

    res.status(200).json(elementoDuplicado)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

async function duplicarElementoComRelacionamentos(folderId: Folder['id']) {
  const folderOriginal = await prisma.folder.findUnique({
    where: { id: folderId },
    include: { tasks: true },
  })

  if (!folderOriginal) {
    throw new Error('Folder not found')
  }

  const folderDuplicada = await prisma.folder.create({
    data: {
      ...folderOriginal,
      id: undefined,
      title: `${folderOriginal.title}_copy`,
      tasks: {
        create: folderOriginal.tasks.map(task => ({
          ...task,
          folder_id: undefined,
          id: undefined,
          title: `${task.title}`,
        })),
      },
    },
  })

  return folderDuplicada
}

export default handler
