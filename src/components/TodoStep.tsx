import DoneButton from '../atoms/DoneButton'
import { useTasks } from '../hooks/useTasks'
import { useTaskStore } from '../store/useTaskStore'

import { FaBolt, FaBullseye, FaFire } from 'react-icons/fa'
import { StepTask } from '../utils/types/_StepTask'

const getOpacity = (point: number | undefined) => (point ? point / 10 : 0)

const TodoItem = ({ todo, onToggle }: { todo: StepTask; onToggle: any }) => {
  const { updateTask } = useTasks('64de7201df61c3c518e7a83b')

  const handleToggle = () => {
    onToggle(todo)
    updateTask({ id: todo.id, updatedTask: { done: !todo.done } })
  }

  const { setTaskSelected, addTaskSelectedHistoric } = useTaskStore()

  return (
    <div
      className="flex items-start  hover:bg-blue-50 px-4 dark:hover:bg-slate-700  min-w-[400px] rounded-2xl dark:bg-slate-700/80 relative ml-6 hover:cursor-pointer"
      onClick={() => {
        addTaskSelectedHistoric(todo)
        setTaskSelected(todo)
      }}
    >
      <section className="h-full my-auto flex items-center justify-center">
        <DoneButton
          done={todo.done || false}
          onClick={event => {
            event.stopPropagation()
            handleToggle()
          }}
        />
      </section>

      <section
        className={`py-3 overflow-hidden w-full  ${
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
        <div className="flex gap-5">
          {todo?.description && (
            <div
              className={`text-lg font-thin text-ellipsis whitespace-nowrap text-gray-900 dark:text-white`}
            >
              {todo?.description || ''}
            </div>
          )}
        </div>
        <footer className="flex  mt-2 justify-between w-full">
          <section className="flex gap-2">
            <div
              className="flex gap-2"
              style={{ opacity: getOpacity(todo.simplicity || 0) }}
            >
              <FaBolt size={20} className="fill-blue-400 -mr-2" />
              <p>{todo.simplicity === undefined ? 0 : todo.simplicity}</p>
            </div>
            <div
              className="flex gap-2"
              style={{ opacity: getOpacity(todo.folder?.relevance || 0) }}
            >
              <FaBullseye size={20} className="fill-yellow-400 -mr-1" />
              <p>
                {todo.folder?.relevance === undefined
                  ? 0
                  : todo.folder?.relevance}
              </p>
            </div>
            <div
              className="flex gap-2"
              style={{ opacity: getOpacity(todo.folder?.urgency || 0) }}
            >
              <FaFire size={20} className="fill-red-400 -mr-1" />
              <p>
                {todo.folder?.urgency === undefined ? 0 : todo.folder?.urgency}
              </p>
            </div>
          </section>
          <section></section>
        </footer>
      </section>
    </div>
  )
}

export default TodoItem
