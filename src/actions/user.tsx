'use server'

import { Prisma, User } from '@prisma/client'
import prismadb from '../lib/prismadb'

export async function createUser(newData: Prisma.UserUncheckedCreateInput) {
  return await prismadb.user.create({
    data: newData,
  })
}

export async function getUser(userId: User['id']) {
  console.log('procurando User..')
  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  })
  return user
}

export async function updateUser(userId: User['id'], newData: Partial<User>) {
  prismadb.task.update({
    where: {
      id: userId,
    },
    data: newData,
  })
}

export async function deleteUser(userId: User['id']) {
  await prismadb.user.delete({
    where: {
      id: userId,
    },
  })
}
