import type { NextPage } from 'next'
import { useProjects } from '../hooks/useProjects'
import { useTasks } from '../hooks/useTasks'
import DashBoard from '../template/DashBoard'

const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: '359051936857588309' }),
}

const Home: NextPage = () => {
  const dataTasks = useTasks('359051936857588309', { inMainView: true })

  const { projects, isProjectsLoading } = useProjects('359051936857588309')

  return (
    <>
      <DashBoard
        data={dataTasks}
        projectsData={projects}
        isLoading={isProjectsLoading}
      />
    </>
  )
}

export default Home
