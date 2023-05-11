import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { axiosApi } from '../utils/axiosApi'
import { Folder, FolderCreate } from '../utils/types/_Folder'

export const useFolders = (userId: string) => {
  const foldersUrl = `/folders?userId=${userId}`

  const {
    data: folders,
    isLoading: isFoldersLoading,
    isError: isFoldersError,
    error: foldersError,
  } = useQuery<Folder[]>(
    'folders',
    async () => {
      const { data } = await axiosApi.get<Folder[]>(foldersUrl)
      return data
    },
    {
      staleTime: 1000 * 60 * 2,
      enabled: !!userId,
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
      const { data } = await axiosApi.post<Folder>('/folders', newFolder)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['folders'])
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
