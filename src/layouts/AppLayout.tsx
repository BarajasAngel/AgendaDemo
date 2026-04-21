import { Outlet } from 'react-router-dom'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { Toast } from '@/components/ui/Toast'
import { NotificationsProvider, useNotifications } from '@/features/notifications/context'
import { FavoritesProvider } from '@/features/favorites/context'

function AppShell() {
  const { unreadCount, toast, dismissToast } = useNotifications()

  return (
    <div className="flex flex-col min-h-dvh bg-slate-100">
      <TopBar unreadCount={unreadCount} />

      {toast && (
        <Toast
          title={toast.title}
          body={toast.body}
          type={toast.type}
          onDismiss={dismissToast}
        />
      )}

      <main className="flex-1 w-full max-w-3xl mx-auto pb-20 overflow-y-auto bg-slate-50">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}

export function AppLayout() {
  return (
    <NotificationsProvider>
      <FavoritesProvider>
        <AppShell />
      </FavoritesProvider>
    </NotificationsProvider>
  )
}
