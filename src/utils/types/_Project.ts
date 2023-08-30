// export interface Project {
//   id: number
//   name: string
//   description: string

//   coverImg: string
//   imgUrl: string

//   percent?: number

//   createdAt: number
//   updatedAt: number
//   createdByUserId: string
//   accessUserIds: string[]
// }

import type { Prisma, Project as ProjectPrisma } from '@prisma/client'

export type Project = ProjectPrisma
export type ProjectCreate = Prisma.ProjectCreateInput

// export interface ProjectCreate extends Omit<Project, 'id'> {
//   id?: number
//   user_id: string
// }
