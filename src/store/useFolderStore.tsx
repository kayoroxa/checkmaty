import { create } from 'zustand'
import { queryClient } from '../pages/_app'
import { Folder } from '../utils/types/_Folder'

interface MyState {
  folderSelected: null | Folder
  setFolderSelected: (folder: Folder | null) => void
  setFolderIdSelected: (id: Folder['id']) => void
}

export const useFolderStore = create<MyState>()((set, get) => ({
  folderSelected: null,
  setFolderSelected: folder => {
    set({ folderSelected: folder })
  },

  setFolderIdSelected: id => {
    const folders =
      (queryClient.getQueryState(['folders'])?.data as Folder[]) || []
    const folderSelected = folders.find(folder => folder.id === id)
    set({ folderSelected })
  },
}))
