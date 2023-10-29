import { Folder, Task as _Task } from '@prisma/client'
// export interface Task_raw {
//   id: number //(gerado automaticamente pelo FaunaDB)
//   title: string
//   description: string

//   relevance?: number
//   simplicity?: number
//   urgency?: number

//   done?: boolean
//   doneDate?: Date

//   dueDate?: number //timestamp
//   createdAt?: Date //timestamp
//   updatedAt?: Date //timestamp

//   is_recurring?: boolean

//   tags?: string[]

//   user_id?: string //(referência ao usuário que criou a tarefa)

//   inMainView?: boolean
//   parentId?: number | null
//   project_id?: number | null //(referência ao projeto que criou a tarefa)
// }
// export type Task = Task_raw & Partial<StepTask>

export type Task = _Task & {
  folder?: Folder
}

export type TaskCreate = Omit<Task, 'id'>
