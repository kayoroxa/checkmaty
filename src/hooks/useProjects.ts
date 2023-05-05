import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { axiosApi } from '../utils/axiosApi'
import { Project, ProjectCreate } from '../utils/types/_Project'

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
  const router = useRouter()
  const {
    mutate: createProject,
    isLoading: isCreateProjectLoading,
    isError: isCreateProjectError,
    error: createProjectError,
  } = useMutation(
    async (newProject: ProjectCreate) => {
      const { data } = await axiosApi.post<Project>('/projects', newProject)
      return data
    },
    {
      onSuccess: project => {
        queryClient.invalidateQueries(['projects'])
        router.push(`/project/${project.id}`)
      },
    }
  )

  return {
    projects: projects || [],
    isProjectsLoading,
    isProjectsError,
    projectsError,
    createProject,
    isCreateProjectLoading,
    isCreateProjectError,
    createProjectError,
  }
}
