import type { NextPage } from 'next'
import { useQuery } from 'react-query'
import { useProjects } from '../hooks/useProjects'
import { useTasks } from '../hooks/useTasks'
import DashBoard from '../template/DashBoard'
import { axiosNextApi } from '../utils/axiosApi'
import { StepTask } from '../utils/types/_StepTask'
import { Task } from '../utils/types/_Task'

const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ user_id: '64de7201df61c3c518e7a83b' }),
}

const Home: NextPage = () => {
  const dataTasks = useTasks('64de7201df61c3c518e7a83b', { inMainView: true })
  const { data: stepTasks } = useQuery<StepTask[]>(['stepTasks'], async () => {
    const { data } = await axiosNextApi.get<StepTask[]>('/tasks?dashboard=true')
    return data
  })
  const { projects, isProjectsLoading } = useProjects(
    '64de7201df61c3c518e7a83b'
  )

  let tasks: Task[] = []

  if (stepTasks) tasks = [...tasks, ...stepTasks]
  if (dataTasks?.tasks) tasks = [...tasks, ...dataTasks?.tasks]

  return (
    <>
      <DashBoard
        data={{ ...dataTasks, tasks }}
        projectsData={projects}
        isLoading={isProjectsLoading}
      />
    </>
  )
}

export default Home
