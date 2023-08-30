// export interface Task_raw {
//   id: number //(gerado automaticamente pelo FaunaDB)
//   title: string
//   description: string

//   relevance?: number
//   simplicity?: number
//   urgency?: number

//   done?: boolean
//   doneDate?: number

//   dueDate?: number //timestamp
//   createdAt?: number //timestamp
//   updatedAt?: number //timestamp

//   is_recurring?: boolean

//   tags?: string[]

//   user_id?: string //(referência ao usuário que criou a tarefa)

//   inMainView?: boolean
//   parentId?: number | null
//   project_id?: number | null //(referência ao projeto que criou a tarefa)
// }

import type { Task as TaskPrisma } from '@prisma/client'

export type Task = TaskPrisma //Task_raw & Partial<StepTask>

export interface TaskCreate extends Omit<Task, 'id'> {
  id?: number
}
