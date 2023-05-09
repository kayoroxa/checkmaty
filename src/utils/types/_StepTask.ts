export interface StepTask {
  id: number //(gerado automaticamente pelo FaunaDB)
  title: string
  description: string

  simplicity?: number

  done?: boolean

  dueDate?: number //timestamp
  createdAt?: number //timestamp
  updatedAt?: number //timestamp

  tags?: string[]

  folderId?: number | null //(referência a pasta que criou a tarefa)
}

export interface StepTaskCreate extends Omit<StepTask, 'id'> {
  id?: number
}
