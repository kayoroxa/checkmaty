import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { axiosApi } from '../utils/axiosApi'
import { Task } from '../utils/types/_Task'

export const useTasks = (userId: string) => {
  const tasksUrl = `/tasks?inMainView=true`
  // const tasksUrl = `/api/tasks`

  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
  } = useQuery<Task[]>(
    'tasks',
    async () => {
      const { data } = await axiosApi.get<Task[]>(tasksUrl)
      debugger
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
      const { data } = await axiosApi.post<Task>('/tasks', newTask)
      return data
    },
    {
      onSuccess: data => {
        // This function is called if the mutation is successful
        // You can do things like updating your cache here
      },
    }
  )

  async function fetchUpdate(props: {
    id: string
    updatedTask: Partial<Task>
  }) {
    const { id, updatedTask } = props
    const { data } = await axiosApi.patch<Task>(`/tasks/${id}`, updatedTask)
    return data
  }

  const {
    mutate: updateTask,
    isLoading: isUpdateTaskLoading,
    isError: isUpdateTaskError,
    error: updateTaskError,
  } = useMutation(fetchUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
    },
  })

  const {
    mutate: deleteTask,
    isLoading: isDeleteTaskLoading,
    isError: isDeleteTaskError,
    error: deleteTaskError,
  } = useMutation(
    async (taskId: string) => {
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
