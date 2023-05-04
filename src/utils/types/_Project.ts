export interface Project {
  id: number
  name: string
  description: string

  coverImg: string
  imgUrl: string

  createdAt: string
  updatedAt: string
  createdByUserId: string
  accessUserIds: string[]
}
