import Link from 'next/link'
import { useRouter } from 'next/router'
import DoneButton from '../atoms/DoneButton'
import { useTasks } from '../hooks/useTasks'
import { queryClient } from '../pages/_app'
import { useTaskStore } from '../store/useTaskStore'
import { axiosApi } from '../utils/axiosApi'
import { Project } from '../utils/types/_Project'
import { Task } from '../utils/types/_Task'

import Group from '../atoms/Group'
import { FaBolt, FaBullseye, FaFire, FaWindowClose } from 'react-icons/fa'

async function updateTodo(
  id: number,
  updatedTodo: Partial<Task>
): Promise<any> {
  const response = await axiosApi.patch(`/tasks/${id}`, updatedTodo)
  return response.data
}

const TodoItem = ({ todo, onToggle }: { todo: Task; onToggle: any }) => {
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

  const { setTaskSelected, addTaskSelectedHistoric } = useTaskStore()

  return (
    <div
      className="flex items-start  hover:bg-blue-50 px-4 dark:hover:bg-slate-700  w-[400px] rounded-2xl dark:bg-slate-700/80 relative ml-6 hover:cursor-pointer"
      onClick={() => {
        addTaskSelectedHistoric(todo)
        setTaskSelected(todo)
      }}
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

      <section
        className={`py-3 overflow-hidden  ${
          todo.done ? 'opacity-60' : 'opacity-100'
        } flex flex-col h-full`}
      >
        <div
          className={`flex-1 text-2xl text-gray-900 dark:text-white ${
            todo.done ? 'line-through' : ''
          }`}
        >
          {todo.title}
        </div>
        <div className="flex gap-5 ">
          <div
            className={`text-lg font-thin flex-1 text-ellipsis whitespace-nowrap text-gray-900 dark:text-white`}
          >
            {todo?.description || ''}
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
        <section className="flex gap-2 pt-2  ">
          <div className="flex gap-2">
            <FaBolt size={20} className="fill-blue-400 -mr-2" />
            <p>{todo.simplicity === undefined ? 0 : todo.simplicity}</p>
          </div>
          <div className="flex gap-2">
            <FaBullseye size={20} className="fill-yellow-400 -mr-1" />
            <p>{todo.relevance === undefined ? 0 : todo.relevance}</p>
          </div>
          <div className="flex gap-2">
            <FaFire size={20} className="fill-red-400 -mr-1 " />
            <p>{todo.urgency === undefined ? 0 : todo.urgency}</p>
          </div>
        </section>
      </section>
    </div>
  )
}

export default TodoItem
