import type { NextPage } from 'next'
import { useQuery } from 'react-query'
import { useProjects } from '../hooks/useProjects'
import { useTasks } from '../hooks/useTasks'
import DashBoard from '../template/DashBoard'
import { axiosApi } from '../utils/axiosApi'
import { StepTask } from '../utils/types/_StepTask'
import { Task } from '../utils/types/_Task'

const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: '359051936857588309' }),
}

const Home: NextPage = () => {
  const dataTasks = useTasks('359051936857588309', { inMainView: true })
  const { data: stepTasks } = useQuery<StepTask[]>(['stepTasks'], async () => {
    const { data } = await axiosApi.get<StepTask[]>('/steptasks?dashboard=true')
    return data
  })
  const { projects, isProjectsLoading } = useProjects('359051936857588309')

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
