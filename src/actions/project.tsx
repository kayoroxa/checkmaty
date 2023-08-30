'use server'

import { Prisma, Project, User } from '@prisma/client'
import prismadb from '../lib/prismadb'

export async function _createProject(newData: Prisma.ProjectCreateInput) {
  return await prismadb.project.create({
    data: newData,
  })
}

export async function _updateProject(
  projectId: Project['id'],
  newData: Partial<Project>
) {
  prismadb.project.update({
    where: {
      id: projectId,
    },
    data: newData,
  })
}

export async function getProject(projectId: Project['id']) {
  const project = await prismadb.project.findUnique({
    where: {
      id: projectId,
    },
  })
  return project
}

export async function getAllTasksProjects(projectId: Project['id']) {
  const projects = await prismadb.task.findMany({
    where: {
      project_id: projectId,
    },
  })
  return projects
}

export async function _getAllProjectsByUseId(useId: User['id']) {
  const projects = await prismadb.project.findMany({
    where: {
      createdByUserId: useId,
    },
  })
  return projects
}
export async function _deleteProject(projectId: Project['id']) {
  await prismadb.project.delete({
    where: {
      id: projectId,
    },
  })
}
