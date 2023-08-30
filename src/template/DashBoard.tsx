import { useEffect, useState } from 'react'
import { FaBolt, FaBullseye, FaFire } from 'react-icons/fa'
import { useQuery } from 'react-query'
import Container from '../atoms/Container'
import TodoItem from '../components/todo'
import ProjectItem from '../molecules/ProjectItem'
import FolderModal from '../organisms/FolderModal'
import TaskModal from '../organisms/TaskModal'
import WrapperApp from '../organisms/WrapperApp'
import { axiosApi } from '../utils/axiosApi'
import { mainCalcDoneDayScore } from '../utils/doneDayScore'
import { sortScoredTasks } from '../utils/sortTasks'
import { Project } from '../utils/types/_Project'
import { StepTask } from '../utils/types/_StepTask'
import { Task } from '../utils/types/_Task'
import { User } from '../utils/types/_User'

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

  const { data: user } = useQuery<User>(['user'], async () => {
    const { data } = await axiosApi.get<User[]>('/users')
    return data[0]
  })

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

  const calc = mainCalcDoneDayScore(filteredDoneToday || [])

  const dailyGoal = user?.dailyGoal || 40

  const goodScore = calc.score >= dailyGoal
  const midScore = calc.score >= dailyGoal * 0.6

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

        <div
          className={` p-5 rounded-xl w-fit ${
            goodScore
              ? 'bg-green-600/60'
              : midScore
              ? 'bg-yellow-600/60'
              : 'bg-red-600/60'
          }`}
        >
          <p className="text-xl font-bold mb-2">Daily Goal:</p>
          <div className="gap-4 flex items-center">
            <div
              className={`font-bold px-2 pb-1 text-2xl hover:scale-110 hover:cursor-default transition-all ${
                goodScore
                  ? 'bg-green-600/'
                  : midScore
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
            >
              Score: {calc.score}
            </div>
            <FaBolt size={20} className="fill-blue-400 -mr-2" />
            <div>Simplicity: {calc.simplicity}</div>
            <FaBullseye size={20} className="fill-yellow-400 -mr-1" />
            <div>Relevance: {calc.relevance}</div>
            <FaFire size={20} className="fill-red-400 -mr-1" />
            <div>Urgency: {calc.urgency}</div>
          </div>
        </div>

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
