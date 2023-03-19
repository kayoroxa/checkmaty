export default function SquareImg({
  src,
  size,
}: {
  src: string
  size?: number
}) {
  return (
    <div
      style={{
        width: size ? size + 'px' : '60px',
        height: size ? size + 'px' : '60px',
      }}
      className="rounded-xl overflow-hidden z-10"
    >
      <img
        src={src}
        alt=""
        className="object-cover min-h-full h-full min-w-full w-full "
      />
    </div>
  )
}
