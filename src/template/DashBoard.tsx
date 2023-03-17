import { ReactNode } from 'react'
import TodoItem from '../components/todo'

function Container({
  children,
  title,
  flex,
}: {
  children: ReactNode
  title?: string
  flex?: boolean
}) {
  return (
    <div>
      {title && <h1 className="text-xl mb-2 ml-2">{title}</h1>}
      <div
        className={`dark:bg-slate-800 flex-1 rounded-2xl w-full p-4 max-h-[50vh] flex-wrap flex  gap-6 ${
          flex ? 'flex' : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function Project({
  imgUrl,
  name,
  percent,
}: {
  imgUrl: string
  name: string
  percent: number
}) {
  return (
    <div className="w-[250px] bg-slate-700/50 p-6 flex flex-col gap-4  rounded-lg overflow-hidden">
      <header className="flex gap-5">
        <div className="w-[60px] h-[60px] rounded-xl overflow-hidden">
          <img
            src={imgUrl}
            alt=""
            className="object-cover m-h-full h-full m-w-full w-full"
          />
        </div>
        <h2 className="text-xl">{name}</h2>
      </header>
      <main>
        <h2>Daily goal: {percent ? percent * 100 : 0}%</h2>
        <div className="w-full bg-slate-600 rounded-lg overflow-hidden mt-2">
          <div
            style={{ width: percent ? percent * 100 + '%' : '0%' }}
            className={` h-2 ${percent >= 0.8 ? 'bg-green-500' : 'bg-red-500'}`}
          ></div>
        </div>
      </main>
    </div>
  )
}

export default function DashBoard() {
  const todo = {
    id: 1,
    text: 'Buy milk',
    description: 'Buy milk in restaurant',
  }
  const todo2 = {
    id: 1,
    text: 'Buy milk',
  }

  return (
    <div className="w-full flex flex-col min-h-screen max-h-screen overflow-hidden  dark:text-white">
      <header className="w-full px-8 py-2 dark:bg-slate-700  shadow-2xl flex justify-end items-center gap-3">
        <div className="-mt-2">
          <h1 className="text-xl">Caio Rocha</h1>
          <p className="text-sm">@kayoroxa</p>
        </div>
        <div className="w-[60px] h-[60px] rounded-xl overflow-hidden">
          <img
            src="https://avatars.githubusercontent.com/u/54248474?v=4"
            alt=""
            className="object-cover m-h-full h-full m-w-full w-full"
          />
        </div>
      </header>
      <main className="flex flex-1 dark:bg-slate-900">
        <section className="bg-blue dark:bg-slate-800">
          <div className="flex flex-col gap-2  py-4 min-w-[15vw] text-2xl">
            <a
              href=""
              className="dark:bg-blue-900/50 dark:hover:bg-slate-700/80 px-5 py-2"
            >
              dashboard
            </a>
            <a href="" className="dark:hover:bg-slate-700/80 px-5 py-2">
              projects
            </a>
            <a href="" className="dark:hover:bg-slate-700/80 px-5 py-2">
              settings
            </a>
          </div>
        </section>
        <section className="flex w-full max-h-screen p-6 pb-28 gap-6 flex-col  overflow-auto">
          <Container title="Projects:" flex={true}>
            <Project
              imgUrl="https://s3-symbol-logo.tradingview.com/amazon--600.png"
              name="Amazon"
              percent={0.5}
            />
            <Project
              imgUrl="https://www.nike.com.br/images/meta/open-graph-main-image.jpg"
              name="Nike"
              percent={0.8}
            />
            <Project
              imgUrl="https://img.icons8.com/color/512/google-logo.png"
              name="Google"
              percent={0.4}
            />
          </Container>
          <Container title="Todo:">
            <TodoItem todo={todo} onToggle={() => {}} />
            <TodoItem todo={todo2} onToggle={() => {}} />
            <TodoItem todo={todo} onToggle={() => {}} />
            <TodoItem todo={todo} onToggle={() => {}} />
            <TodoItem todo={todo2} onToggle={() => {}} />
            <TodoItem todo={todo} onToggle={() => {}} />
            <TodoItem todo={todo2} onToggle={() => {}} />
          </Container>
          <Container title="Done Today:">
            <TodoItem todo={todo} onToggle={() => {}} />
            <TodoItem todo={todo2} onToggle={() => {}} />
            <TodoItem todo={todo2} onToggle={() => {}} />
            <TodoItem todo={todo2} onToggle={() => {}} />
            <TodoItem todo={todo2} onToggle={() => {}} />
            <TodoItem todo={todo2} onToggle={() => {}} />
            <TodoItem todo={todo2} onToggle={() => {}} />
            <TodoItem todo={todo} onToggle={() => {}} />
          </Container>
        </section>
      </main>
    </div>
  )
}
