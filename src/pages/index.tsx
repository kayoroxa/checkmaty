import type { NextPage } from 'next'
import { useProjects } from '../hooks/useProjects'
import { useTasks } from '../hooks/useTasks'
import DashBoard from '../template/DashBoard'

const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ user_id: '64de7201df61c3c518e7a83b' }),
}

const Home: NextPage = () => {
  const dataTasks = useTasks('64de7201df61c3c518e7a83b', { inMainView: true })
  // const { data: stepTasks } = useQuery<StepTask[]>(['stepTasks'], async () => {
  //   const { data } = await axiosApi.get<StepTask[]>('/steptasks?dashboard=true')
  //   return data
  // })
  const { projects, isProjectsLoading } = useProjects(
    '64de7201df61c3c518e7a83b'
  )

  return (
    <>
      <DashBoard
        data={{ ...dataTasks, tasks: dataTasks.tasks || [] }}
        projectsData={projects}
        isLoading={isProjectsLoading}
      />
    </>
  )
}

export default Home
