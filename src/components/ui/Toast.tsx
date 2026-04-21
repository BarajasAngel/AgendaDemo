import { X, Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NotificationType } from '@/types'

interface ToastProps {
  title: string
  body: string
  type: NotificationType
  onDismiss: () => void
}

const TYPE_CONFIG: Record<NotificationType, {
  icon: typeof Bell
  accent: string
  ring: string
  iconColor: string
}> = {
  info: { icon: Info, accent: 'bg-slate-500', ring: 'ring-slate-200', iconColor: 'text-slate-600' },
  success: { icon: CheckCircle, accent: 'bg-emerald-500', ring: 'ring-emerald-200', iconColor: 'text-emerald-600' },
  warning: { icon: AlertTriangle, accent: 'bg-amber-500', ring: 'ring-amber-200', iconColor: 'text-amber-600' },
  error: { icon: AlertTriangle, accent: 'bg-red-500', ring: 'ring-red-200', iconColor: 'text-red-600' },
}

export function Toast({ title, body, type, onDismiss }: ToastProps) {
  const { icon: Icon, accent, ring, iconColor } = TYPE_CONFIG[type]

  return (
    <div className={cn(
      'fixed top-16 left-4 right-4 z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4',
      'shadow-xl shadow-slate-900/12 animate-slide-down sm:left-1/2 sm:right-auto sm:w-[420px] sm:-translate-x-1/2'
    )}>
      <div className={cn('absolute inset-y-0 left-0 w-1', accent)} />
      <div className="flex items-start gap-3">
        <div className={cn('shrink-0 mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white ring-1', ring, iconColor)}>
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-0.5 flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Notificación demo</span>
            <span className="h-1 w-1 rounded-full bg-amber-500" />
            <span className="text-[10px] font-medium text-slate-400">Ahora</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 leading-snug">{title}</p>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{body}</p>
        </div>
        <button
          onClick={onDismiss}
          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Cerrar notificación"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  )
}
