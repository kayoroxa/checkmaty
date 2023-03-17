import { useRouter } from 'next/router'
import ProjectTemplate from '../../template/ProjectTemplate'

export default function Project() {
  const router = useRouter()
  const { id } = router.query

  if (!id) return <h1>Passe o ID</h1>

  if (typeof id === 'string') {
    return <ProjectTemplate projectId={id} />
  }
  return <h1>Some Error..</h1>
}
