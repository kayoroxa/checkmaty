import {
  InputHTMLAttributes,
  LiHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onValueChange?: (e: string) => void
  showBackground?: boolean
}

export default function Input({
  value,
  onValueChange,
  showBackground,
  ...props
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value || ''
    }
  }, [value])

  return (
    <div>
      <input
        {...props}
        ref={inputRef}
        type="text"
        className={`${
          showBackground
            ? 'bg-gray-200 dark:bg-slate-600 p-2 rounded'
            : 'bg-transparent'
        } ${props.className ? props.className : ''}`}
        defaultValue={value || ''}
        onBlur={e => {
          onValueChange && onValueChange(e.currentTarget.value)
          props.onBlur && props.onBlur(e)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' && onValueChange) {
            onValueChange(e.currentTarget.value)
            e.currentTarget.blur()
          }
        }}
        onClick={e => {
          e.stopPropagation()
          props.onClick && props.onClick(e)
        }}
        onFocus={e => {
          e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)
        }}
      />
    </div>
  )
}

interface PropsWrapper extends LiHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[]
  inputValue?: string
  onInputValueChange: (e: string) => void
}

export function WrapperInput({
  children,
  inputValue,
  onInputValueChange,
  ...props
}: PropsWrapper) {
  const [showInput, setShowInput] = useState<boolean>(false)

  return (
    <div
      className="relative"
      style={{ width: 'inherit', height: 'inherit' }}
      onClick={() => setShowInput(prev => !prev)}
      {...props}
    >
      {children}
      {showInput && (
        <div className="absolute z-10 bottom-5 right-5">
          <Input
            showBackground={true}
            value={inputValue}
            // autoFocus={true}
            onValueChange={text => {
              onInputValueChange(text)
              setShowInput(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
