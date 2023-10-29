import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { axiosApi } from '../utils/axiosApi'
import { Project } from '../utils/types/_Project'

export const useProject = (id: Project['id']) => {
  const projectUrl = `/projects/${id}`
  const router = useRouter()

  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
    error: projectError,
  } = useQuery<Project | null>(
    ['projects', id],
    async () => {
      const get = axiosApi.get<Project>
      const { data } = await get(projectUrl)

      return data || null
    },
    {
      staleTime: 1000 * 60 * 3,
      enabled: !!id,
    }
  )

  const {
    mutate: deleteProject,
    isLoading: isDeleteProjectLoading,
    isError: isDeleteProjectError,
    error: deleteProjectError,
  } = useMutation(
    async () => {
      const { data } = await axiosApi.delete(projectUrl)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects')
        router.push('/')
      },
    }
  )

  type UpdateProject = {
    id: number
    updatedTask: Partial<Project>
  }

  const {
    mutate: updateProject,
    isLoading: isUpdateProjectLoading,
    isError: isUpdateProjectError,
    error: updateProjectError,
  } = useMutation(
    async (p: UpdateProject) => {
      const patch = axiosApi.patch<Project>
      const { data } = await patch(projectUrl, p.updatedTask)

      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['projects'])
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
    updateProject,
    isUpdateProjectLoading,
    isUpdateProjectError,
    updateProjectError,
  }
}
