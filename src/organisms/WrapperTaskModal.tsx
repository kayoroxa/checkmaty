import { AiOutlineCalendar } from 'react-icons/ai'
import { FaBolt, FaBullseye, FaFire, FaWindowClose } from 'react-icons/fa'
import Modal from 'react-modal'
import DeleteButton from '../atoms/DeleteButton'
import Group from '../atoms/Group'
import Toggle from '../atoms/Toggle'
import { useTasks } from '../hooks/useTasks'
import { useTaskStore } from '../store/useTaskStore'
import { Task } from '../utils/types/_Task'

type TaskModalProps = {
  title: string
  description: string
  id: Task['id']
  inMainView: boolean
  relevancy?: number
  simplicity?: number
  urgency?: number
}

type OnChangeData = { id: Task['id']; updateData: Partial<Task> }

interface Props {
  children: React.ReactNode
  isOpen: boolean
  onRequestClose: () => void
  task: TaskModalProps & Partial<Task>
  onChange?: (data: OnChangeData) => void
  // onChange?: (task: TaskModalProps & Partial<Task>) => void
}

export default function WrapperTaskModal({
  children,
  isOpen,
  onRequestClose,
  task,
  onChange,
}: Props) {
  const { taskSelectedHistoric, setTaskSelected, setTaskSelectedHistoric } =
    useTaskStore()

  const showHistoric = taskSelectedHistoric && taskSelectedHistoric?.length > 1
  const { updateTask, deleteTask } = useTasks('359051936857588309')

  // useEffect(() => {
  //   setTaskSelectedHistoric(prevHistoric => {
  //     const hasParent = task.parentId !== undefined || task.parentId !== false
  //     if (hasParent && prevHistoric.length === 0) {
  //       return prevHistoric ///terminar
  //     }
  //     return prevHistoric
  //   })
  // }, [])
  const isStepTask = typeof task.folderId === 'number'

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-fit h-[90vh] max-h-[90vh] max-w-[90vw] mx-auto mt-10 dark:bg-slate-600 rounded-2xl dark:text-white overflow-hidden flex flex-col focus:outline-none"
      overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 flex justify-center items-center"
    >
      <header className="flex justify-end px-4 py-2 dark:bg-slate-700 bg-slate-300">
        <div className="flex-1 flex gap-4">
          {/* {showHistoric &&
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
            ))} */}
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
          <Group data={{ title: 'Due date', value: 'Today' }}>
            <AiOutlineCalendar size={20} className="fill-green-400" />
          </Group>

          {task.relevance !== undefined && !isStepTask && (
            <Group
              data={{
                title: 'relevance',
                label: 'relevance',
                value: task.relevance,
              }}
              onChange={newData => {
                if (onChange) {
                  onChange({
                    id: task.id,
                    updateData: {
                      relevance: Number(newData.value),
                    },
                  })
                } else {
                  updateTask({
                    id: task.id,
                    updatedTask: {
                      relevance: Number(newData.value),
                    },
                  })
                }
              }}
            >
              <FaBullseye size={20} className="fill-yellow-400" />
            </Group>
          )}

          {task.simplicity !== undefined && (
            <Group
              data={{
                title: 'simplicity',
                label: 'simplicity',
                value: task.simplicity,
              }}
              onChange={newData => {
                // updateTask({
                //   id: task.id,
                //   updatedTask: {
                //     simplicity: Number(newData.value),
                //   },
                // })
                if (!onChange) return
                onChange({
                  id: task.id,
                  updateData: {
                    simplicity: Number(newData.value),
                  },
                })
              }}
            >
              <FaBolt size={20} className="fill-blue-400" />
            </Group>
          )}

          {task.urgency !== undefined && !isStepTask && (
            <Group
              data={{
                title: 'urgency',
                label: 'urgency',
                value: task.urgency,
              }}
              onChange={newData => {
                if (!onChange) return
                onChange({
                  id: task.id,
                  updateData: {
                    urgency: Number(newData.value),
                  },
                })
              }}
            >
              <FaFire size={20} className="fill-red-400 " />
            </Group>
          )}

          {!isStepTask && (
            <>
              <h3>Show in dashboard</h3>
              <Toggle
                defaultValue={task.inMainView}
                onValueChange={value => {
                  if (!onChange) return
                  onChange({
                    id: task.id,
                    updateData: {
                      inMainView: value,
                    },
                  })
                }}
              />
            </>
          )}

          <DeleteButton onClick={() => deleteTask(String(task.id))} />
        </section>
      </main>
    </Modal>
  )
}

// inMainView
