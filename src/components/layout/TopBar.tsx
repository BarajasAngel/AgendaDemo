import { Bell, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

interface TopBarProps {
  unreadCount?: number
}

export function TopBar({ unreadCount = 0 }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-top">
      <div className="flex items-center justify-between px-4 h-14 w-full max-w-3xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
            <span className="text-white text-xs font-bold tracking-tight">SA</span>
          </div>
          <span className="font-semibold text-slate-900 text-[15px] tracking-tight">
            Sistema Agenda
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button className="btn-icon" aria-label="Buscar">
            <Search size={18} />
          </button>

          <Link
            to="/notificaciones"
            className="btn-icon relative"
            aria-label={`Notificaciones${unreadCount > 0 ? ` (${unreadCount} no leídas)` : ''}`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-amber-500 rounded-full flex items-center justify-center px-1">
                <span className="text-white text-[9px] font-bold leading-none">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </span>
            )}
          </Link>

          <button className="avatar w-8 h-8 text-xs ml-1 bg-slate-900 text-white" aria-label="Perfil">
            JG
          </button>
        </div>
      </div>
    </header>
  )
}
