import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantMap: Record<BadgeVariant, string> = {
  default: 'badge-default',
  primary: 'badge-primary',
  accent: 'badge-accent',
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(variantMap[variant], className)}>
      {children}
    </span>
  )
}
