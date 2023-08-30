// import { Folder } from './_Folder'

// export interface StepTask {
//   id: number //(gerado automaticamente pelo FaunaDB)
//   title: string
//   description: string

//   simplicity?: number

//   done?: boolean

//   dueDate?: number //timestamp
//   createdAt?: number //timestamp
//   updatedAt?: number //timestamp

//   tags?: string[]

//   folder_id: number //(referência a pasta que criou a tarefa)
//   folder?: Folder
// }

import type { Task as TaskPrisma } from '@prisma/client'

export type StepTask = TaskPrisma

export interface StepTaskCreate extends Omit<StepTask, 'id'> {
  id?: number
}
