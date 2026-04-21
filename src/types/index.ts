// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  id: string
  label: string
  path: string
  icon: string
}

// ─── Agenda ───────────────────────────────────────────────────────────────────

export type EventCategory = 'reunion' | 'evento' | 'capacitacion' | 'webinar' | 'otro'

export interface AgendaEvent {
  id: string
  title: string
  description: string
  date: string          // ISO: 'YYYY-MM-DD'
  time: string          // '09:00'
  endTime?: string      // '10:30'
  location: string
  locationDetail?: string
  category: EventCategory
  attendees?: number
  organizer?: string
  tags?: string[]
  isFeatured?: boolean
}

// ─── Documents ────────────────────────────────────────────────────────────────

export type DocCategory = 'reporte' | 'circular' | 'manual' | 'politica' | 'otro'
export type DocFileType = 'pdf' | 'docx' | 'xlsx' | 'pptx'

export interface DocumentItem {
  id: string
  title: string
  description?: string
  category: DocCategory
  date: string          // 'YYYY-MM-DD'
  size: string          // '2.4 MB'
  fileType: DocFileType
  author?: string
  downloads?: number
  isFeatured?: boolean
}

// ─── Info Pages ───────────────────────────────────────────────────────────────

export type PageCategory = 'institucional' | 'normativa' | 'beneficios' | 'noticias' | 'otro'

export interface InfoPage {
  id: string
  title: string
  excerpt: string
  content: string       // HTML string (safe static mock)
  category: PageCategory
  date: string
  author?: string
  readTime?: number     // minutes
  isFeatured?: boolean
}

// ─── Notifications ────────────────────────────────────────────────────────────

export type NotificationType = 'info' | 'warning' | 'success' | 'error'

export interface NotificationItem {
  id: string
  title: string
  body: string
  timestamp: string     // ISO datetime
  read: boolean
  type: NotificationType
  action?: {
    label: string
    path: string
  }
}

// ─── Map Locations ────────────────────────────────────────────────────────────

export type LocationCategory = 'oficina' | 'evento' | 'socio' | 'servicio'

export interface LocationItem {
  id: string
  name: string
  address: string
  colonia?: string
  city: string
  phone?: string
  hours?: string
  category: LocationCategory
  distance?: string
  mapUrl?: string       // google maps link (static)
  description?: string
}

// ─── Social ───────────────────────────────────────────────────────────────────

export type SocialPlatform = 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'tiktok'

export interface SocialLinkItem {
  id: string
  platform: SocialPlatform
  handle: string
  displayName: string
  followers?: string
  description?: string
  url: string
  verified?: boolean
  pinned?: boolean
}

export interface SocialPost {
  id: string
  author: string
  authorRole: string
  authorInitials: string
  content: string
  likes: number
  comments: number
  timestamp: string
  platform?: SocialPlatform
}

// ─── Favorites ────────────────────────────────────────────────────────────────

export type FavoriteType = 'event' | 'document' | 'page' | 'location' | 'social'

export interface FavoriteItem {
  id: string
  refId: string         // ID of original item
  type: FavoriteType
  title: string
  subtitle?: string
  savedAt: string       // ISO datetime
  meta?: string         // e.g. date, category, platform name
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export interface KpiStat {
  id: string
  label: string
  value: string
  delta?: string
  deltaPositive?: boolean
}
