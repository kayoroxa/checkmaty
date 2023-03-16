import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useQuery } from 'react-query'
import TodoItem from '../components/todo'

const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: '359051936857588309' }),
}

const Home: NextPage = () => {
  const todo = { id: 1, text: 'Buy milk' }
  const { isLoading, error, data } = useQuery(['tasks'], () =>
    fetch('http://localhost:3000/api/tasks', options).then(res => res.json())
  )

  console.log(data)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1>My Todo</h1>
        <TodoItem todo={todo} onToggle={() => {}} />
        <TodoItem todo={todo} onToggle={() => {}} />
        <TodoItem todo={todo} onToggle={() => {}} />
        <TodoItem todo={todo} onToggle={() => {}} />
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
