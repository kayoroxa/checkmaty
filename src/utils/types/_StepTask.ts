import { Folder, Task as _Task } from '@prisma/client'

// export interface StepTask {
//   id: number //(gerado automaticamente pelo FaunaDB)
//   title: string
//   description: string

//   simplicity?: number

//   done?: boolean

//   dueDate?: number //timestamp
//   createdAt?: Date //timestamp
//   updatedAt?: Date //timestamp

//   tags?: string[]

//   folder_id: number //(referência a pasta que criou a tarefa)
//   folder?: Folder
// }

// export interface StepTaskCreate extends Omit<StepTask, 'id'> {
//   id?: number
// }

export type StepTask = _Task & {
  folder?: Folder
}

export type StepTaskCreate = Omit<StepTask, 'id'>
