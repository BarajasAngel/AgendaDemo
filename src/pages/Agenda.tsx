import { useState } from 'react'
import { Calendar, Clock, MapPin, Star, Users, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { EventsService } from '@/data/services'
import { useFavorites } from '@/features/favorites/context'
import { formatDate, formatTime, cn } from '@/lib/utils'
import type { AgendaEvent, EventCategory } from '@/types'

const CATEGORY_LABELS: Record<EventCategory, string> = {
  reunion: 'Reunión',
  evento: 'Evento',
  capacitacion: 'Capacitación',
  webinar: 'Webinar',
  otro: 'Otro',
}

const CATEGORY_BADGE: Record<EventCategory, 'default' | 'accent' | 'success' | 'warning'> = {
  reunion: 'default',
  evento: 'accent',
  capacitacion: 'success',
  webinar: 'warning',
  otro: 'default',
}

type Filter = 'todos' | EventCategory

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'reunion', label: 'Reuniones' },
  { value: 'evento', label: 'Eventos' },
  { value: 'capacitacion', label: 'Capacitación' },
  { value: 'webinar', label: 'Webinars' },
]

function EventCard({
  event,
  favorite,
  onClick,
  onToggleFavorite,
}: {
  event: AgendaEvent
  favorite: boolean
  onClick: () => void
  onToggleFavorite: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className="card-interactive text-left w-full"
    >
      <div className="flex gap-3">
        <div className="w-12 shrink-0 flex flex-col items-center pt-0.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase leading-none">
            {new Intl.DateTimeFormat('es-MX', { month: 'short' }).format(new Date(event.date + 'T00:00'))}
          </span>
          <span className="text-2xl font-bold text-slate-900 leading-tight">
            {new Date(event.date + 'T00:00').getDate()}
          </span>
          {event.isFeatured && (
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1" />
          )}
        </div>

        <div className="w-px bg-slate-100 shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <p className="text-sm font-semibold text-slate-900 leading-snug">{event.title}</p>
            <div className="flex items-center gap-1 shrink-0">
              <Badge variant={CATEGORY_BADGE[event.category]} className="mt-0.5">
                {CATEGORY_LABELS[event.category]}
              </Badge>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  onToggleFavorite()
                }}
                className={cn(
                  'w-8 h-8 rounded-xl flex items-center justify-center transition-colors',
                  favorite ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-amber-500 hover:bg-amber-50'
                )}
                aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                aria-pressed={favorite}
              >
                <Star size={15} className={favorite ? 'fill-amber-400' : undefined} />
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Clock size={11} className="text-slate-400 shrink-0" />
              <span className="text-xs text-slate-400">
                {formatTime(event.time)}{event.endTime && ` – ${formatTime(event.endTime)}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={11} className="text-slate-400 shrink-0" />
              <span className="text-xs text-slate-400 truncate">{event.location}</span>
            </div>
            {event.attendees && (
              <div className="flex items-center gap-1.5">
                <Users size={11} className="text-slate-400 shrink-0" />
                <span className="text-xs text-slate-400">{event.attendees} asistentes</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EventDetail({
  event,
  favorite,
  onClose,
  onToggleFavorite,
}: {
  event: AgendaEvent
  favorite: boolean
  onClose: () => void
  onToggleFavorite: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col" onClick={onClose}>
      <div className="flex-1 bg-slate-900/40 backdrop-blur-sm" />
      <div
        className="bg-white rounded-t-3xl max-h-[80dvh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-4 pt-5 pb-8">
          <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mb-5" />
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1">
              <Badge variant={CATEGORY_BADGE[event.category]} className="mb-2">
                {CATEGORY_LABELS[event.category]}
              </Badge>
              <h2 className="text-lg font-semibold text-slate-900 leading-snug">{event.title}</h2>
            </div>
            <button onClick={onClose} className="btn-icon shrink-0">
              <X size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={onToggleFavorite}
            className={cn(
              'w-full mb-4 flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors',
              favorite
                ? 'border-amber-200 bg-amber-50 text-amber-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-amber-200 hover:text-amber-700'
              )}
            aria-pressed={favorite}
          >
            <Star size={15} className={favorite ? 'fill-amber-400' : undefined} />
            {favorite ? 'Guardado en favoritos' : 'Agregar a favoritos'}
          </button>

          <div className="card space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <Calendar size={14} className="text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Fecha</p>
                <p className="text-sm font-medium text-slate-900">
                  {formatDate(event.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <Clock size={14} className="text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Horario</p>
                <p className="text-sm font-medium text-slate-900">
                  {formatTime(event.time)}{event.endTime && ` – ${formatTime(event.endTime)}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <MapPin size={14} className="text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Lugar</p>
                <p className="text-sm font-medium text-slate-900">{event.location}</p>
                {event.locationDetail && (
                  <p className="text-xs text-slate-400 mt-0.5">{event.locationDetail}</p>
                )}
              </div>
            </div>
            {event.attendees && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Users size={14} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Asistentes</p>
                  <p className="text-sm font-medium text-slate-900">{event.attendees} personas</p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <p className="section-title mb-2">Descripción</p>
            <p className="text-sm text-slate-600 leading-relaxed">{event.description}</p>
          </div>

          {event.tags && event.tags.length > 0 && (
            <div className="mb-4">
              <p className="section-title mb-2">Etiquetas</p>
              <div className="flex flex-wrap gap-1.5">
                {event.tags.map(tag => (
                  <Badge key={tag} variant="default">#{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {event.organizer && (
            <p className="text-xs text-slate-400">
              Organiza: <span className="text-slate-600 font-medium">{event.organizer}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Agenda() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [selected, setSelected] = useState<AgendaEvent | null>(null)
  const { isFavorite, toggleFavorite } = useFavorites()

  const allEvents = EventsService.getAll()
  const filtered = filter === 'todos'
    ? allEvents
    : allEvents.filter(e => e.category === filter)

  const grouped = filtered.reduce<Record<string, AgendaEvent[]>>((acc, e) => {
    if (!acc[e.date]) acc[e.date] = []
    acc[e.date].push(e)
    return acc
  }, {})
  const sortedDates = Object.keys(grouped).sort()

  const toggleEventFavorite = (event: AgendaEvent) => {
    toggleFavorite({
      type: 'event',
      refId: event.id,
      title: event.title,
      subtitle: `${formatDate(event.date)} — ${event.location}`,
      meta: CATEGORY_LABELS[event.category],
    })
  }

  return (
    <>
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="page-title">Agenda</h1>
          <Badge variant="default">{allEvents.length} eventos</Badge>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 mb-5">
          {FILTERS.map(f => (
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

        {sortedDates.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="Sin eventos"
            description="No hay eventos con el filtro seleccionado"
          />
        ) : (
          <div className="space-y-6">
            {sortedDates.map(date => (
              <section key={date}>
                <div className="flex items-center gap-2 mb-2.5">
                  <p className="section-title capitalize">
                    {formatDate(date, { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-xs text-slate-400">{grouped[date].length}</span>
                </div>
                <div className="space-y-2">
                  {grouped[date].map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      favorite={isFavorite('event', event.id)}
                      onClick={() => setSelected(event)}
                      onToggleFavorite={() => toggleEventFavorite(event)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <EventDetail
          event={selected}
          favorite={isFavorite('event', selected.id)}
          onClose={() => setSelected(null)}
          onToggleFavorite={() => toggleEventFavorite(selected)}
        />
      )}
    </>
  )
}
