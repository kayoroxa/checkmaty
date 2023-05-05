import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { axiosApi } from '../utils/axiosApi'
import { Project } from '../utils/types/_Project'

export const useProject = (id: number) => {
  const projectsUrl = `/projects?id=${id}`
  const router = useRouter()

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

  const {
    mutate: deleteProject,
    isLoading: isDeleteProjectLoading,
    isError: isDeleteProjectError,
    error: deleteProjectError,
  } = useMutation(
    async (projectId: Project['id']) => {
      const { data } = await axiosApi.delete(`/projects/${projectId}`)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects')
        router.push('/')
      },
    }
  )

  return {
    project: project,
    isProjectLoading,
    isProjectError,
    projectError,
    deleteProject,
    isDeleteProjectLoading,
    isDeleteProjectError,
    deleteProjectError,
  }
}
