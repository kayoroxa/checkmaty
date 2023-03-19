export default function Group({
  children,
  title,
  category,
}: {
  children: React.ReactNode
  title: string
  category: string
}) {
  return (
    <div className="border-b border-slate-500">
      <h2>{title}</h2>
      <div className="flex items-center gap-1 pb-3 pt-2">
        {children}
        <h3 contentEditable={true} className="w-full">
          {category}
        </h3>
      </div>
    </div>
  )
}
