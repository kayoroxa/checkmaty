'use server'

import { Prisma, Task } from '@prisma/client'
import prismadb from '../lib/prismadb'

export async function createTask(newData: Prisma.TaskUncheckedCreateInput) {
  return await prismadb.task.create({
    data: newData,
  })
}

export async function updateTask(taskId: Task['id'], newData: Partial<Task>) {
  prismadb.task.update({
    where: {
      id: taskId,
    },
    data: newData,
  })
}
export async function getTasksInTask(taskId: Task['id']) {
  const tasks = await prismadb.task.findMany({
    where: {
      project_id: taskId,
    },
  })
  return tasks
}
export async function deleteTask(taskId: Task['id']) {
  await prismadb.task.delete({
    where: {
      id: taskId,
    },
  })
}
