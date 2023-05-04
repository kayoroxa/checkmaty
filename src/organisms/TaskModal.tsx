import ButtonOp from '../atoms/ButtonOp'
import DoneButton from '../atoms/DoneButton'
import Input from '../atoms/Input'
import TodoItem from '../components/todo'
import { useTasks } from '../hooks/useTasks'
import { useTaskStore } from '../store/useTaskStore'
import { Task } from '../utils/types/_Task'
import WrapperTaskModal from './WrapperTaskModal'

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void
  task?: Task
}

// Modal.setAppElement('#root')

function TaskModal({ ...wrapperProps }: Props) {
  // const [isOpen, setIsOpen] = useState(initialIsOpen)
  const { updateTask, createTask } = useTasks('359051936857588309')
  const {
    taskSelected: task,
    setTaskSelected,
    resetTaskSelectedHistoric,
    addTaskSelectedHistoric,
  } = useTaskStore()

  const { tasks: subtasks } = useTasks('359051936857588309', {
    parentId: task?.id,
  })

  if (!task) return null

  return (
    <WrapperTaskModal
      isOpen={task ? true : false}
      onRequestClose={() => {
        setTaskSelected(null)
        resetTaskSelectedHistoric()
      }}
      task={task}
    >
      <header className="flex items-center justify-start ml-6 gap-2">
        <section>
          <DoneButton done={false} />
        </section>
        <section className="w-full">
          <Input
            onValueChange={newValue => {
              updateTask({ id: task.id, updatedTask: { title: newValue } })
            }}
            value={task.title}
            className="text-3xl font-medium mb-4 w-full break-all"
          />
          <Input
            onValueChange={newValue => {
              updateTask({
                id: task.id,
                updatedTask: { description: newValue },
              })
            }}
            value={task.description}
            className="text-lg mb-4  w-full"
          />
        </section>
      </header>

      <ButtonOp
        title="Add Subtask"
        onClick={async () => {
          const newTask = await createTask({
            title: 'New task',
            description: '',
            userId: '359051936857588309',
            inMainView: false,
            done: false,
            parentId: task.id,
          })
        }}
      />
      {subtasks && (
        <div className="border-t border-gray-200 mt-4 pt-4">
          <h3 className="text-2xl font-medium mb-2">Subtasks:</h3>
          <ul className="list-disc pl-4 flex flex-col gap-4 ">
            {subtasks.map((subtask, i) => (
              <TodoItem
                key={subtask.id || i}
                todo={subtask}
                onToggle={() => {}}
              />
            ))}
          </ul>
        </div>
      )}
    </WrapperTaskModal>
  )
}

export default TaskModal
