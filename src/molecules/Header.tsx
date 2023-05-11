import { useRouter } from 'next/router'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { MdAddTask } from 'react-icons/md'
import { VscNewFolder } from 'react-icons/vsc'
import ButtonOp from '../atoms/ButtonOp'
import SquareImg from '../atoms/SquareImg'
import { useFolders } from '../hooks/useFolders'
import { useProjects } from '../hooks/useProjects'
import { useTasks } from '../hooks/useTasks'
import { useTaskStore } from '../store/useTaskStore'
import { TaskCreate } from '../utils/types/_Task'

export default function Header() {
  const { createTask } = useTasks('359051936857588309')
  const { createProject } = useProjects('359051936857588309')
  const { createFolder } = useFolders('359051936857588309')
  const { setTaskSelected } = useTaskStore()

  const { query, asPath } = useRouter()

  return (
    <header className="w-full px-8 py-2 dark:bg-slate-700  shadow-2xl flex justify-end items-center gap-3">
      <section className="mr-auto flex gap-4">
        <ButtonOp
          title="Add task"
          onClick={async () => {
            const data: TaskCreate = {
              title: 'New task',
              description: '',
              userId: '359051936857588309',
              inMainView: true,
              done: false,
            }

            if (typeof query.id === 'string' && asPath.includes('project')) {
              data.projectId = parseInt(query.id)
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
              userId: '359051936857588309',
              createdAt: new Date().getTime(),
              updatedAt: new Date().getTime(),
              tasksInMainView: true,
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
              createdByUserId: '359051936857588309',
              createdAt: new Date().getTime(),
              updatedAt: new Date().getTime(),
              imgUrl: 'https://i.stack.imgur.com/IaZve.png',
              coverImg:
                'https://installnet.com/wp-content/themes/u-design/assets/images/placeholders/post-placeholder.jpg',
              accessUserIds: [],
              userId: '359051936857588309',
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
        <h1 className="text-xl">Caio Rocha</h1>
        <p className="text-sm">@kayoroxa</p>
      </div>
      <SquareImg src="https://avatars.githubusercontent.com/u/54248474?v=4" />
    </header>
  )
}
