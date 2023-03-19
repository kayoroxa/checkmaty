import { useState } from 'react'
import Container from '../atoms/Container'
import TodoItem from '../components/todo'
import ProjectItem from '../molecules/ProjectItem'
import TaskModal from '../organisms/TaskModal'
import WrapperApp from '../organisms/WrapperApp'
import projectsData from '../utils/projectsMock.json'
import { Task } from '../utils/types/_Task'

export default function DashBoard({ data }: { data: any }) {
  const todo = {
    id: 1,
    text: 'Buy milk',
    description: 'Buy milk in restaurant',
  }
  const todo2 = {
    id: 1,
    text: 'Buy milk',
  }
  const [modalIsOpen, setModalIsOpen] = useState<number | false>(false)
  return (
    <>
      <WrapperApp>
        {/* {JSON.stringify(data.tasks)} */}
        {data.isTasksLoading && <p>Loading...</p>}
        {data.isTasksError && <p>{data.error}</p>}
        {data.tasks && (
          <>
            <Container title="Projects:" flex={true}>
              {projectsData.map((project: any, i: number) => (
                <ProjectItem
                  key={i}
                  id={project.id}
                  imgUrl={project.imgUrl}
                  name={project.name}
                  percent={project.percent}
                />
              ))}
            </Container>
            <Container title="Todo:">
              {data.tasks.data.map((todo: Task, i: number) => (
                <TodoItem
                  key={i}
                  todo={todo}
                  onToggle={() => {}}
                  onClick={() => setModalIsOpen(i)}
                />
              ))}
            </Container>
            <Container title="Done Today:">
              {Array.from(Array(3).keys()).map((_, i) => (
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
              ))}
            </Container>
          </>
        )}
      </WrapperApp>
      {data.tasks && (
        <TaskModal
          isOpen={modalIsOpen !== false}
          onRequestClose={() => {
            setModalIsOpen(false)
          }}
          task={
            typeof modalIsOpen === 'number'
              ? data.tasks.data[modalIsOpen]
              : data.tasks.data[0]
          }
          subtasks={data.tasks.data}
        />
      )}
    </>
  )
}
