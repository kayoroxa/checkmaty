import { useRouter } from 'next/router'
import ButtonOp from '../atoms/ButtonOp'
import SquareImg from '../atoms/SquareImg'
import { useTasks } from '../hooks/useTasks'
import { useTaskStore } from '../store/useTaskStore'
import { TaskCreate } from '../utils/types/_Task'

export default function Header() {
  const { createTask } = useTasks('359051936857588309')
  const { setTaskSelected } = useTaskStore()

  const { query, asPath } = useRouter()

  return (
    <header className="w-full px-8 py-2 dark:bg-slate-700  shadow-2xl flex justify-end items-center gap-3">
      <section className="mr-auto flex gap-4">
        <ButtonOp
          title="Add task"
          onClick={async () => {
            const data: TaskCreate = {
              title: 'New task',
              description: '',
              userId: '359051936857588309',
              inMainView: true,
              done: false,
            }

            if (typeof query.id === 'string' && asPath.includes('project')) {
              data.projectId = parseInt(query.id)
              data.inMainView = false
            }

            if (asPath.includes('inbox')) {
              data.inMainView = false
            }

            createTask(data)
          }}
        />
        {/* <ButtonOp title="Add Project" onClick={() => {}} /> */}
      </section>
      <div className="-mt-2">
        <h1 className="text-xl">Caio Rocha</h1>
        <p className="text-sm">@kayoroxa</p>
      </div>
      <SquareImg src="https://avatars.githubusercontent.com/u/54248474?v=4" />
    </header>
  )
}
