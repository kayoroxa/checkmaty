import { useMutation, useQuery } from 'react-query'
import { axiosApi } from '../utils/axiosApi'
import { Task } from '../utils/types/_Task'

type Filter = {
  userId?: string
  inMainView?: boolean
  projectId?: number
  tagId?: string
}

export const useTasksIn = (userId: string, filter: Filter) => {
  const queryParams = Object.entries(filter)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  const tasksUrl = `/tasks?${queryParams}`
  // const tasksUrl = `/api/tasks`

  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
  } = useQuery<Task[]>(
    ['tasks', queryParams],
    async () => {
      const { data } = await axiosApi.get<Task[]>(tasksUrl)
      return data
    },
    {
      staleTime: 1000 * 60 * 2,
      enabled: !!userId,
    }
  )

  const {
    mutate: createTask,
    isLoading: isCreateTaskLoading,
    isError: isCreateTaskError,
    error: createTaskError,
  } = useMutation(
    async (newTask: Task) => {
      const { data } = await axiosApi.post<Task>('/api/tasks', newTask)
      return data
    },
    {
      onSuccess: data => {
        // This function is called if the mutation is successful
        // You can do things like updating your cache here
      },
    }
  )

  const {
    mutate: updateTask,
    isLoading: isUpdateTaskLoading,
    isError: isUpdateTaskError,
    error: updateTaskError,
  } = useMutation(
    async (updatedTask: Task) => {
      const { data } = await axiosApi.put<Task>(
        `/api/tasks/${updatedTask.id}`,
        updatedTask
      )
      return data
    },
    {
      onSuccess: data => {
        // This function is called if the mutation is successful
        // You can do things like updating your cache here
      },
    }
  )

  const {
    mutate: deleteTask,
    isLoading: isDeleteTaskLoading,
    isError: isDeleteTaskError,
    error: deleteTaskError,
  } = useMutation(
    async (taskId: number) => {
      await axiosApi.delete(`/api/tasks/${taskId}`)
    },
    {
      onSuccess: () => {
        // This function is called if the mutation is successful
        // You can do things like updating your cache here
      },
    }
  )

  return {
    tasks,
    isTasksLoading,
    isTasksError,
    tasksError,
    createTask,
    isCreateTaskLoading,
    isCreateTaskError,
    createTaskError,
    updateTask,
    isUpdateTaskLoading,
    isUpdateTaskError,
    updateTaskError,
    deleteTask,
    isDeleteTaskLoading,
    isDeleteTaskError,
    deleteTaskError,
  }
}
