import { Folder } from './_Folder'

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

  folderId: number //(referência a pasta que criou a tarefa)
  folder?: Folder
}

export interface StepTaskCreate extends Omit<StepTask, 'id'> {
  id?: number
}
