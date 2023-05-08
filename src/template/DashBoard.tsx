import Container from '../atoms/Container'
import TodoItem from '../components/todo'
import ProjectItem from '../molecules/ProjectItem'
import TaskModal from '../organisms/TaskModal'
import WrapperApp from '../organisms/WrapperApp'
import { sortScoredTasks } from '../utils/sortTasks'
import { Project } from '../utils/types/_Project'
import { Task } from '../utils/types/_Task'

interface TaskData {
  tasks: Task[] | undefined
  isTasksLoading: boolean
  isTasksError: boolean
}

export default function DashBoard({
  projectsData,
  isLoading,
  data,
}: {
  projectsData?: Project[]
  isLoading: boolean
  data: TaskData
}) {
  const { tasks, isTasksLoading, isTasksError } = data

  return (
    <>
      <WrapperApp>
        {(isTasksLoading || isLoading) && <p>Loading...</p>}
        {isTasksError && <p>Error não conseguindo carregar os tarefas</p>}

        {projectsData?.[0] && (
          <Container title="Projects:">
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

        {tasks && (
          <>
            <Container title="Todo:" grid={true}>
              {sortScoredTasks(tasks)
                .filter((t: Task) => !t.done)
                .slice(0, 9)
                .map((todo: Task, i: number) => (
                  <TodoItem key={i} todo={todo} onToggle={() => {}} />
                ))}
            </Container>
            <Container title="Done Today:" grid={true}>
              {sortScoredTasks(tasks)
                .filter((t: Task) => t.done)
                .slice(0, 9)
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
