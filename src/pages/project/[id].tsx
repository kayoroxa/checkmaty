import { useRouter } from 'next/router'
import { useTasks } from '../../hooks/useTasks'
import ProjectTemplate from '../../template/ProjectTemplate'

export default function Project() {
  const router = useRouter()
  const { id } = router.query

  if (!id) return <h1>Passe o ID</h1>

  if (typeof id === 'string' || typeof id === 'number') {
    const data = useTasks('359051936857588309')

    return <ProjectTemplate project_id={parseInt(id)} data={data} />
  }
  return <h1>Some Error..</h1>
}
