import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { axiosApi } from '../utils/axiosApi'
import { Folder } from '../utils/types/_Folder'
import { StepTask, StepTaskCreate } from '../utils/types/_StepTask'

type Type = Folder

export const useFolder = (id: Type['id']) => {
  const folderUrl = `/folders/${id}`
  const router = useRouter()

  const {
    data: folder,
    isLoading: isFolderLoading,
    isError: isFolderError,
    error: folderError,
  } = useQuery<Type | null>(
    ['folders', id],
    async () => {
      const get = axiosApi.get<Type>
      const { data } = await get(folderUrl)

      return data || null
    },
    {
      staleTime: 1000 * 60 * 2,
      enabled: !!id,
    }
  )

  const {
    data: stepTasks,
    isLoading: isStepTasksLoading,
    isError: isStepTasksError,
    error: stepTasksError,
  } = useQuery<StepTask[] | null>(
    ['stepTasks', id],
    async () => {
      const get = axiosApi.get<StepTask[]>
      const { data } = await get(`/tasks?folderId=${id}&_sort=order`)
      // const { data } = await get(`/steptasks?folderId=${id}&_sort=order`)

      return data || null
    },
    {
      staleTime: 1000 * 60 * 2,
      enabled: !!id,
    }
  )

  const {
    mutate: deleteFolder,
    isLoading: isDeleteFolderLoading,
    isError: isDeleteFolderError,
    error: deleteFolderError,
  } = useMutation(
    async () => {
      const { data } = await axiosApi.delete(folderUrl)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('folders')
        router.push('/')
      },
    }
  )

  type UpdateFolder = {
    id: number
    updatedFolder: Partial<Type>
  }

  const {
    mutate: updateFolder,
    isLoading: isUpdateFolderLoading,
    isError: isUpdateFolderError,
    error: updateFolderError,
  } = useMutation(
    async (p: UpdateFolder) => {
      const patch = axiosApi.patch<Type>
      const { data } = await patch(folderUrl, p.updatedFolder)

      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['folders'])
        queryClient.invalidateQueries(['tasks'])
        queryClient.invalidateQueries(['stepTasks'])
      },
    }
  )

  const {
    mutate: createStepTask,
    isLoading: isCreateStepTaskLoading,
    isError: isCreateStepTaskError,
    error: createStepTaskError,
  } = useMutation(
    async (newTask: StepTaskCreate) => {
      const { data } = await axiosApi.post<Folder>('/tasks', newTask)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['stepTasks'])
        queryClient.invalidateQueries(['tasks'])
      },
    }
  )

  return {
    folder: folder,
    isFolderLoading,
    isFolderError,
    folderError,
    deleteFolder,
    isDeleteFolderLoading,
    isDeleteFolderError,
    deleteFolderError,
    updateFolder,
    isUpdateFolderLoading,
    isUpdateFolderError,
    updateFolderError,
    createStepTask,
    isCreateStepTaskLoading,
    isCreateStepTaskError,
    createStepTaskError,
    stepTasks,
    isStepTasksLoading,
    isStepTasksError,
    stepTasksError,
  }
}
