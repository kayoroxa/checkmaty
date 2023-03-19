import React from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { FaWindowClose } from 'react-icons/fa'
import { RiNumbersFill } from 'react-icons/ri'
import Modal from 'react-modal'
import DoneButton from '../atoms/DoneButton'
import Group from '../atoms/Group'
import TodoItem from '../components/todo'
import { Task } from '../utils/types/_Task'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
  task: Task
  subtasks: Task[]
}

// Modal.setAppElement('#root')

const TaskModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  task,
  subtasks,
}) => {
  // const [isOpen, setIsOpen] = useState(initialIsOpen)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-fit h-[90vh] max-h-[90vh] max-w-[90vw] mx-auto mt-10 dark:bg-slate-600 rounded-2xl dark:text-white overflow-hidden flex flex-col"
      overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 flex justify-center items-center"
    >
      <header className="flex justify-end px-4 py-2 dark:bg-slate-700 bg-slate-300">
        <FaWindowClose
          size={30}
          className="dark:fill-white hover:fill-red-500 hover:cursor-pointer"
          onClick={() => onRequestClose()}
        />
      </header>
      <main className="border-t border-slate-500 flex gap-2 flex-1 max-h-[90vh]">
        <section className="pt-5 pb-24 px-10 overflow-auto max-h-full">
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
        </section>
        <section className="flex-1 bg-slate-700 p-6 min-w-[300px] flex flex-col gap-5">
          <Group title="Due date" category="Today">
            <AiOutlineCalendar size={20} className="fill-green-400" />
          </Group>
          <Group title="relevance" category="5">
            <RiNumbersFill size={20} className="fill-yellow-400" />
          </Group>
          <Group title="simplicity" category="10">
            <RiNumbersFill size={20} className="fill-red-400" />
          </Group>
          <Group title="urgency" category="2">
            <RiNumbersFill size={20} className="fill-blue-400 " />
          </Group>
        </section>
      </main>
    </Modal>
  )
}

export default TaskModal
