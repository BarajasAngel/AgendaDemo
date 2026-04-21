import { useState } from 'react'
import { BookOpen, Clock, ChevronLeft, Star, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { PagesService } from '@/data/services'
import { useFavorites } from '@/features/favorites/context'
import { formatDate, cn } from '@/lib/utils'
import type { InfoPage, PageCategory } from '@/types'

const CATEGORY_LABELS: Record<PageCategory, string> = {
  institucional: 'Institucional',
  normativa: 'Normativa',
  beneficios: 'Beneficios',
  noticias: 'Noticias',
  otro: 'Otro',
}

const CATEGORY_BADGE: Record<PageCategory, 'default' | 'accent' | 'success' | 'primary'> = {
  institucional: 'primary',
  normativa: 'default',
  beneficios: 'success',
  noticias: 'accent',
  otro: 'default',
}

type Filter = 'todos' | PageCategory

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'institucional', label: 'Institucional' },
  { value: 'beneficios', label: 'Beneficios' },
  { value: 'noticias', label: 'Noticias' },
  { value: 'normativa', label: 'Normativa' },
]

function PageCard({
  page,
  favorite,
  onClick,
  onToggleFavorite,
}: {
  page: InfoPage
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
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <BookOpen size={15} className="text-slate-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-slate-900 leading-snug">{page.title}</p>
            <div className="flex items-center gap-1 shrink-0">
              {page.isFeatured && (
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              )}
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
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-2">{page.excerpt}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={CATEGORY_BADGE[page.category]}>{CATEGORY_LABELS[page.category]}</Badge>
            {page.readTime && (
              <div className="flex items-center gap-1 text-slate-400">
                <Clock size={10} />
                <span className="text-[10px]">{page.readTime} min</span>
              </div>
            )}
            <span className="text-[10px] text-slate-400">{formatDate(page.date)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PageDetail({
  page,
  favorite,
  onClose,
  onToggleFavorite,
}: {
  page: InfoPage
  favorite: boolean
  onClose: () => void
  onToggleFavorite: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-slate-100 shrink-0">
        <button onClick={onClose} className="btn-icon">
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-medium text-slate-900 flex-1 truncate">{page.title}</span>
        <button
          onClick={onToggleFavorite}
          className={cn(
            'btn-icon',
            favorite ? 'text-amber-500 bg-amber-50 hover:bg-amber-50' : ''
          )}
          aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          aria-pressed={favorite}
        >
          <Star size={16} className={favorite ? 'fill-amber-400' : undefined} />
        </button>
        <button onClick={onClose} className="btn-icon">
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <Badge variant={CATEGORY_BADGE[page.category]}>{CATEGORY_LABELS[page.category]}</Badge>
          <span className="text-xs text-slate-400">{formatDate(page.date, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          {page.readTime && (
            <div className="flex items-center gap-1 text-slate-400">
              <Clock size={11} />
              <span className="text-xs">{page.readTime} min de lectura</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-2 tracking-tight">
          {page.title}
        </h1>

        {/* Excerpt */}
        <p className="text-base text-slate-500 leading-relaxed mb-5 pb-5 border-b border-slate-100">
          {page.excerpt}
        </p>

        {/* Body */}
        <div
          className={cn(
            'prose prose-sm max-w-none',
            'prose-headings:font-semibold prose-headings:text-slate-900',
            'prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-2',
            'prose-h3:text-base prose-h3:mt-4 prose-h3:mb-1.5',
            'prose-p:text-slate-600 prose-p:leading-relaxed prose-p:my-2',
            'prose-ul:text-slate-600 prose-ul:my-2 prose-li:my-0.5',
            'prose-strong:text-slate-900 prose-strong:font-semibold'
          )}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {page.author && (
          <div className="mt-8 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Publicado por <span className="font-medium text-slate-600">{page.author}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Pages() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [selected, setSelected] = useState<InfoPage | null>(null)
  const { isFavorite, toggleFavorite } = useFavorites()

  const allPages = PagesService.getAll()
  const filtered = filter === 'todos'
    ? allPages
    : PagesService.getByCategory(filter as PageCategory)

  const togglePageFavorite = (page: InfoPage) => {
    toggleFavorite({
      type: 'page',
      refId: page.id,
      title: page.title,
      subtitle: `${CATEGORY_LABELS[page.category]}${page.readTime ? ` · ${page.readTime} min lectura` : ''}`,
      meta: CATEGORY_LABELS[page.category],
    })
  }

  return (
    <>
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="page-title">Páginas</h1>
          <Badge variant="default">{allPages.length}</Badge>
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

        <div className="space-y-2">
          {filtered.map(page => (
            <PageCard
              key={page.id}
              page={page}
              favorite={isFavorite('page', page.id)}
              onClick={() => setSelected(page)}
              onToggleFavorite={() => togglePageFavorite(page)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <PageDetail
          page={selected}
          favorite={isFavorite('page', selected.id)}
          onClose={() => setSelected(null)}
          onToggleFavorite={() => togglePageFavorite(selected)}
        />
      )}
    </>
  )
}
