import { useRouter } from 'next/router'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { MdAddTask } from 'react-icons/md'
import { VscNewFolder } from 'react-icons/vsc'
import { useQuery } from 'react-query'
import ButtonOp from '../atoms/ButtonOp'
import SquareImg from '../atoms/SquareImg'
import { useFolders } from '../hooks/useFolders'
import { useProjects } from '../hooks/useProjects'
import { useTasks } from '../hooks/useTasks'
import { useTaskStore } from '../store/useTaskStore'
import { axiosApi } from '../utils/axiosApi'
import { TaskCreate } from '../utils/types/_Task'
import { User } from '../utils/types/_User'

export default function Header() {
  const { createTask } = useTasks('64de7201df61c3c518e7a83b')
  const { createProject } = useProjects('64de7201df61c3c518e7a83b')
  const { createFolder } = useFolders('64de7201df61c3c518e7a83b')
  const { setTaskSelected } = useTaskStore()

  const { query, asPath } = useRouter()

  const { data: user } = useQuery<User>(['user'], async () => {
    const { data } = await axiosApi.get<User[]>('/users')
    return data[0]
  })

  return (
    <header className="w-full px-8 py-2 dark:bg-slate-700  shadow-2xl flex justify-end items-center gap-3">
      <section className="mr-auto flex gap-4">
        <ButtonOp
          title="Add task"
          onClick={async () => {
            const data: TaskCreate = {
              title: 'New task',
              description: '',
              createdByUserId: '64de7201df61c3c518e7a83b',
              inMainView: true,
              done: false,
              createdAt: new Date(),
              updatedAt: new Date(),
              doneDate: null,
              is_recurring: false,
              relevance: 0,
              urgency: 0,
              simplicity: 0,
              dueDate: null,
              folder_id: null,
              parentId: null,
              project_id: null,
            }

            if (typeof query.id === 'string' && asPath.includes('project')) {
              data.project_id = query.id
              data.inMainView = false
            }

            if (asPath.includes('inbox')) {
              data.inMainView = false
            }

            createTask(data)
          }}
        >
          <MdAddTask size={30} className="group-hover:fill-green-400" />
        </ButtonOp>

        <ButtonOp
          title="Add Folder"
          onClick={async () => {
            createFolder({
              description: '',
              title: 'New Folder',
              createdByUserId: '64de7201df61c3c518e7a83b',
              createdAt: new Date(),
              tasksInMainView: true,
              relevance: 0,
              urgency: 0,
              project_id: null,
              updatedAt: new Date(),
            })
          }}
        >
          <VscNewFolder size={30} className="group-hover:fill-green-400" />
        </ButtonOp>

        <ButtonOp
          title="Add Project"
          onClick={async () => {
            createProject({
              name: 'New Project',
              description: '',
              createdByUserId: '64de7201df61c3c518e7a83b',
              createdAt: new Date(),
              imgUrl: 'https://i.stack.imgur.com/IaZve.png',
              coverImg:
                'https://installnet.com/wp-content/themes/u-design/assets/images/placeholders/post-placeholder.jpg',
              accessUserIds: [],
              user_id: '64de7201df61c3c518e7a83b',
            })
          }}
        >
          <AiOutlineAppstoreAdd
            size={30}
            className="group-hover:fill-green-400"
          />
        </ButtonOp>

        {/* <ButtonOp title="Add Project" onClick={() => {}} /> */}
      </section>
      <div className="-mt-2">
        <h1 className="text-xl">{user?.name}</h1>
        <p className="text-sm">@{user?.userName}</p>
      </div>
      <SquareImg
        src={
          user?.imgUrl ||
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
        }
      />
    </header>
  )
}
