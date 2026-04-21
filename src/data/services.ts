/**
 * Mock service layer — returns typed data from local mock files.
 * Replace these with real API calls in future phases without touching UI.
 */
import { mockEvents } from './mock/events'
import { mockDocuments } from './mock/documents'
import { mockPages } from './mock/pages'
import { mockLocations } from './mock/locations'
import { mockSocialLinks, mockSocialPosts } from './mock/social'
import { mockNotifications } from './mock/notifications'
import { mockFavorites } from './mock/favorites'
import type {
  AgendaEvent, DocumentItem, InfoPage,
  LocationItem, SocialLinkItem, SocialPost,
  NotificationItem, FavoriteItem
} from '@/types'

// ─── Events ───────────────────────────────────────────────────────────────────

export const EventsService = {
  getAll: (): AgendaEvent[] => mockEvents,
  getById: (id: string): AgendaEvent | undefined => mockEvents.find(e => e.id === id),
  getByCategory: (cat: AgendaEvent['category']): AgendaEvent[] =>
    mockEvents.filter(e => e.category === cat),
  getUpcoming: (limit = 5): AgendaEvent[] => {
    const today = new Date().toISOString().split('T')[0]
    return mockEvents
      .filter(e => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, limit)
  },
  getFeatured: (): AgendaEvent[] => mockEvents.filter(e => e.isFeatured),
}

// ─── Documents ────────────────────────────────────────────────────────────────

export const DocumentsService = {
  getAll: (): DocumentItem[] => mockDocuments,
  getById: (id: string): DocumentItem | undefined => mockDocuments.find(d => d.id === id),
  getByCategory: (cat: DocumentItem['category']): DocumentItem[] =>
    mockDocuments.filter(d => d.category === cat),
  search: (query: string): DocumentItem[] => {
    const q = query.toLowerCase()
    return mockDocuments.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.description?.toLowerCase().includes(q) ||
      d.author?.toLowerCase().includes(q)
    )
  },
  getFeatured: (): DocumentItem[] => mockDocuments.filter(d => d.isFeatured),
}

// ─── Pages ────────────────────────────────────────────────────────────────────

export const PagesService = {
  getAll: (): InfoPage[] => mockPages,
  getById: (id: string): InfoPage | undefined => mockPages.find(p => p.id === id),
  getByCategory: (cat: InfoPage['category']): InfoPage[] =>
    mockPages.filter(p => p.category === cat),
  getFeatured: (): InfoPage[] => mockPages.filter(p => p.isFeatured),
}

// ─── Locations ────────────────────────────────────────────────────────────────

export const LocationsService = {
  getAll: (): LocationItem[] => mockLocations,
  getById: (id: string): LocationItem | undefined => mockLocations.find(l => l.id === id),
  getByCategory: (cat: LocationItem['category']): LocationItem[] =>
    mockLocations.filter(l => l.category === cat),
}

// ─── Social ───────────────────────────────────────────────────────────────────

export const SocialService = {
  getLinks: (): SocialLinkItem[] => mockSocialLinks,
  getPosts: (): SocialPost[] => mockSocialPosts,
  getPinned: (): SocialLinkItem[] => mockSocialLinks.filter(s => s.pinned),
}

// ─── Notifications ────────────────────────────────────────────────────────────

export const NotificationsService = {
  getAll: (): NotificationItem[] => mockNotifications,
  getUnread: (): NotificationItem[] => mockNotifications.filter(n => !n.read),
  getUnreadCount: (): number => mockNotifications.filter(n => !n.read).length,
}

// ─── Favorites ────────────────────────────────────────────────────────────────

export const FavoritesService = {
  getAll: (): FavoriteItem[] => mockFavorites,
  getByType: (type: FavoriteItem['type']): FavoriteItem[] =>
    mockFavorites.filter(f => f.type === type),
}
