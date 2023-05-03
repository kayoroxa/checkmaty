import { useTasks } from '../hooks/useTasks'
import DashBoard from '../template/DashBoard'

export default function Inbox() {
  const data = useTasks('359051936857588309', {
    inMainView: false,
    parentId: null,
    projectId: null,
  })
  return (
    <>
      <DashBoard data={data} isLoading={data.isTasksLoading} />
    </>
  )
}
