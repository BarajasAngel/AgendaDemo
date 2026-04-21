import { useState } from 'react'
import { MapPin, Phone, Clock, ExternalLink, Building2, Star, Users } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { LocationsService } from '@/data/services'
import { cn } from '@/lib/utils'
import type { LocationCategory, LocationItem } from '@/types'

const CATEGORY_LABELS: Record<LocationCategory, string> = {
  oficina: 'Oficina',
  evento: 'Sede evento',
  socio: 'Socio',
  servicio: 'Servicio',
}

const CATEGORY_ICONS: Record<LocationCategory, typeof Building2> = {
  oficina: Building2,
  evento: Star,
  socio: Users,
  servicio: Building2,
}

const CATEGORY_BADGE: Record<LocationCategory, 'default' | 'accent' | 'success' | 'primary'> = {
  oficina: 'primary',
  evento: 'accent',
  socio: 'success',
  servicio: 'default',
}

type Filter = 'todos' | LocationCategory

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'oficina', label: 'Oficinas' },
  { value: 'evento', label: 'Eventos' },
  { value: 'socio', label: 'Socios' },
]

function MapPlaceholder() {
  return (
    <div className="w-full h-40 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative mb-5">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Roads */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#e2e8f0" strokeWidth="1.5" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#e2e8f0" strokeWidth="1.5" />
      </svg>
      {/* Pins */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-full">
        <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-white shadow-md flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </div>
      <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-full">
        <div className="w-5 h-5 rounded-full bg-amber-500 border-2 border-white shadow-md flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1">
        <p className="text-[9px] font-medium text-slate-500">Vista de mapa simulada</p>
      </div>
    </div>
  )
}

function LocationCard({ location }: { location: LocationItem }) {
  const Icon = CATEGORY_ICONS[location.category]

  return (
    <Card>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-slate-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-slate-900 leading-snug">{location.name}</p>
            <Badge variant={CATEGORY_BADGE[location.category]} className="shrink-0">
              {CATEGORY_LABELS[location.category]}
            </Badge>
          </div>
          {location.distance && (
            <p className="text-xs text-slate-400 mt-0.5">{location.distance} de distancia</p>
          )}
        </div>
      </div>

      {location.description && (
        <p className="text-xs text-slate-500 leading-relaxed mb-3">{location.description}</p>
      )}

      <div className="space-y-1.5">
        <div className="flex items-start gap-2">
          <MapPin size={12} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500">
            {location.address}{location.colonia && `, ${location.colonia}`}, {location.city}
          </p>
        </div>
        {location.phone && (
          <div className="flex items-center gap-2">
            <Phone size={12} className="text-slate-400 shrink-0" />
            <p className="text-xs text-slate-500">{location.phone}</p>
          </div>
        )}
        {location.hours && (
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-slate-400 shrink-0" />
            <p className="text-xs text-slate-500">{location.hours}</p>
          </div>
        )}
      </div>

      {location.mapUrl && (
        <a
          href={location.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={e => e.stopPropagation()}
        >
          <ExternalLink size={12} />
          Ver en Google Maps
        </a>
      )}
    </Card>
  )
}

export default function Maps() {
  const [filter, setFilter] = useState<Filter>('todos')

  const allLocations = LocationsService.getAll()
  const filtered = filter === 'todos'
    ? allLocations
    : LocationsService.getByCategory(filter as LocationCategory)

  return (
    <div className="px-4 pt-5 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="page-title">Mapas</h1>
        <Badge variant="default">{allLocations.length} sedes</Badge>
      </div>

      <MapPlaceholder />

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

      <div className="space-y-3">
        {filtered.map(loc => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>
    </div>
  )
}
