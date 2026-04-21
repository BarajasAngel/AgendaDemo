import type { FavoriteItem } from '@/types'

// Default demo favorites (shown when localStorage is empty)
export const mockFavorites: FavoriteItem[] = [
  {
    id: 'fav-001',
    refId: 'ev-005',
    type: 'event',
    title: 'Convención Anual 2024',
    subtitle: '25 abr — WTC Ciudad de México',
    savedAt: '2026-04-18T10:00:00',
    meta: 'Evento',
  },
  {
    id: 'fav-002',
    refId: 'doc-003',
    type: 'document',
    title: 'Manual de procedimientos administrativos v3',
    subtitle: 'PDF · 12.7 MB',
    savedAt: '2026-04-17T09:30:00',
    meta: 'Manual',
  },
  {
    id: 'fav-003',
    refId: 'pg-002',
    type: 'page',
    title: 'Plan de beneficios 2025',
    subtitle: 'Beneficios · 5 min lectura',
    savedAt: '2026-04-16T14:00:00',
    meta: 'Beneficios',
  },
  {
    id: 'fav-004',
    refId: 'loc-001',
    type: 'location',
    title: 'Oficina Central — Torre Corporativa',
    subtitle: 'Av. Reforma 250 · 0.3 km',
    savedAt: '2026-04-10T11:00:00',
    meta: 'Oficina',
  },
]
