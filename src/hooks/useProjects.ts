import { useQuery } from 'react-query'
import { axiosApi } from '../utils/axiosApi'
import { Project } from '../utils/types/_Project'

export const useProjects = (userId: string) => {
  const projectsUrl = `/projects?userId=${userId}`

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
  } = useQuery<Project[]>(
    'projects',
    async () => {
      const { data } = await axiosApi.get<Project[]>(projectsUrl)
      return data
    },
    {
      staleTime: 1000 * 60 * 2,
      enabled: !!userId,
    }
  )

  return {
    projects: projects || [],
    isProjectsLoading,
    isProjectsError,
    projectsError,
  }
}
