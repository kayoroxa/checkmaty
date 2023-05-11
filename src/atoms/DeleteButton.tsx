export default function ActionButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-600/50 flex-1 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Save Task
    </button>
  )
}
