import { cn } from '@/lib/utils'

interface AvatarProps {
  initials: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
}

export function Avatar({ initials, size = 'md', className }: AvatarProps) {
  return (
    <div className={cn('avatar', sizeMap[size], className)}>
      {initials}
    </div>
  )
}
