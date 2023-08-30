'use server'

import { Folder, Prisma, User } from '@prisma/client'
import prismadb from '../lib/prismadb'

export async function _createFolder(newData: Prisma.FolderCreateInput) {
  return await prismadb.folder.create({
    data: newData,
  })
}

export async function getFolder(id: Folder['id']) {
  const folder = await prismadb.folder.findUnique({
    where: {
      id,
    },
  })
  return folder
}

export async function _updateFolder(
  folderId: Folder['id'],
  newData: Partial<Folder>
) {
  prismadb.task.update({
    where: {
      id: folderId,
    },
    data: newData,
  })
}
export async function getAllTasksInFolder(folderId: Folder['id']) {
  const tasks = await prismadb.task.findMany({
    where: {
      project_id: folderId,
    },
  })
  return tasks
}

export async function getAllFolderByUserId(userId: User['id']) {
  const folders = await prismadb.folder.findMany({
    where: {
      createdByUserId: userId,
    },
  })
  return folders
}

export async function deleteFolder(folderId: Folder['id']) {
  return await prismadb.folder.delete({
    where: {
      id: folderId,
    },
  })
}
export async function _createTaskInFolder(
  folderId: Folder['id'],
  newTask: Prisma.TaskCreateInput
) {
  const user = await prismadb.user.findUnique({
    where: {
      email: 'kayoroxa@gmail.com',
    },
  })

  const response = await prismadb.task.create({
    data: {
      ...newTask,
      folder: {
        connect: {
          id: folderId,
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  })
  return response
}
