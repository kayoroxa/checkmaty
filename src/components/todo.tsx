import { useState } from 'react'
import { MdDone } from 'react-icons/md'

const TodoItem = ({ todo, onToggle }: { todo: any; onToggle: any }) => {
  const [done, setDone] = useState(false)

  const handleToggle = () => {
    setDone(!done)
    onToggle(todo)
  }

  return (
    <div className="flex items-start  hover:bg-blue-50 px-4 dark:hover:bg-slate-700/80  w-[400px] rounded-2xl dark:bg-slate-700/50 relative ml-6">
      <section
        className="h-full flex items-center"
        onClick={() => handleToggle()}
      >
        <button
          className={`-ml-[34px] w-[40px] h-[40px]  rounded-full mr-4 mt-0 ${
            done
              ? 'bg-gray-400'
              : 'border-2 border-gray-400 dark:bg-slate-700/80'
          } focus:outline-none focus:border-gray-600  transition-colors duration-200 flex items-center justify-center`}
        >
          {done && <MdDone size={13} color="white" />}
        </button>
      </section>

      <section className="py-3">
        <div
          className={`flex-1 text-2xl ${
            done
              ? 'line-through text-gray-500 '
              : 'text-gray-900 dark:text-white'
          }`}
        >
          {todo.text}
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
