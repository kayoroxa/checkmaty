import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { faunaClient } from '../../services/fauna'
import { Project } from '../../utils/types/_Project'
// import { User } from '../../utils/types/_User'

interface CreateProjectRequest {
  name: string
  email: string
}

interface CreateProjectResponse {
  data: Project
}

interface GetProjectResponse {
  data: Project[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      await getProjects(req, res)
      break
    case 'POST':
      await createProject(req, res)
      break
    case 'PUT':
      await updateProject(req, res)
      break
    case 'DELETE':
      await deleteProject(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function getProjects(req: NextApiRequest, res: NextApiResponse) {
  try {
    const projects = await faunaClient.query(
      q.Paginate(q.Match(q.Index('projects_by_user_id'), req.query.userId))
    )
    res.status(200).json({ data: projects })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

async function createProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, userId } = req.body
    const project = await faunaClient.query(
      q.Create(q.Collection('projects'), {
        data: { name, userId },
      })
    )
    res.status(201).json({ data: project })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

async function updateProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name } = req.body
    const project = await faunaClient.query(
      q.Update(q.Ref(q.Collection('projects'), id), {
        data: { name },
      })
    )
    res.status(200).json({ data: project })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

async function deleteProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body
    await faunaClient.query(q.Delete(q.Ref(q.Collection('projects'), id)))
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}