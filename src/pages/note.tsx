import { useQuery } from 'react-query'
import WrapperApp from '../organisms/WrapperApp'
import { axiosApi } from '../utils/axiosApi'

export default function Note() {
  const { data } = useQuery<{ text: string }>(
    'note',
    async () => {
      const { data } = await axiosApi.get<{ text: string }>('/notes/1')
      return data
    },
    {
      staleTime: 1000 * 60 * 3,
    }
  )
  return (
    <WrapperApp>
      {/* {JSON.stringify(data)} */}
      <h1 className="text-4xl">My Note</h1>
      <textarea
        name=""
        id=""
        className="dark:bg-slate-600 dark:text-white p-3 text-2xl h-full focus:outline-none"
        defaultValue={data?.text}
        onBlur={e => {
          // fetch
          fetch('http://localhost:4444/notes/1', {
            method: 'PUT',
            body: JSON.stringify({ text: 'Caio' }),
          })
        }}
      ></textarea>
    </WrapperApp>
  )
}
