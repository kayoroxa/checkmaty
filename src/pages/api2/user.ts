import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { faunaClient } from '../../services/fauna'
// import { User } from '../../utils/types/_User'

interface User {
  id: string
  name: string
  email: string
}

interface CreateUserRequest {
  name: string
  email: string
}

interface CreateUserResponse {
  data: User
}

interface GetUsersResponse {
  data: User[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | User | { message: string }>
) {
  if (req.method === 'POST') {
    const { name, email } = req.body as CreateUserRequest

    try {
      const { data } = await faunaClient.query<CreateUserResponse>(
        q.Create(q.Collection('users'), {
          data: { name, email },
        })
      )

      res.status(201).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar o usuário' })
    }
  }

  if (req.method === 'GET') {
    const { email } = req.body as { email: string }

    try {
      const data = await faunaClient.query<GetUsersResponse>(
        q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email)))
      )

      res.status(200).json({ ...data.data, id: data.ref.id })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Erro ao buscar os usuários' })
    }
  }
}
