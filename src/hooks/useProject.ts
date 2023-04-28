import { useQuery } from 'react-query'
import { axiosApi } from '../utils/axiosApi'
import { Project } from '../utils/types/_Project'

export const useProject = (id: string) => {
  const projectsUrl = `/projects?id=${id}`

  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
    error: projectError,
  } = useQuery<Project | null>(
    ['project', id],
    async () => {
      const { data } = await axiosApi.get<Project[]>(projectsUrl)
      return data?.[0] || null
    },
    {
      staleTime: 1000 * 60 * 2,
      enabled: !!id,
    }
  )

  return {
    project: project,
    isProjectLoading,
    isProjectError,
    projectError,
  }
}
