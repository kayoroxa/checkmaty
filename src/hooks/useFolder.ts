import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { axiosNextApi } from '../utils/axiosApi'
import { Folder } from '../utils/types/_Folder'
import { StepTask, StepTaskCreate } from '../utils/types/_StepTask'
import { useFolderStore } from './../store/useFolderStore'

type Type = Folder

export const useFolder = (id?: Type['id']) => {
  const folderUrl = `/folders/${id}`
  const router = useRouter()
  const { setFolderSelected } = useFolderStore()
  const {
    data: folder,
    isLoading: isFolderLoading,
    isError: isFolderError,
    error: folderError,
  } = useQuery<Type | null>(
    ['folders', id],
    async () => {
      const get = axiosNextApi.get<Type>
      const { data } = await get(folderUrl)

      return data || null
    },
    {
      staleTime: 1000 * 60 * 3,
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
      const get = axiosNextApi.get<StepTask[]>
      const { data } = await get(`/folders/${id}/tasks`)
      // const { data } = await get(`/steptasks?folder_id=${id}&_sort=order`)

      return data || null
    },
    {
      staleTime: 1000 * 60 * 3,
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
      const { data } = await axiosNextApi.delete(folderUrl)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('folders')
        queryClient.invalidateQueries('stepTasks')
        queryClient.invalidateQueries('tasks')

        setFolderSelected(null)
        router.push('/')
      },
    }
  )

  type UpdateFolder = {
    id: Folder['id']
    updatedFolder: Partial<Type>
  }

  const {
    mutate: updateFolder,
    isLoading: isUpdateFolderLoading,
    isError: isUpdateFolderError,
    error: updateFolderError,
  } = useMutation(
    async (p: UpdateFolder) => {
      const patch = axiosNextApi.patch<Type>
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
    mutate: duplicateFolder,
    isLoading: isDuplicateFolderLoading,
    isError: isDuplicateFolderError,
    error: duplicateFolderError,
  } = useMutation(
    async (folderId: Folder['id']) => {
      const response = await fetch(`/api/folders/${folderId}/duplicate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Falha ao duplicar a pasta')
      }

      return response.json()
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
      const { data } = await axiosNextApi.post<Folder>('/tasks', newTask)

      return data
    },
    {
      onSuccess: data => {
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
    duplicateFolder,
    isDuplicateFolderLoading,
    isDuplicateFolderError,
    duplicateFolderError,
  }
}
