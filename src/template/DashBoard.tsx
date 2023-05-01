import { useState } from 'react'
import Container from '../atoms/Container'
import TodoItem from '../components/todo'
import ProjectItem from '../molecules/ProjectItem'
import TaskModal from '../organisms/TaskModal'
import WrapperApp from '../organisms/WrapperApp'
import { Project } from '../utils/types/_Project'
import { Task } from '../utils/types/_Task'

export default function DashBoard({
  data,
  projectsData,
  isLoading,
}: {
  data: any
  projectsData?: Project[]
  isLoading: boolean
}) {
  const [modalIsOpen, setModalIsOpen] = useState<number | false>(false)

  return (
    <>
      <WrapperApp>
        {(data.isTasksLoading || isLoading) && <p>Loading...</p>}
        {data.isTasksError && <p>{data.error}</p>}

        {projectsData?.[0] && (
          <Container title="Projects:" flex={true}>
            {projectsData?.map((project: any, i: number) => (
              <ProjectItem
                key={i}
                id={project.id}
                imgUrl={project.imgUrl}
                name={project.name}
                percent={project.percent}
              />
            ))}
          </Container>
        )}

        {data.tasks && (
          <>
            <Container title="Todo:">
              {data.tasks
                .filter((t: Task) => !t.done)
                .map((todo: Task, i: number) => (
                  <TodoItem key={i} todo={todo} onToggle={() => {}} />
                ))}
            </Container>
            <Container title="Done Today:">
              {data.tasks
                .filter((t: Task) => t.done)
                .map((todo: Task, i: number) => (
                  <TodoItem key={i} todo={todo} onToggle={() => {}} />
                ))}
            </Container>
          </>
        )}
      </WrapperApp>
      <TaskModal />
    </>
  )
}
