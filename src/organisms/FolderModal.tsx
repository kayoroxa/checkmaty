import ButtonOp from '../atoms/ButtonOp'
import Input from '../atoms/Input'
import TodoItem from '../components/todo'
import { useFolder } from '../hooks/useFolder'
import { useFolderStore } from '../store/useFolderStore'
import { Folder } from '../utils/types/_Folder'
import WrapperTaskModal from './WrapperTaskModal'

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void
  folder?: Folder
}

// Modal.setAppElement('#root')

function FolderModal({ ...wrapperProps }: Props) {
  // const [isOpen, setIsOpen] = useState(initialIsOpen)
  const { folderSelected: folder, setFolderSelected } = useFolderStore()

  // const { folders: subfolders } = useFolders('64de7201df61c3c518e7a83b')
  const { updateFolder, createStepTask, stepTasks, deleteFolder } = useFolder(
    folder?.id
  )

  if (!folder) return null

  return (
    <WrapperTaskModal
      // isOpen={folder ? true : false}
      isOpen={true}
      onRequestClose={() => {
        setFolderSelected(null)
      }}
      onDelete={() => {
        deleteFolder()
      }}
      task={{
        title: folder.title,
        description: folder.description,
        id: folder.id,
        inMainView: folder.tasksInMainView || false,
        urgency: folder.urgency || 0,
        relevance: folder.relevance || 0,
      }}
      onChange={props =>
        updateFolder({ id: props.id, updatedFolder: props.updateData })
      }
    >
      <header className="flex items-center justify-start gap-2">
        <section className="w-full flex gap-3">
          <div className="text-3xl">📂</div>
          <Input
            onValueChange={newValue => {
              updateFolder({
                id: folder.id,
                updatedFolder: { title: newValue },
              })
            }}
            value={folder.title}
            className="text-3xl font-medium mb-4 w-full break-all"
          />
          <Input
            onValueChange={newValue => {
              updateFolder({
                id: folder.id,
                updatedFolder: { description: newValue },
              })
            }}
            value={folder.description}
            className="text-lg mb-4  w-full"
          />
        </section>
      </header>

      <ButtonOp
        title="Add StepTask"
        onClick={async () => {
          await createStepTask({
            title: 'New Step Task',
            description: '',
            done: false,
            folder_id: folder.id,
            createdByUserId: '64de7201df61c3c518e7a83b',
            createdAt: new Date(),
            doneDate: null,
            dueDate: null,
            inMainView: null,
            is_recurring: false,
            relevance: 0,
            simplicity: 0,
            urgency: 0,
            updatedAt: new Date(),
            project_id: null,
            parentId: null,
          })
        }}
      />
      {stepTasks && (
        <div className="border-t border-gray-200 mt-4 pt-4">
          <h3 className="text-2xl font-medium mb-2">StepTasks:</h3>
          <ul className="list-disc pl-4 flex flex-col gap-4 w-full">
            {stepTasks.map((stepTask, i) => (
              <TodoItem
                key={stepTask.id || i}
                todo={stepTask}
                onToggle={() => {}}
              />
            ))}
          </ul>
        </div>
      )}
    </WrapperTaskModal>
  )
}

export default FolderModal
