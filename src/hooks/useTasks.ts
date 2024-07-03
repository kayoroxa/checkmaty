import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { useTaskStore } from '../store/useTaskStore'
import { axiosNextApi } from '../utils/axiosApi'
import { StepTask } from '../utils/types/_StepTask'
import { Task, TaskCreate } from '../utils/types/_Task'

function get(url: string, user_id: string, key: string | string[]) {
  return useQuery<Task[]>(
    key,
    async () => {
      const { data } = await axiosNextApi.get<Task[]>(url)
      return data
    },
    {
      staleTime: 1000 * 60 * 3,
      enabled: !!user_id,
    }
  )
}

export const useTasks = (user_id: string, options?: Partial<Task>) => {
  const optionsQuery =
    options &&
    Object.entries(options)
      .map(([key, value]) => {
        // if (value === null) return `${key}_null`
        return `${key}=${value}`
      })
      .join('&')

  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
  } = optionsQuery
    ? get(`/tasks?${optionsQuery}`, user_id, ['tasks', optionsQuery])
    : get(`/tasks`, user_id, ['tasks'])

  const {
    setTaskSelected,
    taskSelected,
    setTaskIdSelected,
    setTaskSelectedHistoric,
  } = useTaskStore()

  const {
    mutate: createTask,
    isLoading: isCreateTaskLoading,
    isError: isCreateTaskError,
    error: createTaskError,
  } = useMutation(
    async (newTask: TaskCreate) => {
      const { data } = await axiosNextApi.post<Task>('/tasks', newTask)
      return data
    },
    {
      onSuccess: task => {
        const isSubTask = typeof task?.parentId === 'string'
        if (isSubTask) {
          // queryClient.invalidateQueries('subTasks')
          queryClient.invalidateQueries(['tasks', `parentId=${task.parentId}`])
        } else {
          queryClient.invalidateQueries('tasks')
          queryClient.invalidateQueries(['stepTasks'])
        }
        setTaskSelected(task)
      },
    }
  )

  async function fetchUpdate(props: {
    id: Task['id']
    updatedTask: Partial<Task>
  }) {
    const { id, updatedTask } = props
    const { data } = await axiosNextApi.patch<Task>(`/tasks/${id}`, updatedTask)
    return data
  }

  const {
    mutate: updateTask,
    isLoading: isUpdateTaskLoading,
    isError: isUpdateTaskError,
    error: updateTaskError,
  } = useMutation(fetchUpdate, {
    onMutate: async updateData => {
      await queryClient.cancelQueries('tasks')
      await queryClient.cancelQueries(['stepTasks'])

      const previousTasks = queryClient.getQueryData<Task[]>('tasks')
      const previousStepTasks =
        queryClient.getQueryData<StepTask[]>('stepTasks')

      queryClient.setQueryData('tasks', (oldTasks: Task[] | undefined) => {
        if (!oldTasks) return []
        const newTasks = oldTasks.map(task => {
          if (task.id === updateData.id) {
            const newTask = {
              ...task,
              ...updateData.updatedTask,
              doneDate: new Date(),
            }
            return newTask
          }
          return task
        })
        return newTasks
      })

      queryClient.setQueryData(
        ['stepTasks'],
        (oldStepTasks: StepTask[] | undefined) => {
          if (!oldStepTasks) return []
          const newStepTasks = oldStepTasks.map((stepTask: StepTask) => {
            if (stepTask.id === updateData.id) {
              const newTask = {
                ...stepTask,
                ...updateData.updatedTask,
                doneDate: new Date(),
              }
              return newTask
            }
            return stepTask
          })
          return newStepTasks
        }
      )

      return { previousTasks, previousStepTasks }
    },
    onError: (_err, _updatedTask, context) => {
      queryClient.setQueryData('tasks', context?.previousTasks)
      queryClient.setQueryData(['stepTasks'], context?.previousStepTasks)
    },
    onSettled: (task, _error, _variable, _context) => {
      const isSubTask = typeof task?.parentId === 'string'

      if (isSubTask) {
        if (task.inMainView === undefined && !task.inMainView) {
          queryClient.invalidateQueries(['tasks', `parentId=${task.parentId}`])
        } else {
          queryClient.invalidateQueries(['tasks', `parentId=${task.parentId}`])
          queryClient.invalidateQueries('tasks')
        }
      } else {
        queryClient.invalidateQueries('tasks')
        queryClient.invalidateQueries(['stepTasks'])
      }
    },
    // onSuccess: (task, { updatedTask }) => {
    //   console.log('olá new', task)
    //   // const tasks = queryClient.getQueryData<Task[]>('tasks')
    //   // const stepTasks = queryClient.getQueryData<StepTask[]>('stepTasks')
    //   // console.log(
    //   //   'new-morph',
    //   //   tasks?.find(task => task.id === '6559b3df52f8145b03c00dab')
    //   // )
    //   // console.log(
    //   //   'new-morph-step',
    //   //   stepTasks?.find(task => task.id === '6559b3df52f8145b03c00dab')
    //   // )
    // },
    // onSuccess: (task, { updatedTask }) => {
    //   const isSubTask = typeof task?.parentId === 'string'

    //   if (isSubTask) {
    //     if (updatedTask.inMainView === undefined && !task.inMainView) {
    //       queryClient.invalidateQueries(['tasks', `parentId=${task.parentId}`])
    //     } else {
    //       queryClient.invalidateQueries(['tasks', `parentId=${task.parentId}`])
    //       queryClient.invalidateQueries('tasks')
    //     }
    //   } else {
    //     queryClient.invalidateQueries('tasks')
    //     queryClient.invalidateQueries(['stepTasks'])
    //   }
    // },
  })

  const {
    mutate: deleteTask,
    isLoading: isDeleteTaskLoading,
    isError: isDeleteTaskError,
    error: deleteTaskError,
  } = useMutation(
    async (taskId: string) => {
      const { data } = await axiosNextApi.delete(`/tasks/${taskId}`)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks')
        queryClient.invalidateQueries(['stepTasks'])
        if (!taskSelected?.parentId) {
          setTaskSelected(null)
        } else {
          setTaskIdSelected(taskSelected?.parentId)
          setTaskSelectedHistoric(prev => {
            if (prev.length > 2) {
              return prev.slice(0, prev.length - 1)
            } else {
              return []
            }
          })
        }
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
