import {
  createContext, useContext, useCallback, useEffect, useState,
  type ReactNode,
} from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { mockNotifications } from '@/data/mock/notifications'
import * as NotifAPI from './api'
import { nextDemoNotification } from './demoPool'
import { generateId } from '@/lib/utils'
import type { NotificationItem } from '@/types'
import type { PermissionState } from './api'

const LS_KEY = 'sa_notifications_v1'

interface NotificationsContextValue {
  notifications: NotificationItem[]
  unreadCount: number
  permission: PermissionState
  toast: NotificationItem | null
  requestPermission: () => Promise<void>
  sendDemo: () => void
  markAsRead: (id: string) => void
  markAllRead: () => void
  dismissToast: () => void
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null)

function getInitialNotifications(): NotificationItem[] {
  try {
    const stored = localStorage.getItem(LS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as NotificationItem[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return mockNotifications
}

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useLocalStorage<NotificationItem[]>(
    LS_KEY,
    getInitialNotifications()
  )
  const [permission, setPermission] = useState<PermissionState>(NotifAPI.getPermission)
  const [toast, setToast] = useState<NotificationItem | null>(null)

  // Sync permission state if browser changes it externally
  useEffect(() => {
    setPermission(NotifAPI.getPermission())
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const addNotification = useCallback((item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: generateId(),
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications(prev => [newNotif, ...prev])
    return newNotif
  }, [setNotifications])

  const requestPermission = useCallback(async () => {
    const result = await NotifAPI.requestPermission()
    setPermission(result)
  }, [])

  const sendDemo = useCallback(() => {
    const demo = nextDemoNotification()
    const notif = addNotification({ title: demo.title, body: demo.body, type: demo.type })

    if (permission === 'granted') {
      // Fire native browser notification
      NotifAPI.sendNativeNotification(demo.title, { body: demo.body })
    } else {
      // Show in-app toast fallback
      setToast(notif)
      setTimeout(() => setToast(null), 5000)
    }
  }, [permission, addNotification])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }, [setNotifications])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [setNotifications])

  const dismissToast = useCallback(() => setToast(null), [])

  return (
    <NotificationsContext.Provider value={{
      notifications,
      unreadCount,
      permission,
      toast,
      requestPermission,
      sendDemo,
      markAsRead,
      markAllRead,
      dismissToast,
    }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications(): NotificationsContextValue {
  const ctx = useContext(NotificationsContext)
  if (!ctx) throw new Error('useNotifications must be used inside NotificationsProvider')
  return ctx
}
