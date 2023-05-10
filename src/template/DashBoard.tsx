import { useEffect, useState } from 'react'
import Container from '../atoms/Container'
import TodoItem from '../components/todo'
import ProjectItem from '../molecules/ProjectItem'
import TaskModal from '../organisms/TaskModal'
import WrapperApp from '../organisms/WrapperApp'
import { sortScoredTasks } from '../utils/sortTasks'
import { Project } from '../utils/types/_Project'
import { StepTask } from '../utils/types/_StepTask'
import { Task } from '../utils/types/_Task'

interface TaskData {
  tasks: (Task & StepTask)[] | undefined
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
  const { tasks: tasksNormal, isTasksLoading, isTasksError } = data
  const [filteredTasks, setFilteredTasks] = useState<(Task & StepTask)[]>()
  const [filteredDoneToday, setFilteredDoneToday] = useState<Task[]>()

  useEffect(() => {
    if (tasksNormal) {
      const filteredTodo = sortScoredTasks(tasksNormal)
        .filter(t => !t.done)
        .slice(0, 30)

      const filteredDoneToday = tasksNormal
        .filter((t: Task) => t.done)
        .slice(0, 9)

      setFilteredTasks(filteredTodo)
      setFilteredDoneToday(filteredDoneToday)
    }
  }, [tasksNormal])

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

        {filteredTasks && (
          <Container title="Todo:" grid={true}>
            {filteredTasks.map((todo: Task | StepTask, i: number) => (
              <TodoItem key={i} todo={todo} onToggle={() => {}} />
            ))}
          </Container>
        )}
        {filteredDoneToday && (
          <Container title="Done Today:" grid={true}>
            {filteredDoneToday.map((todo: Task, i: number) => (
              <TodoItem key={i} todo={todo} onToggle={() => {}} />
            ))}
          </Container>
        )}
      </WrapperApp>
      <TaskModal />
    </>
  )
}
