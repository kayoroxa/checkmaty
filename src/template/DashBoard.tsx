import Container from '../atoms/Container'
import TodoItem from '../components/todo'
import { useTasks } from '../hooks/useTasks'
import ProjectItem from '../molecules/ProjectItem'
import TaskModal from '../organisms/TaskModal'
import WrapperApp from '../organisms/WrapperApp'
import { sortScoredTasks } from '../utils/sortTasks'
import { Project } from '../utils/types/_Project'
import { Task } from '../utils/types/_Task'

export default function DashBoard({
  projectsData,
  isLoading,
}: {
  projectsData?: Project[]
  isLoading: boolean
}) {
  const { tasks, isTasksLoading, isTasksError } = useTasks(
    '359051936857588309',
    { inMainView: true }
  )

  return (
    <>
      <WrapperApp>
        {(isTasksLoading || isLoading) && <p>Loading...</p>}
        {isTasksError && <p>Error não conseguindo carregar os tarefas</p>}

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

        {tasks && (
          <>
            <Container title="Todo:">
              {sortScoredTasks(tasks)
                .filter((t: Task) => !t.done)
                .map((todo: Task, i: number) => (
                  <TodoItem key={i} todo={todo} onToggle={() => {}} />
                ))}
            </Container>
            <Container title="Done Today:">
              {sortScoredTasks(tasks)
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
