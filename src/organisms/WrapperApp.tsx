import { ReactNode } from 'react'
import Header from '../molecules/Header'
import SideBar from '../molecules/SideBar'

export default function WrapperApp({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col min-h-screen max-h-screen overflow-hidden  dark:text-white">
      <Header />
      <main className="flex flex-1 dark:bg-slate-800">
        <section className="bg-blue dark:bg-slate-700/50 shadow-xl">
          <SideBar />
        </section>
        <section className="flex w-full max-h-screen p-6 pb-28 gap-6 flex-col  overflow-auto">
          {children}
        </section>
      </main>
    </div>
  )
}
