import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onValueChange?: (e: string) => void
}

export default function Input({ value, onValueChange, ...props }: InputProps) {
  return (
    <input
      {...props}
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
