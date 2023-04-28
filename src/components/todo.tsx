import { useState } from 'react'
import DoneButton from '../atoms/DoneButton'
import { Task } from '../utils/types/_Task'

const TodoItem = ({
  todo,
  onToggle,
  onClick,
  initialDone = false,
}: {
  todo: Task
  onToggle: any
  onClick?: () => void
  initialDone?: boolean
}) => {
  const [done, setDone] = useState(initialDone)

  const handleToggle = () => {
    setDone(!done)
    onToggle(todo)
  }

  return (
    <div
      className="flex items-start  hover:bg-blue-50 px-4 dark:hover:bg-slate-700  w-[400px] rounded-2xl dark:bg-slate-700/80 relative ml-6 hover:cursor-pointer"
      onClick={onClick}
    >
      <section className="h-full flex items-center">
        <DoneButton
          done={done}
          onClick={event => {
            event.stopPropagation()
            handleToggle()
          }}
        />
      </section>

      <section className="py-3">
        <div
          className={`flex-1 text-2xl ${
            done
              ? 'line-through text-gray-500 '
              : 'text-gray-900 dark:text-white'
          }`}
        >
          {todo.title}
        </div>
        <div
          className={`text-lg font-thin ${
            done ? ' text-gray-500 opacity-60' : 'text-gray-900 dark:text-white'
          }`}
        >
          {todo?.description || 'ㅤ'}
        </div>
      </section>
    </div>
  )
}

export default TodoItem
