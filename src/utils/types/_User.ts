// export interface User {
//   id: string
//   name: string
//   email: string
//   createdAt: string
//   dailyScore: number
//   lastScoreDate: string
//   dailyGoal: number
//   userName: string
//   imgUrl: string
// }

import type { User as UserPrisma } from '@prisma/client'

export type User = UserPrisma

//Update(Ref(Collection("users"), "123"), { data: { dailyScore: 5 } })
