export interface Task {
  id: string //(gerado automaticamente pelo FaunaDB)
  title: string
  description: string

  relevance?: number
  simplicity?: number
  urgency?: number

  done?: boolean

  dueDate?: string //timestamp
  createdAt?: string //timestamp
  updatedAt?: string //timestamp

  tags?: string[]

  userId?: string //(referência ao usuário que criou a tarefa)

  inMainView?: boolean
  parentId?: string | null
  projectId?: string | null //(referência ao projeto que criou a tarefa)
}
