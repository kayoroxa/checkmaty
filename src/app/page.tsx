import prismadb from '../lib/prismadb'
import DashBoard from '../template/DashBoard'

const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ user_id: '359051936857588309' }),
}

export default async function Home() {
  // const dataTasks = useTasks('359051936857588309', { inMainView: true })
  // const { data: stepTasks } = useQuery<StepTask[]>(['stepTasks'], async () => {
  //   const { data } = await axiosApi.get<StepTask[]>('/steptasks?dashboard=true')
  //   return data
  // })
  // const { projects, isProjectsLoading } = useProjects('359051936857588309')

  // let tasks: Task[] = []

  // if (stepTasks) tasks = [...tasks, ...stepTasks]
  // if (dataTasks?.tasks) tasks = [...tasks, ...dataTasks?.tasks]

  prismadb.task.findMany({
    where: {
      inMainView: true,
    },
  })

  const tasks = await prismadb.task.findFirst({
    where: {
      inMainView: true,
    },
  })

  const projects = [] as any

  return (
    <>
      {JSON.stringify(tasks)}
      <DashBoard data={{ tasks }} projectsData={projects} isLoading={false} />
    </>
  )
}
