import { InputHTMLAttributes, useEffect, useRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onValueChange?: (e: string) => void
}

export default function Input({ value, onValueChange, ...props }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value || ''
    }
  }, [value])

  return (
    <input
      {...props}
      ref={inputRef}
      type="text"
      style={{ background: 'transparent' }}
      defaultValue={value || ''}
      onBlur={e => onValueChange && onValueChange(e.currentTarget.value)}
      onKeyDown={e => {
        if (e.key === 'Enter' && onValueChange) {
          onValueChange(e.currentTarget.value)
          e.currentTarget.blur()
        }
      }}
    />
  )
}
