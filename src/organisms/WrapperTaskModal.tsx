import { AiOutlineCalendar } from 'react-icons/ai'
import { FaWindowClose } from 'react-icons/fa'
import { RiNumbersFill } from 'react-icons/ri'
import Modal from 'react-modal'
import Group from '../atoms/Group'

interface Props {
  children: React.ReactNode
  isOpen: boolean
  onRequestClose: () => void
}

export default function WrapperTaskModal({
  children,
  isOpen,
  onRequestClose,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-fit h-[90vh] max-h-[90vh] max-w-[90vw] mx-auto mt-10 dark:bg-slate-600 rounded-2xl dark:text-white overflow-hidden flex flex-col"
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
          <Group title="relevance" category="5">
            <RiNumbersFill size={20} className="fill-yellow-400" />
          </Group>
          <Group title="simplicity" category="10">
            <RiNumbersFill size={20} className="fill-red-400" />
          </Group>
          <Group title="urgency" category="2">
            <RiNumbersFill size={20} className="fill-blue-400 " />
          </Group>
        </section>
      </main>
    </Modal>
  )
}
