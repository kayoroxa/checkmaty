import Link from 'next/link'
import { useRouter } from 'next/router'
import DoneButton from '../atoms/DoneButton'
import { useTasks } from '../hooks/useTasks'
import { queryClient } from '../pages/_app'
import { axiosApi } from '../utils/axiosApi'
import { Project } from '../utils/types/_Project'
import { Task } from '../utils/types/_Task'

async function updateTodo(
  id: string,
  updatedTodo: Partial<Task>
): Promise<any> {
  const response = await axiosApi.patch(`/tasks/${id}`, updatedTodo)
  debugger
  return response.data
}

const TodoItem = ({
  todo,
  onToggle,
  onClick,
}: {
  todo: Task
  onToggle: any
  onClick?: () => void
}) => {
  const { updateTask } = useTasks('359051936857588309')
  const router = useRouter()
  const pathname = router.pathname

  const handleToggle = () => {
    onToggle(todo)
    updateTask({ id: todo.id, updatedTask: { done: !todo.done } })
  }

  const projects =
    (queryClient.getQueryState('projects')?.data as Project[]) || []

  const myProject = projects?.find(
    (project: any) => project.id === todo.projectId
  )

  return (
    <div
      className="flex items-start  hover:bg-blue-50 px-4 dark:hover:bg-slate-700  w-[400px] rounded-2xl dark:bg-slate-700/80 relative ml-6 hover:cursor-pointer"
      onClick={onClick}
    >
      <section className="h-full flex items-center">
        <DoneButton
          done={todo.done || false}
          onClick={event => {
            event.stopPropagation()
            handleToggle()
          }}
        />
      </section>

      <section className={`py-3 ${todo.done ? 'opacity-60' : 'opacity-100'}`}>
        <div
          className={`flex-1 text-2xl text-gray-900 dark:text-white ${
            todo.done ? 'line-through' : ''
          }`}
        >
          {todo.title}
        </div>
        <div className="flex gap-5">
          <div
            className={`text-lg font-thin flex-1 text-ellipsis text-gray-900 dark:text-white`}
          >
            {todo?.description || 'ㅤ'}
          </div>
          {myProject && !pathname.includes('project') && (
            <Link
              onClick={event => event.stopPropagation()}
              href={`/project/${myProject.id}`}
              className="text-lg text-yellow-400/70 hover:underline"
            >
              #{myProject?.name}
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default TodoItem
