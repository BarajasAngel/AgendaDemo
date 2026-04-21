import { useState } from 'react'
import { Star, Calendar, FileText, BookOpen, MapPin, Users, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { useFavorites } from '@/features/favorites/context'
import { formatRelative, cn } from '@/lib/utils'
import type { FavoriteType, FavoriteItem } from '@/types'

const TYPE_ICONS: Record<FavoriteType, typeof Star> = {
  event: Calendar,
  document: FileText,
  page: BookOpen,
  location: MapPin,
  social: Users,
}

const TYPE_LABELS: Record<FavoriteType, string> = {
  event: 'Evento',
  document: 'Documento',
  page: 'Página',
  location: 'Lugar',
  social: 'Social',
}

const TYPE_BADGE: Record<FavoriteType, 'default' | 'accent' | 'success' | 'primary'> = {
  event: 'accent',
  document: 'default',
  page: 'success',
  location: 'primary',
  social: 'default',
}

type Filter = 'todos' | FavoriteType

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'event', label: 'Eventos' },
  { value: 'document', label: 'Docs' },
  { value: 'page', label: 'Páginas' },
  { value: 'location', label: 'Lugares' },
]

function FavoriteCard({ item, onRemove }: { item: FavoriteItem; onRemove: () => void }) {
  const Icon = TYPE_ICONS[item.type]

  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <Icon size={15} className="text-slate-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-slate-900 leading-snug">{item.title}</p>
            <button
              type="button"
              onClick={onRemove}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Quitar favorito"
            >
              <X size={14} />
            </button>
          </div>
          {item.subtitle && (
            <p className="text-xs text-slate-400 mb-2">{item.subtitle}</p>
          )}
          <div className="flex items-center gap-2">
            <Badge variant={TYPE_BADGE[item.type]}>{TYPE_LABELS[item.type]}</Badge>
            <span className="text-[10px] text-slate-400">Guardado {formatRelative(item.savedAt)}</span>
            {item.meta && <span className="text-[10px] text-slate-400">· {item.meta}</span>}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function Favorites() {
  const [filter, setFilter] = useState<Filter>('todos')
  const { favorites, removeFavorite } = useFavorites()

  const filtered = filter === 'todos'
    ? favorites
    : favorites.filter(f => f.type === filter)

  const availableFilters = FILTERS.filter(f =>
    f.value === 'todos' || favorites.some(item => item.type === f.value)
  )

  return (
    <div className="px-4 pt-5 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="page-title">Favoritos</h1>
        <Badge variant="default">{favorites.length}</Badge>
      </div>

      {favorites.length > 0 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 mb-5">
          {availableFilters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'shrink-0 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-150',
                filter === f.value
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={Star}
          title={filter === 'todos' ? 'Sin favoritos aún' : 'Sin favoritos en esta categoría'}
          description={filter === 'todos'
            ? 'Marca eventos, documentos o páginas para encontrarlos rápido aquí'
            : 'Prueba otro filtro o agrega nuevos elementos desde su sección'}
        />
      ) : (
        <div className="space-y-2">
          {filtered.map(item => (
            <FavoriteCard
              key={item.id}
              item={item}
              onRemove={() => removeFavorite(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
