import {
  Bell, BellOff, BellRing, CheckCheck, CheckCircle,
  AlertTriangle, Info, Circle, Dot, Sparkles, ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { useNotifications } from '@/features/notifications/context'
import { isSupported } from '@/features/notifications/api'
import { formatRelative, cn } from '@/lib/utils'
import type { NotificationType, NotificationItem } from '@/types'

// ─── Type config ──────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<NotificationType, {
  icon: typeof Bell
  label: string
  dotColor: string
  badgeVariant: 'default' | 'success' | 'warning' | 'danger'
}> = {
  info: { icon: Info, label: 'Info', dotColor: 'bg-slate-400', badgeVariant: 'default' },
  success: { icon: CheckCircle, label: 'Éxito', dotColor: 'bg-emerald-500', badgeVariant: 'success' },
  warning: { icon: AlertTriangle, label: 'Aviso', dotColor: 'bg-amber-500', badgeVariant: 'warning' },
  error: { icon: AlertTriangle, label: 'Error', dotColor: 'bg-red-500', badgeVariant: 'danger' },
}

// ─── Permission status card ────────────────────────────────────────────────────

function PermissionCard() {
  const { permission, requestPermission, sendDemo, unreadCount } = useNotifications()
  const supported = isSupported()

  return (
    <Card className="mb-5 overflow-hidden border-slate-200 bg-gradient-to-br from-white via-white to-amber-50/70">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="section-title mb-1">Demo en vivo</p>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">Centro de avisos</h2>
        </div>
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-card">
          <BellRing size={21} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-amber-500 px-1.5 py-0.5 text-center text-[10px] font-bold leading-none text-white ring-2 ring-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Status row */}
      <div className="flex items-start gap-3 mb-4 rounded-2xl border border-slate-100 bg-white/80 p-3">
        <div className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
          permission === 'granted' ? 'bg-emerald-100' :
          permission === 'denied' ? 'bg-red-100' :
          !supported ? 'bg-slate-100' : 'bg-amber-100'
        )}>
          {permission === 'granted' ? (
            <BellRing size={18} className="text-emerald-600" />
          ) : permission === 'denied' ? (
            <BellOff size={18} className="text-red-500" />
          ) : (
            <Bell size={18} className="text-amber-600" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">
            {!supported
              ? 'Notificaciones no soportadas'
              : permission === 'granted'
              ? 'Notificaciones activadas'
              : permission === 'denied'
              ? 'Permiso denegado'
              : 'Notificaciones del navegador'}
          </p>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
            {!supported
              ? 'Tu navegador no soporta la Web Notifications API. Las notificaciones internas siguen disponibles.'
              : permission === 'granted'
              ? 'El navegador mostrará notificaciones nativas cuando la app no esté en primer plano.'
              : permission === 'denied'
              ? 'Permiso denegado en el navegador. Reactívalo desde la configuración del sitio.'
              : 'Activa las notificaciones del navegador para recibirlas también fuera de la app.'}
          </p>
        </div>
      </div>

      {/* Status badge */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">Estado:</span>
        <Badge variant={
          permission === 'granted' ? 'success' :
          permission === 'denied' ? 'danger' :
          !supported ? 'default' : 'warning'
        }>
          {!supported ? 'No disponible' :
           permission === 'granted' ? 'Activadas' :
           permission === 'denied' ? 'Denegadas' : 'Sin configurar'}
        </Badge>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 shadow-card">
          {unreadCount} sin leer
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          onClick={sendDemo}
          className="btn-accent w-full justify-center py-3 text-[15px] shadow-card-hover"
        >
          <Sparkles size={16} />
          Probar notificación
        </button>

        {supported && permission !== 'granted' && permission !== 'denied' && (
          <button
            onClick={requestPermission}
            className="btn-secondary w-full justify-center"
          >
            <Bell size={15} />
            Solicitar permiso del navegador
          </button>
        )}

        {!supported && (
          <p className="text-[11px] text-slate-400 text-center">
            Sin soporte nativo — notificaciones registradas internamente
          </p>
        )}
        {permission === 'denied' && (
          <p className="text-[11px] text-slate-400 text-center">
            Para reactivar: Configuración del navegador → Privacidad → Notificaciones
          </p>
        )}
      </div>
    </Card>
  )
}

// ─── Notification item ────────────────────────────────────────────────────────

function NotifItem({ item, onMarkRead }: { item: NotificationItem; onMarkRead: () => void }) {
  const { icon: TypeIcon, dotColor, badgeVariant, label } = TYPE_CONFIG[item.type]

  return (
    <div className={cn(
      'flex items-start gap-3 px-4 py-3.5 border-b border-slate-50 last:border-0 transition-colors',
      !item.read ? 'bg-amber-50/45' : 'bg-white hover:bg-slate-50/70'
    )}>
      {/* Type icon + unread dot */}
      <div className="relative shrink-0">
        <div className={cn(
          'w-9 h-9 rounded-xl flex items-center justify-center',
          item.read ? 'bg-slate-100' : 'bg-white border border-slate-200 shadow-sm'
        )}>
          <TypeIcon size={16} className={item.read ? 'text-slate-400' : 'text-slate-600'} />
        </div>
        {!item.read && (
          <div className={cn(
            'absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white',
            dotColor
          )} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <p className={cn(
            'text-sm leading-snug',
            item.read ? 'font-normal text-slate-600' : 'font-semibold text-slate-900'
          )}>
            {item.title}
          </p>
          <Badge variant={badgeVariant} className="shrink-0 mt-0.5 hidden sm:flex">
            {label}
          </Badge>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{item.body}</p>
        <div className="mt-2 flex items-center gap-2">
          <p className="text-[10px] font-medium text-slate-400">{formatRelative(item.timestamp)}</p>
          {item.action && (
            <>
              <span className="h-1 w-1 rounded-full bg-slate-200" />
              <Link
                to={item.action.path}
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 hover:text-amber-800"
              >
                {item.action.label}
                <ArrowRight size={10} />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mark read action */}
      {!item.read && (
        <button
          onClick={onMarkRead}
          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors mt-1"
          title="Marcar como leída"
          aria-label="Marcar notificación como leída"
        >
          <Circle size={14} />
        </button>
      )}
      {item.read && (
        <div className="shrink-0 w-7 h-7 flex items-center justify-center mt-1">
          <Dot size={14} className="text-slate-200" />
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Notifications() {
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications()

  return (
    <div className="px-4 pt-5 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Notificaciones</h1>
            {unreadCount > 0 && (
              <span className="min-w-6 rounded-full bg-amber-500 px-2 py-0.5 text-center text-[11px] font-bold text-white shadow-card">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Avisos operativos y actualizaciones importantes</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors py-1 px-2 rounded-lg hover:bg-slate-100"
          >
            <CheckCheck size={13} />
            Marcar todas
          </button>
        )}
      </div>

      {/* Permission + demo control */}
      <PermissionCard />

      {/* Notification center */}
      <div className="mb-3 flex items-center justify-between">
        <span className="section-title">Centro de notificaciones</span>
        <span className="text-[10px] font-medium text-slate-400">{notifications.length} avisos</span>
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="Sin notificaciones"
          description="Las notificaciones que recibas aparecerán aquí"
        />
      ) : (
        <Card className="p-0 overflow-hidden divide-y divide-slate-50">
          {notifications.map(n => (
            <NotifItem
              key={n.id}
              item={n}
              onMarkRead={() => markAsRead(n.id)}
            />
          ))}
        </Card>
      )}
    </div>
  )
}
