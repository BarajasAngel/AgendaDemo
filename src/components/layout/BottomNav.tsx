import { NavLink } from 'react-router-dom'
import {
  Home, Calendar, FileText, Bell, Star,
  Map, Users, BookOpen, MoreHorizontal
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const primaryNav = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/agenda', label: 'Agenda', icon: Calendar },
  { path: '/documentos', label: 'Docs', icon: FileText },
  { path: '/notificaciones', label: 'Avisos', icon: Bell },
  { path: '/mas', label: 'Más', icon: MoreHorizontal },
]

const moreNav = [
  { path: '/mapas', label: 'Mapas', icon: Map },
  { path: '/social', label: 'Social', icon: Users },
  { path: '/paginas', label: 'Páginas', icon: BookOpen },
  { path: '/favoritos', label: 'Favoritos', icon: Star },
]

export function BottomNav() {
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <>
      {/* More drawer overlay */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm"
          onClick={() => setMoreOpen(false)}
        />
      )}

      {/* More drawer */}
      <div
        id="more-navigation"
        className={cn(
        'fixed bottom-16 left-1/2 z-50 w-full max-w-3xl -translate-x-1/2 bg-white border-t border-slate-100 rounded-t-2xl shadow-lg transition-transform duration-200',
        moreOpen ? 'translate-y-0' : 'translate-y-[calc(100%+4rem)]'
      )}>
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <span className="section-title">Más secciones</span>
          <button onClick={() => setMoreOpen(false)} className="btn-ghost text-xs py-1 px-2">
            Cerrar
          </button>
        </div>
        <div className="grid grid-cols-4 gap-0 px-2 pb-4">
          {moreNav.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMoreOpen(false)}
              className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              {({ isActive }) => (
                <>
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center',
                    isActive ? 'bg-slate-900' : 'bg-slate-100'
                  )}>
                    <Icon size={18} className={isActive ? 'text-white' : 'text-slate-600'} />
                  </div>
                  <span className={cn(
                    'text-[10px] font-medium',
                    isActive ? 'text-slate-900' : 'text-slate-500'
                  )}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-3xl -translate-x-1/2 bg-white/95 backdrop-blur-sm shadow-nav">
        <div className="flex items-stretch" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {primaryNav.map(({ path, label, icon: Icon }) => {
            if (path === '/mas') {
              return (
                <button
                  key="mas"
                  type="button"
                  onClick={() => setMoreOpen(v => !v)}
                  className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[4rem]"
                  aria-expanded={moreOpen}
                  aria-controls="more-navigation"
                  aria-label="Abrir más secciones"
                >
                  <div className={cn(
                    'w-5 h-5 flex items-center justify-center transition-transform',
                    moreOpen && 'rotate-45'
                  )}>
                    <MoreHorizontal size={20} className={moreOpen ? 'text-slate-900' : 'text-slate-400'} />
                  </div>
                  <span className={cn(
                    'text-[10px] font-medium',
                    moreOpen ? 'text-slate-900' : 'text-slate-400'
                  )}>
                    {label}
                  </span>
                </button>
              )
            }

            return (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[4rem] transition-colors"
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      className={cn(
                        'transition-all duration-150',
                        isActive ? 'text-slate-900 scale-110' : 'text-slate-400'
                      )}
                      strokeWidth={isActive ? 2.5 : 1.75}
                    />
                    <span className={cn(
                      'text-[10px] font-medium transition-colors',
                      isActive ? 'text-slate-900' : 'text-slate-400'
                    )}>
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </>
  )
}
