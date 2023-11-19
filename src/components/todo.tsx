import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoDuplicateOutline } from 'react-icons/io5'
import DoneButton from '../atoms/DoneButton'
import { useTasks } from '../hooks/useTasks'
import { queryClient } from '../pages/_app'
import { useTaskStore } from '../store/useTaskStore'
import { axiosApi } from '../utils/axiosApi'
import { Project } from '../utils/types/_Project'
import { Task } from '../utils/types/_Task'

import { FaBolt, FaBullseye, FaFire } from 'react-icons/fa'
import SimpleButton from '../atoms/SimpleButton'
import { useFolder } from '../hooks/useFolder'
import { useFolderStore } from '../store/useFolderStore'

const getOpacity = (point: number | undefined) => (point ? point / 10 : 0)

function getEmoji(text: string | undefined) {
  if (!text) return
  const emoji = text
    .match(/[^.\w\s~ç,?;\/\*\-+\[\]!,áéíóúãõâêîôû]+/gi)
    ?.join('')
  return emoji
}

function removeEmoji(text: string | undefined) {
  if (!text) return text

  return text.replace(/[^.\w\s~ç,?;\/\*\-+\[\]!,áéíóúãõâêîôû]+/gi, '')
}

async function updateTodo(
  id: number,
  updatedTodo: Partial<Task>
): Promise<any> {
  const response = await axiosApi.patch(`/tasks/${id}`, updatedTodo)
  return response.data
}

const TodoItem = ({ todo, onToggle }: { todo: Task; onToggle: any }) => {
  const { updateTask } = useTasks('64de7201df61c3c518e7a83b')
  const { duplicateFolder } = useFolder('64de7201df61c3c518e7a83b')
  const router = useRouter()
  const pathname = router.pathname

  const handleToggle = (todoDone: boolean) => {
    onToggle(todo)

    const updateData: { id: Task['id']; updatedTask: Partial<Task> } = {
      id: todo.id,
      updatedTask: {
        done: !todoDone,
        // updatedAt: new Date().getTime(),
      },
    }
    if (!todoDone) {
      updateData.updatedTask.doneDate = new Date()
      // updateData.updatedTask.doneDate = new Date().getTime()
    }
    updateTask(updateData)
  }

  const projects =
    (queryClient.getQueryState('projects')?.data as Project[]) || []

  const myProject = projects?.find(
    (project: any) => project.id === todo.project_id
  )

  const { setTaskSelected, addTaskSelectedHistoric } = useTaskStore()
  const { setFolderSelected } = useFolderStore()

  const todoDone =
    todo.doneDate && todo.is_recurring && todo.done
      ? new Date(todo.doneDate) === new Date()
      : todo.done

  return (
    <div
      className="flex items-start  hover:bg-blue-50 px-4 dark:hover:bg-slate-700  min-w-[400px] rounded-2xl dark:bg-slate-700/80 relative ml-6 hover:cursor-pointer group"
      onClick={() => {
        addTaskSelectedHistoric(todo)
        if (todo.folder) {
          setFolderSelected(todo.folder)
        } else {
          setTaskSelected(todo)
        }
      }}
    >
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 py-2 px-4">
        <SimpleButton
          onClick={async e => {
            e.stopPropagation()
            if (todo.folder_id) {
              duplicateFolder(todo.folder_id)
            }
          }}
          icon={<IoDuplicateOutline />}
          title=""
        />
      </div>
      <section className="h-full my-auto flex items-center justify-center ">
        {todo.id && (
          <DoneButton
            done={todoDone || false}
            onClick={event => {
              event.stopPropagation()
              if (todoDone !== undefined) handleToggle(Boolean(todoDone))
            }}
          />
        )}
      </section>

      <section
        className={`py-3 overflow-hidden w-full  ${
          todoDone ? 'opacity-60' : 'opacity-100'
        } flex flex-col h-full`}
      >
        <div
          className={`flex-1 text-2xl text-gray-900 dark:text-white ${
            todoDone ? 'line-through' : ''
          }`}
        >
          {getEmoji(todo.folder?.title)
            ? getEmoji(todo.folder?.title) + ' ' + todo.title
            : todo.title}
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
              <p>{todo.simplicity ?? 0}</p>
            </div>
            <div
              className="flex gap-2"
              style={{
                opacity: getOpacity(
                  todo.folder?.relevance ?? todo.relevance ?? 0
                ),
              }}
            >
              <FaBullseye size={20} className="fill-yellow-400 -mr-1" />
              <p>{todo.folder?.relevance ?? todo.relevance ?? 0}</p>
            </div>
            <div
              className="flex gap-2"
              style={{
                opacity: getOpacity(todo.folder?.urgency ?? todo.urgency ?? 0),
              }}
            >
              <FaFire size={20} className="fill-red-400 -mr-1" />
              <p>{todo.folder?.urgency ?? todo.urgency ?? 0}</p>
            </div>
          </section>
          <section>
            {myProject && !pathname.includes('project') && (
              <Link
                onClick={event => event.stopPropagation()}
                href={`/project/${myProject.id}`}
                className="text-lg text-yellow-400/70 hover:underline"
              >
                #
                {myProject?.name.length > 19
                  ? myProject?.name.slice(0, 19) + '...'
                  : myProject?.name}
              </Link>
            )}
            {todo?.folder && <div>📁 {removeEmoji(todo.folder.title)}</div>}
          </section>
        </footer>
      </section>
    </div>
  )
}

export default TodoItem
