import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../pages/_app'
import { axiosApi } from '../utils/axiosApi'
import { StepTask, StepTaskCreate } from '../utils/types/_StepTask'

function get(url: string, user_id: string, key: string | string[]) {
  return useQuery<StepTask[]>(
    key,
    async () => {
      const { data } = await axiosApi.get<StepTask[]>(url)
      return data
    },
    {
      staleTime: 1000 * 60 * 2,
      enabled: !!user_id,
    }
  )
}

export const useStepTasks = (user_id: string, options?: Partial<StepTask>) => {
  const optionsQuery =
    options &&
    Object.entries(options)
      .map(([key, value]) => {
        // if (value === null) return `${key}_null`
        return `${key}=${value}`
      })
      .join('&')

  const {
    data: stepTasks,
    isLoading: isStepTasksLoading,
    isError: isStepTasksError,
    error: stepTasksError,
  } = optionsQuery
    ? get(`/stepTasks?${optionsQuery}`, user_id, ['stepTasks', optionsQuery])
    : get(`/stepTasks`, user_id, ['stepTasks'])

  const {
    mutate: createStepTask,
    isLoading: isCreateStepTaskLoading,
    isError: isCreateStepTaskError,
    error: createStepTaskError,
  } = useMutation(
    async (newStepTask: StepTaskCreate) => {
      const { data } = await axiosApi.post<StepTask>('/stepTasks', newStepTask)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks')
        queryClient.invalidateQueries(['stepTasks'])
      },
    }
  )

  async function fetchUpdate(props: {
    id: number
    updatedStepTask: Partial<StepTask>
  }) {
    const { id, updatedStepTask } = props
    const { data } = await axiosApi.patch<StepTask>(
      `/stepTasks/${id}`,
      updatedStepTask
    )
    return data
  }

  const {
    mutate: updateStepTask,
    isLoading: isUpdateStepTaskLoading,
    isError: isUpdateStepTaskError,
    error: updateStepTaskError,
  } = useMutation(fetchUpdate, {
    onSuccess: stepTask => {
      queryClient.invalidateQueries([
        'stepTasks',
        `parentId=${stepTask.folder_id}`,
      ])
      queryClient.invalidateQueries('stepTasks')
    },
  })

  const {
    mutate: deleteStepTask,
    isLoading: isDeleteStepTaskLoading,
    isError: isDeleteStepTaskError,
    error: deleteStepTaskError,
  } = useMutation(
    async (stepTaskId: string) => {
      const { data } = await axiosApi.delete(`/stepTasks/${stepTaskId}`)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('stepTasks')
      },
    }
  )

  return {
    stepTasks,
    isStepTasksLoading,
    isStepTasksError,
    stepTasksError,
    createStepTask,
    isCreateStepTaskLoading,
    isCreateStepTaskError,
    createStepTaskError,
    updateStepTask,
    isUpdateStepTaskLoading,
    isUpdateStepTaskError,
    updateStepTaskError,
    deleteStepTask,
    isDeleteStepTaskLoading,
    isDeleteStepTaskError,
    deleteStepTaskError,
  }
}
