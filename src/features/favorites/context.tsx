import { createContext, useCallback, useContext, type ReactNode } from 'react'
import { mockFavorites } from '@/data/mock/favorites'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { FavoriteItem, FavoriteType } from '@/types'

const LS_KEY = 'sa_favorites_v1'

type FavoriteInput = Omit<FavoriteItem, 'id' | 'savedAt'>

interface FavoritesContextValue {
  favorites: FavoriteItem[]
  isFavorite: (type: FavoriteType, refId: string) => boolean
  toggleFavorite: (item: FavoriteInput) => void
  removeFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

function getInitialFavorites(): FavoriteItem[] {
  try {
    const stored = localStorage.getItem(LS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as FavoriteItem[]
      if (Array.isArray(parsed)) return parsed
    }
  } catch { /* ignore */ }
  return mockFavorites
}

function favoriteId(type: FavoriteType, refId: string) {
  return `${type}-${refId}`
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>(
    LS_KEY,
    getInitialFavorites()
  )

  const isFavorite = useCallback((type: FavoriteType, refId: string) => (
    favorites.some(item => item.type === type && item.refId === refId)
  ), [favorites])

  const toggleFavorite = useCallback((item: FavoriteInput) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.type === item.type && fav.refId === item.refId)
      if (exists) {
        return prev.filter(fav => !(fav.type === item.type && fav.refId === item.refId))
      }

      const next: FavoriteItem = {
        ...item,
        id: favoriteId(item.type, item.refId),
        savedAt: new Date().toISOString(),
      }
      return [next, ...prev]
    })
  }, [setFavorites])

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id))
  }, [setFavorites])

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider')
  return ctx
}
