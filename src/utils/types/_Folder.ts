export interface Folder {
  id: number
  title: string
  description: string

  relevance?: number
  urgency?: number

  createdAt?: number
  updatedAt?: number
  // createdByUserId: string //(referência ao usuário que criou a tarefa)
  // accessUserIds: string[]

  tasksInMainView?: boolean
  project_id?: number | null //(referência ao projeto que criou a pasta)
}

export interface FolderCreate extends Omit<Folder, 'id'> {
  id?: number
  user_id: string
}
