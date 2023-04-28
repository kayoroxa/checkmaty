import { AiOutlineCalendar } from 'react-icons/ai'
import { FaWindowClose } from 'react-icons/fa'
import { RiNumbersFill } from 'react-icons/ri'
import Modal from 'react-modal'
import Group from '../atoms/Group'
import { Task } from '../utils/types/_Task'

interface Props {
  children: React.ReactNode
  isOpen: boolean
  onRequestClose: () => void
  task: Task
}

export default function WrapperTaskModal({
  children,
  isOpen,
  onRequestClose,
  task,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-fit h-[90vh] max-h-[90vh] max-w-[90vw] mx-auto mt-10 dark:bg-slate-600 rounded-2xl dark:text-white overflow-hidden flex flex-col focus:outline-none"
      overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 flex justify-center items-center"
    >
      <header className="flex justify-end px-4 py-2 dark:bg-slate-700 bg-slate-300">
        <FaWindowClose
          size={30}
          className="dark:fill-white hover:fill-red-500 hover:cursor-pointer"
          onClick={() => onRequestClose()}
        />
      </header>
      <main className="border-t border-slate-500 flex flex-1 max-h-[90vh]">
        <section className="pt-5 pb-24 px-10 overflow-auto max-h-full">
          {children}
        </section>
        <section className="flex-1 bg-slate-700 p-6 min-w-[300px] flex flex-col gap-5">
          <Group title="Due date" category="Today">
            <AiOutlineCalendar size={20} className="fill-green-400" />
          </Group>
          <Group title="relevance" category={String(task.relevance || 0)}>
            <RiNumbersFill size={20} className="fill-yellow-400" />
          </Group>
          <Group title="simplicity" category={String(task.simplicity || 0)}>
            <RiNumbersFill size={20} className="fill-red-400" />
          </Group>
          <Group title="urgency" category={String(task.urgency || 0)}>
            <RiNumbersFill size={20} className="fill-blue-400 " />
          </Group>
          <h3>Show in dashboard</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </section>
      </main>
    </Modal>
  )
}
