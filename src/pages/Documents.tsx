import { useState } from 'react'
import { FileText, Search, Download, Star, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { DocumentsService } from '@/data/services'
import { useFavorites } from '@/features/favorites/context'
import { formatDate, cn } from '@/lib/utils'
import type { DocCategory, DocumentItem } from '@/types'

const FILE_ICONS: Record<string, string> = {
  pdf: 'PDF',
  docx: 'DOC',
  xlsx: 'XLS',
  pptx: 'PPT',
}

const FILE_COLORS: Record<string, string> = {
  pdf: 'bg-red-50 text-red-600',
  docx: 'bg-blue-50 text-blue-600',
  xlsx: 'bg-emerald-50 text-emerald-600',
  pptx: 'bg-orange-50 text-orange-600',
}

const CATEGORY_LABELS: Record<DocCategory, string> = {
  reporte: 'Reporte',
  circular: 'Circular',
  manual: 'Manual',
  politica: 'Política',
  otro: 'Otro',
}

type Filter = 'todos' | DocCategory

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'reporte', label: 'Reportes' },
  { value: 'circular', label: 'Circulares' },
  { value: 'manual', label: 'Manuales' },
  { value: 'politica', label: 'Políticas' },
]

function DocCard({
  doc,
  favorite,
  onToggleFavorite,
}: {
  doc: DocumentItem
  favorite: boolean
  onToggleFavorite: () => void
}) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold text-[11px]',
          FILE_COLORS[doc.fileType]
        )}>
          {FILE_ICONS[doc.fileType]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-slate-900 leading-snug">{doc.title}</p>
            <div className="flex items-center gap-1 shrink-0">
              {doc.isFeatured && (
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              )}
              <button
                type="button"
                onClick={onToggleFavorite}
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
          {doc.description && (
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-2">
              {doc.description}
            </p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="default">{CATEGORY_LABELS[doc.category]}</Badge>
            <span className="text-[10px] text-slate-400">{doc.size}</span>
            <span className="text-[10px] text-slate-400">·</span>
            <span className="text-[10px] text-slate-400">{formatDate(doc.date)}</span>
            {doc.downloads && (
              <>
                <span className="text-[10px] text-slate-400">·</span>
                <div className="flex items-center gap-0.5">
                  <Download size={9} className="text-slate-400" />
                  <span className="text-[10px] text-slate-400">{doc.downloads}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function Documents() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [query, setQuery] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites()

  const base = filter === 'todos'
    ? DocumentsService.getAll()
    : DocumentsService.getByCategory(filter as DocCategory)

  const results = query.trim()
    ? base.filter(d =>
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.description?.toLowerCase().includes(query.toLowerCase())
      )
    : base

  const toggleDocumentFavorite = (doc: DocumentItem) => {
    toggleFavorite({
      type: 'document',
      refId: doc.id,
      title: doc.title,
      subtitle: `${doc.fileType.toUpperCase()} · ${doc.size}`,
      meta: CATEGORY_LABELS[doc.category],
    })
  }

  return (
    <div className="px-4 pt-5 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="page-title">Documentos</h1>
        <Badge variant="default">{results.length}</Badge>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="search"
          placeholder="Buscar documentos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-9 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters */}
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

      {/* Results */}
      {results.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Sin resultados"
          description={query ? `No se encontró "${query}"` : 'No hay documentos en esta categoría'}
        />
      ) : (
        <div className="space-y-2">
          {results.map(doc => (
            <DocCard
              key={doc.id}
              doc={doc}
              favorite={isFavorite('document', doc.id)}
              onToggleFavorite={() => toggleDocumentFavorite(doc)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
