import { useEffect, useState } from 'react'
import Container from '../atoms/Container'
import TodoItem from '../components/todo'
import ProjectItem from '../molecules/ProjectItem'
import FolderModal from '../organisms/FolderModal'
import TaskModal from '../organisms/TaskModal'
import WrapperApp from '../organisms/WrapperApp'
import { sortScoredTasks } from '../utils/sortTasks'
import { Project } from '../utils/types/_Project'
import { StepTask } from '../utils/types/_StepTask'
import { Task } from '../utils/types/_Task'

interface TaskData {
  tasks: Task[] | undefined
  isTasksLoading: boolean
  isTasksError: boolean
}

export const isDone = (task: Task) => {
  const isRecurring = task.is_recurring && task.doneDate

  if (!isRecurring || !task.doneDate) return task.done

  const today = new Date().getDate()
  const doneDate = new Date(task.doneDate).getDate()

  return doneDate === today
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
  const [filteredTasks, setFilteredTasks] = useState<Task[]>()
  const [filteredDoneToday, setFilteredDoneToday] = useState<Task[]>()
  const [slice, setSlice] = useState(9)

  useEffect(() => {
    if (tasksNormal) {
      const filteredTodo = sortScoredTasks(tasksNormal)
        .filter(t =>
          t.doneDate && t.is_recurring && t.done
            ? new Date(t.doneDate).getDate() !== new Date().getDate()
            : !t.done
        )
        .slice(0, slice)

      const filteredDoneToday = tasksNormal.filter(
        (t: Task) =>
          t.done &&
          t.doneDate &&
          new Date().getDate() === new Date(t.doneDate).getDate()
      )

      setFilteredTasks(filteredTodo)
      setFilteredDoneToday(filteredDoneToday)
    }
  }, [tasksNormal, slice])

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
          <>
            <Container
              title="Todo:"
              grid={true}
              showSlice={true}
              onSliceChange={newSlice => {
                setSlice(newSlice)
              }}
            >
              {filteredTasks.map((todo: Task | StepTask, i: number) => (
                <TodoItem key={i} todo={todo} onToggle={() => {}} />
              ))}
            </Container>
          </>
        )}
        <div className="flex gap-4">
          <div>
            Simplicity:{' '}
            {filteredDoneToday?.reduce(
              (a, b) => (b.simplicity ? a + b.simplicity : a),
              0
            )}
          </div>
          <div>
            Urgency:{' '}
            {filteredDoneToday?.reduce(
              (a, b) => (b.urgency ? a + b.urgency : a),
              0
            )}
          </div>
          <div>
            Relevance:{' '}
            {filteredDoneToday?.reduce(
              (a, b) => (b.relevance ? a + b.relevance : a),
              0
            )}
          </div>
        </div>
        {filteredDoneToday && (
          <Container title="Done Today:" grid={true}>
            {filteredDoneToday.slice(0, 9).map((todo: Task, i: number) => (
              <TodoItem key={i} todo={todo} onToggle={() => {}} />
            ))}
          </Container>
        )}
      </WrapperApp>
      <TaskModal />
      <FolderModal />
    </>
  )
}
