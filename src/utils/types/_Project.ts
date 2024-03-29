export interface Project {
  id: number
  name: string
  description: string

  coverImg: string
  imgUrl: string

  percent?: number

  createdAt: Date
  updatedAt?: Date
  createdByUserId: string
  accessUserIds: string[]
}

export interface ProjectCreate extends Omit<Project, 'id'> {
  id?: number
  user_id: string
}
