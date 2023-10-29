import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { axiosApi, axiosNextApi } from '../utils/axiosApi'
import { Project, ProjectCreate } from '../utils/types/_Project'

export const useProjects = (user_id: string) => {
  const projectsUrl = `/projects?user_id=${user_id}`

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
  } = useQuery<Project[]>(
    'projects',
    async () => {
      const { data } = await axiosNextApi.get<Project[]>(projectsUrl)

      return data
    },
    {
      staleTime: 1000 * 60 * 2,
      enabled: !!user_id,
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
