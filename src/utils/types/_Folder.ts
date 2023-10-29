import { Folder as _Folder } from '@prisma/client'

// export interface Folder {
//   id: number
//   title: string
//   description: string

//   relevance?: number
//   urgency?: number

//   createdAt?: Date
//   updatedAt?: Date
//   // createdByUserId: string //(referência ao usuário que criou a tarefa)
//   // accessUserIds: string[]

//   tasksInMainView?: boolean
//   project_id?: number | null //(referência ao projeto que criou a pasta)
// }

export type Folder = _Folder

export type FolderCreate = Omit<_Folder, 'id'>

// export interface FolderCreate extends Omit<_Folder, 'id'> {
//   createdByUserId: string
// }
