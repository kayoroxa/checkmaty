import { useTasks } from '../hooks/useTasks'
import DashBoard from '../template/DashBoard'

export default function Inbox() {
  const data = useTasks('64de7201df61c3c518e7a83b', {
    inMainView: false,
    parentId: null,
    project_id: null,
  })

  return (
    <>
      <DashBoard data={data} isLoading={data.isTasksLoading} />
    </>
  )
}
