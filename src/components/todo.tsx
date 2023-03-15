import { useState } from 'react'
import { MdDone } from 'react-icons/md'

const TodoItem = ({ todo, onToggle }: { todo: any; onToggle: any }) => {
  const [done, setDone] = useState(false)

  const handleToggle = () => {
    setDone(!done)
    onToggle(todo)
  }

  return (
    <div className="flex items-center py-3 hover:bg-blue-50 px-4">
      <button
        onClick={() => handleToggle()}
        className={`w-4 h-4 rounded-full mr-4 ${
          done ? 'bg-gray-400' : 'border border-gray-400'
        } focus:outline-none focus:border-gray-600  transition-colors duration-200 flex items-center justify-center`}
      >
        {done && <MdDone size={10} color="white" />}
      </button>
      <div
        className={`flex-1 text-sm ${
          done ? 'line-through text-gray-500' : 'text-gray-900'
        }`}
      >
        {todo.text}
      </div>
    </div>
  )
}

export default TodoItem
