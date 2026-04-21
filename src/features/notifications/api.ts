/**
 * Web Notifications API wrapper.
 * All browser interaction isolated here — easy to swap for real push later.
 */

export type PermissionState = NotificationPermission | 'unsupported'

export interface NotificationDemoDiagnostics {
  notificationApiAvailable: boolean
  serviceWorkerApiAvailable: boolean
  serviceWorkerRegistered: boolean
  serviceWorkerReady: boolean
  permission: PermissionState
}

export function isSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window
}

export function isServiceWorkerSupported(): boolean {
  return typeof navigator !== 'undefined' && 'serviceWorker' in navigator
}

export function getPermission(): PermissionState {
  if (!isSupported()) return 'unsupported'
  return Notification.permission
}

export async function requestPermission(): Promise<PermissionState> {
  if (!isSupported()) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  try {
    const result = await Notification.requestPermission()
    return result
  } catch {
    return 'denied'
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T | null> {
  return new Promise(resolve => {
    const timeout = window.setTimeout(() => resolve(null), timeoutMs)
    promise
      .then(value => resolve(value))
      .catch(() => resolve(null))
      .finally(() => window.clearTimeout(timeout))
  })
}

export async function getNotificationDemoDiagnostics(): Promise<NotificationDemoDiagnostics> {
  const notificationApiAvailable = isSupported()
  const serviceWorkerApiAvailable = isServiceWorkerSupported()
  const permission = getPermission()
  let serviceWorkerRegistered = false
  let serviceWorkerReady = false

  if (serviceWorkerApiAvailable) {
    const registration = await navigator.serviceWorker.getRegistration()
    serviceWorkerRegistered = Boolean(registration)

    const readyRegistration = await withTimeout(navigator.serviceWorker.ready, 1500)
    serviceWorkerReady = Boolean(readyRegistration)
  }

  console.info('[Notifications demo] Notification API disponible:', notificationApiAvailable)
  console.info('[Notifications demo] service worker registrado:', serviceWorkerRegistered)
  console.info('[Notifications demo] service worker ready:', serviceWorkerReady)
  console.info('[Notifications demo] permiso actual:', permission)

  return {
    notificationApiAvailable,
    serviceWorkerApiAvailable,
    serviceWorkerRegistered,
    serviceWorkerReady,
    permission,
  }
}

export async function sendServiceWorkerNotification(
  title: string,
  options: { body: string; icon?: string; tag?: string },
  diagnostics?: NotificationDemoDiagnostics
): Promise<boolean> {
  const currentDiagnostics = diagnostics ?? await getNotificationDemoDiagnostics()

  if (
    !currentDiagnostics.notificationApiAvailable ||
    !currentDiagnostics.serviceWorkerApiAvailable ||
    !currentDiagnostics.serviceWorkerReady ||
    currentDiagnostics.permission !== 'granted'
  ) {
    console.info('[Notifications demo] showNotification omitido: falta API, service worker o permiso')
    return false
  }

  try {
    const registration = await navigator.serviceWorker.ready

    await registration.showNotification(title, {
      body: options.body,
      icon: options.icon ?? '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: options.tag,
    })

    console.info('[Notifications demo] resultado de showNotification:', 'ok')
    return true
  } catch (error) {
    console.info('[Notifications demo] resultado de showNotification:', 'error', error)
    return false
  }
}
