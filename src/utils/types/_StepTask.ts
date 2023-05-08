export interface StepTask {
  id: number //(gerado automaticamente pelo FaunaDB)
  title: string
  description: string

  simplicity?: number

  done?: boolean

  dueDate?: string //timestamp
  createdAt?: string //timestamp
  updatedAt?: string //timestamp

  tags?: string[]

  folderId?: number | null //(referência a pasta que criou a tarefa)
}

export interface TaskCreate extends Omit<StepTask, 'id'> {
  id?: number
}
