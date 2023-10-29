import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { axiosNextApi } from '../utils/axiosApi'
import { Folder, FolderCreate } from '../utils/types/_Folder'
import { useFolderStore } from './../store/useFolderStore'

export const useFolders = (user_id: string) => {
  const foldersUrl = `/folders?user_id=${user_id}`
  const { setFolderSelected } = useFolderStore()
  const {
    data: folders,
    isLoading: isFoldersLoading,
    isError: isFoldersError,
    error: foldersError,
  } = useQuery<Folder[]>(
    'folders',
    async () => {
      const { data } = await axiosNextApi.get<Folder[]>(foldersUrl)
      return data
    },
    {
      staleTime: 1000 * 60 * 3,
      enabled: !!user_id,
    }
  )
  const router = useRouter()

  const {
    mutate: createFolder,
    isLoading: isCreateFolderLoading,
    isError: isCreateFolderError,
    error: createFolderError,
  } = useMutation(
    async (newFolder: FolderCreate) => {
      console.log('colocando nova folder')
      const { data } = await axiosNextApi.post<Folder>('/folders', newFolder)
      return data
    },
    {
      onSuccess: (data, variables, context) => {
        console.log('Sucess create folder')

        setFolderSelected(data)
        queryClient.invalidateQueries(['folders'])
        queryClient.invalidateQueries(['stepTasks'])
        queryClient.invalidateQueries(['tasks'])
      },
    }
  )

  return {
    folders: folders || [],
    isFoldersLoading,
    isFoldersError,
    foldersError,
    createFolder,
    isCreateFolderLoading,
    isCreateFolderError,
    createFolderError,
  }
}
