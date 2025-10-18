import * as React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export function Button({ label, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid #ddd',
        background: '#f7f7f7'
      }}
    >
      {label}
    </button>
  )
}
