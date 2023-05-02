import { MdAddTask } from 'react-icons/md'
import SquareImg from '../atoms/SquareImg'
import { useTasks } from '../hooks/useTasks'
import { queryClient } from '../pages/_app'
import { useTaskStore } from '../store/useTaskStore'
import { Task } from '../utils/types/_Task'

function ButtonOp({
  title,
  onClick,
}: {
  title?: string
  onClick?: () => void
}) {
  return (
    <button
      className="flex gap-3 group hover:cursor-pointer hover:dark:bg-slate-600/80 p-2"
      onClick={onClick}
    >
      <MdAddTask size={30} className="group-hover:fill-green-400" />
      <h1 className="text-xl group-hover:text-green-400">{title}</h1>
    </button>
  )
}

export default function Header() {
  const { createTask } = useTasks('359051936857588309')
  const { setTaskSelected } = useTaskStore()

  return (
    <header className="w-full px-8 py-2 dark:bg-slate-700  shadow-2xl flex justify-end items-center gap-3">
      <section className="mr-auto flex gap-4">
        <ButtonOp
          title="Add task"
          onClick={async () => {
            const tasks =
              (queryClient.getQueryState('tasks')?.data as Task[]) || []

            createTask({
              title: 'New task',
              description: '',
              userId: '359051936857588309',
              inMainView: true,
              done: false,
            })
          }}
        />
        <ButtonOp title="Add Project" onClick={() => {}} />
      </section>

      <div className="-mt-2">
        <h1 className="text-xl">Caio Rocha</h1>
        <p className="text-sm">@kayoroxa</p>
      </div>
      <SquareImg src="https://avatars.githubusercontent.com/u/54248474?v=4" />
    </header>
  )
}
