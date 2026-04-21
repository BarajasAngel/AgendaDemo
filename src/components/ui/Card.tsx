import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
  onClick?: () => void
}

export function Card({ children, className, interactive, onClick }: CardProps) {
  if (interactive || onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn('card-interactive text-left w-full', className)}
      >
        {children}
      </button>
    )
  }
  return (
    <div className={cn('card', className)}>
      {children}
    </div>
  )
}
