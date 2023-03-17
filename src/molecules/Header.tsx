export default function Header() {
  return (
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
  )
}
