import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { faunaClient } from '../../services/fauna'
import { Task } from '../../utils/types/_Task'
// import { User } from '../../utils/types/_User'

interface CreateTaskRequest {
  name: string
  email: string
}

interface CreateTaskResponse {
  data: Task
}

interface GetTaskResponse {
  data: Task[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      await getTasks(req, res)
      break
    case 'POST':
      await createTask(req, res)
      break
    case 'PUT':
      await updateTask(req, res)
      break
    case 'DELETE':
      await deleteTask(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function getTasks(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response: any = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index('tasks_by_user_id'), req.body.userId)),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    )

    const tasks = response.data.map((task: any) => ({
      id: task.ref.id,
      ...task.data,
    }))

    res.status(200).json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

async function createTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bodyData = req.body
    const Task = await faunaClient.query(
      q.Create(q.Collection('tasks'), {
        data: bodyData,
      })
    )
    res.status(201).json({ data: Task })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

async function updateTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name } = req.body
    const Task = await faunaClient.query(
      q.Update(q.Ref(q.Collection('tasks'), id), {
        data: { name },
      })
    )
    res.status(200).json({ data: Task })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

async function deleteTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body
    await faunaClient.query(q.Delete(q.Ref(q.Collection('tasks'), id)))
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
