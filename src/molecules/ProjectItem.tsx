import Link from 'next/link'

export default function ProjectItem({
  imgUrl,
  name,
  percent,
  id,
}: {
  imgUrl: string
  name: string
  percent: number
  id: number
}) {
  return (
    <Link href={'/project/' + id}>
      <div className="w-[250px] bg-slate-700/80 p-6 flex flex-col gap-4  rounded-lg overflow-hidden hover:bg-blue-50 px-4 dark:hover:bg-slate-700/80">
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
              className={` h-2 ${
                percent >= 0.8 ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></div>
          </div>
        </main>
      </div>
    </Link>
  )
}
