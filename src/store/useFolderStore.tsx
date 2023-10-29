import { create } from 'zustand'
import { queryClient } from '../pages/_app'
import { _Folder } from '../utils/types/_Folder'

interface MyState {
  folderSelected: null | _Folder
  setFolderSelected: (folder: _Folder | null) => void
  setFolderIdSelected: (id: number) => void
}

export const useFolderStore = create<MyState>()((set, get) => ({
  folderSelected: null,
  setFolderSelected: folder => {
    set({ folderSelected: folder })
  },

  setFolderIdSelected: (id: number) => {
    const folders =
      (queryClient.getQueryState(['folders'])?.data as _Folder[]) || []
    const folderSelected = folders.find(folder => folder.id === id)
    set({ folderSelected })
  },
}))
