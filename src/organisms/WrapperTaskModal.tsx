import { AiOutlineCalendar } from 'react-icons/ai'
import { FaWindowClose } from 'react-icons/fa'
import { RiNumbersFill } from 'react-icons/ri'
import Modal from 'react-modal'
import Group from '../atoms/Group'
import Toggle from '../atoms/Toggle'
import { useTasks } from '../hooks/useTasks'
import { useTaskStore } from '../store/useTaskStore'
import { Task } from '../utils/types/_Task'

interface Props {
  children: React.ReactNode
  isOpen: boolean
  onRequestClose: () => void
  task: Task
}

export default function WrapperTaskModal({
  children,
  isOpen,
  onRequestClose,
  task,
}: Props) {
  const {
    taskSelected,
    taskSelectedHistoric,
    setTaskSelected,
    setTaskSelectedHistoric,
  } = useTaskStore()

  const showHistoric = taskSelectedHistoric && taskSelectedHistoric?.length > 1

  const { updateTask, deleteTask } = useTasks('359051936857588309')

  if (!taskSelected) return null
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-fit h-[90vh] max-h-[90vh] max-w-[90vw] mx-auto mt-10 dark:bg-slate-600 rounded-2xl dark:text-white overflow-hidden flex flex-col focus:outline-none"
      overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 flex justify-center items-center"
    >
      <header className="flex justify-end px-4 py-2 dark:bg-slate-700 bg-slate-300">
        <div className="flex-1 flex gap-4">
          {showHistoric &&
            taskSelectedHistoric.map((task, i) => (
              <span
                key={task.id}
                onClick={() => {
                  setTaskSelected(task)
                  setTaskSelectedHistoric(prev => prev.slice(0, i + 1))
                }}
                className={` ${
                  i !== taskSelectedHistoric.length - 1
                    ? 'hover:underline hover:cursor-pointer'
                    : 'text-yellow-400 underline'
                }`}
              >
                {task.title}
              </span>
            ))}
        </div>
        <FaWindowClose
          size={30}
          className="dark:fill-white hover:fill-red-500 hover:cursor-pointer"
          onClick={() => {
            onRequestClose()
          }}
        />
      </header>
      <main className="border-t border-slate-500 flex flex-1 max-h-[90vh]">
        <section className="pt-5 pb-24 px-10 overflow-auto max-h-full min-w-[30vw]">
          {children}
        </section>
        <section className="flex-1 bg-slate-700 p-6 min-w-[300px] flex flex-col gap-5">
          <Group title="Due date" value="Today">
            <AiOutlineCalendar size={20} className="fill-green-400" />
          </Group>
          <Group title="relevance" value={String(task.relevance || 0)}>
            <RiNumbersFill size={20} className="fill-yellow-400" />
          </Group>
          <Group title="simplicity" value={String(task.simplicity || 0)}>
            <RiNumbersFill size={20} className="fill-red-400" />
          </Group>
          <Group title="urgency" value={String(task.urgency || 0)}>
            <RiNumbersFill size={20} className="fill-blue-400 " />
          </Group>
          <h3>Show in dashboard</h3>
          <Toggle
            defaultValue={task.inMainView}
            onValueChange={value => {
              updateTask({
                id: String(taskSelected.id),
                updatedTask: {
                  inMainView: value,
                },
              })
            }}
          />

          <button
            onClick={() => {
              deleteTask(String(taskSelected.id))
            }}
            className="mt-auto bg-red-600/30 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </section>
      </main>
    </Modal>
  )
}

// inMainView
