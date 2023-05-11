import { StepTask } from './_StepTask'
export interface Task_raw {
  id: number //(gerado automaticamente pelo FaunaDB)
  title: string
  description: string

  relevance?: number
  simplicity?: number
  urgency?: number

  done?: boolean
  doneDate?: number

  dueDate?: number //timestamp
  createdAt?: number //timestamp
  updatedAt?: number //timestamp

  tags?: string[]

  userId?: string //(referência ao usuário que criou a tarefa)

  inMainView?: boolean
  parentId?: number | null
  projectId?: number | null //(referência ao projeto que criou a tarefa)
}

export type Task = Task_raw & Partial<StepTask>

export interface TaskCreate extends Omit<Task, 'id'> {
  id?: number
}
