import type { NextPage } from 'next'
import DashBoard from '../template/DashBoard'

const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: '359051936857588309' }),
}

const Home: NextPage = () => {
  // const todo = { id: 1, text: 'Buy milk' }
  // const { isLoading, error, data } = useQuery(['tasks'], () =>
  //   fetch('http://localhost:3000/api/tasks', options).then(res => res.json())
  // )

  // console.log(data)

  return <DashBoard />
}

export default Home
