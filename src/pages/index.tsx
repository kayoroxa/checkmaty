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
  // const todo = { id: 1, text: 'Buy milk' }
  // const { isLoading, error, data } = useQuery(['tasks'], () =>
  //   fetch('http://localhost:3000/api/tasks', options).then(res => res.json())
  // )

  // console.log(data)

  // const { data: todos, isLoading, error } = useQuery('todos', fetchTodos)
  const data = useTasks('359051936857588309', { inMainView: true })
  const { projects, isProjectsLoading } = useProjects('359051936857588309')

  return (
    <>
      <DashBoard
        data={data}
        projectsData={projects}
        isLoading={isProjectsLoading}
      />
    </>
  )
}

export default Home
