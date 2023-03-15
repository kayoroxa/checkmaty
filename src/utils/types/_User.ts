export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  dailyScore: number
  lastScoreDate: string
  dailyGoal: number
}

//Update(Ref(Collection("users"), "123"), { data: { dailyScore: 5 } })
