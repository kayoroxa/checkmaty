import { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import Container from '../atoms/Container'
import Input, { WrapperInput } from '../atoms/Input'
import SquareImg from '../atoms/SquareImg'
import TodoItem from '../components/todo'
import { useProject } from '../hooks/useProject'
import { useTasksIn } from '../hooks/useTasksIn'
import TaskModal from '../organisms/TaskModal'
import WrapperApp from '../organisms/WrapperApp'
import { Task } from '../utils/types/_Task'

interface IProps {
  projectId: number
  data: any
}

export default function ProjectTemplate({ projectId }: IProps) {
  const { project, deleteProject, updateProject } = useProject(projectId)
  const data = useTasksIn('359051936857588309', { projectId: projectId })
  const projectData = project
  const [modalIsOpen, setModalIsOpen] = useState<number | false>(false)

  if (!projectData) return <h1>Projeto não encontrado</h1>

  return (
    <>
      <WrapperApp>
        {data.isTasksLoading && <p>Loading...</p>}
        {data.isTasksError && <p>{'data.error'}</p>}
        {data.tasks && (
          <div className="relative flex flex-col gap-7">
            <header>
              <div className="w-full h-[300px] relative">
                <WrapperInput
                  inputValue={projectData.coverImg}
                  onInputValueChange={text => {
                    updateProject({
                      id: projectId,
                      updatedTask: { coverImg: text },
                    })
                  }}
                >
                  <img
                    src={projectData.coverImg}
                    alt=""
                    className="object-cover m-h-full h-full m-w-full w-full "
                  />
                </WrapperInput>
              </div>
              <WrapperInput
                inputValue={projectData.imgUrl}
                onInputValueChange={text => {
                  updateProject({
                    id: projectId,
                    updatedTask: { imgUrl: text },
                  })
                }}
              >
                <div className="-mt-12 mb-5 ml-11 relative w-fit">
                  <SquareImg src={projectData.imgUrl} size={100} />
                </div>
              </WrapperInput>
              <Input
                value={projectData.name}
                className="text-5xl"
                onValueChange={text => {
                  updateProject({ id: projectId, updatedTask: { name: text } })
                }}
              />
            </header>

            <Container title="Todo:" grid={true}>
              {data.tasks
                .filter(t => !t.done)
                .map((todo: Task, i: number) => (
                  <TodoItem key={i} todo={todo} onToggle={() => {}} />
                ))}
            </Container>
            <Container title="Done Today:" grid={true}>
              {data.tasks
                .filter(t => t.done)
                .map((todo: Task, i: number) => (
                  <TodoItem key={i} todo={todo} onToggle={() => {}} />
                ))}
              {/* {Array.from(Array(3).keys()).map((_, i) => (
                <TodoItem
                  key={i}
                  todo={{
                    title: 'test - gravar video',
                    description: 'hello',
                    id: 'asd',
                  }}
                  onToggle={() => {}}
                  onClick={() => setModalIsOpen(i)}
                />
              ))} */}
            </Container>
          </div>
        )}
        <BsFillTrashFill
          size={30}
          className="absolute hover:cursor-pointer fill-red-500 hover:fill-red-500 opacity-40 hover:opacity-100 z-20"
          onClick={() => {
            deleteProject()
          }}
        />
      </WrapperApp>
      {data.tasks && (
        <TaskModal
        // isOpen={modalIsOpen !== false}
        // onRequestClose={() => {
        //   setModalIsOpen(false)
        // }}
        // task={
        //   typeof modalIsOpen === 'number'
        //     ? data.tasks[modalIsOpen]
        //     : data.tasks[0]
        // }
        />
      )}
    </>
  )
}
