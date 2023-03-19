import React from 'react'
import DoneButton from '../atoms/DoneButton'
import TodoItem from '../components/todo'
import { Task } from '../utils/types/_Task'
import WrapperTaskModal from './WrapperTaskModal'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
  task: Task
  subtasks: Task[]
}

// Modal.setAppElement('#root')

function TaskModal({ task, subtasks, ...wrapperProps }: Props) {
  // const [isOpen, setIsOpen] = useState(initialIsOpen)

  return (
    <WrapperTaskModal {...wrapperProps}>
      <header className="flex items-center justify-start ml-6 gap-2">
        <section>
          <DoneButton done={false} />
        </section>
        <section className="w-full">
          <h2
            className="text-3xl font-medium mb-4 w-full break-all"
            contentEditable={true}
          >
            {task.title}
          </h2>
          <h3 className="text-lg mb-4  w-full" contentEditable={true}>
            {task.description}
          </h3>
        </section>
      </header>
      {subtasks && (
        <div className="border-t border-gray-200 mt-4 pt-4">
          <h3 className="text-2xl font-medium mb-2">Subtasks:</h3>
          <ul className="list-disc pl-4 flex flex-col gap-4 ">
            {subtasks.map((subtask, i) => (
              <React.Fragment key={i}>
                <TodoItem
                  key={subtask.id || i}
                  todo={subtask}
                  onToggle={() => {}}
                />
                <TodoItem
                  key={subtask.id || i}
                  todo={subtask}
                  onToggle={() => {}}
                />
                <TodoItem
                  key={subtask.id || i}
                  todo={subtask}
                  onToggle={() => {}}
                />
                <TodoItem
                  key={subtask.id || i}
                  todo={subtask}
                  onToggle={() => {}}
                />
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </WrapperTaskModal>
  )
}

export default TaskModal
