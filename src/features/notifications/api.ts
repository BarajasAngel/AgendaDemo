/**
 * Web Notifications API wrapper.
 * All browser interaction isolated here — easy to swap for real push later.
 */

export type PermissionState = NotificationPermission | 'unsupported'

export function isSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window
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

export function sendNativeNotification(
  title: string,
  options: { body: string; icon?: string; tag?: string }
): void {
  if (!isSupported() || Notification.permission !== 'granted') return
  try {
    new Notification(title, {
      body: options.body,
      icon: options.icon ?? '/favicon.svg',
      tag: options.tag,
    })
  } catch {
    // Safari or restricted context — silently fail
  }
}
