import {
  Calendar, Map, Users, FileText,
  BookOpen, Bell, Star, ArrowRight,
  TrendingUp, Clock, Building2, ChevronRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { DocumentsService, EventsService } from '@/data/services'
import { useNotifications } from '@/features/notifications/context'
import { formatDate, formatTime } from '@/lib/utils'
import type { AgendaEvent, DocumentItem, EventCategory, DocCategory } from '@/types'

const quickLinks = [
  { path: '/agenda', label: 'Agenda', icon: Calendar, desc: 'Eventos y reuniones' },
  { path: '/mapas', label: 'Mapas', icon: Map, desc: 'Ubicaciones' },
  { path: '/social', label: 'Social', icon: Users, desc: 'Feed corporativo' },
  { path: '/documentos', label: 'Documentos', icon: FileText, desc: 'Archivos y reportes' },
  { path: '/paginas', label: 'Páginas', icon: BookOpen, desc: 'Contenido editorial' },
  { path: '/notificaciones', label: 'Notificaciones', icon: Bell, desc: 'Avisos y alertas' },
  { path: '/favoritos', label: 'Favoritos', icon: Star, desc: 'Guardados' },
]

const EVENT_LABELS: Record<EventCategory, string> = {
  reunion: 'Reunión',
  evento: 'Evento',
  capacitacion: 'Capacitación',
  webinar: 'Webinar',
  otro: 'Otro',
}

const DOC_LABELS: Record<DocCategory, string> = {
  reporte: 'Reporte',
  circular: 'Circular',
  manual: 'Manual',
  politica: 'Política',
  otro: 'Otro',
}

function getTodayString() {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long'
  }).format(new Date())
}

function getTodayIso() {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  return new Date(now.getTime() - offset * 60000).toISOString().split('T')[0]
}

export default function Home() {
  const { unreadCount } = useNotifications()
  const today = getTodayString()
  const todayIso = getTodayIso()
  const upcomingEvents = EventsService.getUpcoming(3)
  const todayEvents = EventsService.getAll().filter(event => event.date === todayIso)
  const recentDocs = DocumentsService.getAll()
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)

  const kpis = [
    { label: 'Eventos hoy', value: String(todayEvents.length), icon: Calendar, accent: false },
    { label: 'Docs nuevos', value: String(recentDocs.length), icon: FileText, accent: false },
    { label: 'Notificaciones', value: String(unreadCount), icon: Bell, accent: true },
  ]

  return (
    <div className="px-4 pt-5 pb-4 space-y-6">

      {/* Welcome */}
      <div>
        <p className="text-xs text-slate-400 font-medium capitalize">{today}</p>
        <h1 className="text-2xl font-semibold text-slate-900 mt-0.5 tracking-tight">
          Buenos días, Angel
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">
          {todayEvents.length === 1 ? '1 evento pendiente hoy' : `${todayEvents.length} eventos pendientes hoy`}
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-3">
        {kpis.map(({ label, value, icon: Icon, accent }) => (
          <Card key={label} className={accent ? 'bg-slate-900 border-slate-800' : ''}>
            <div className="space-y-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${accent ? 'bg-amber-500/20' : 'bg-slate-100'}`}>
                <Icon size={14} className={accent ? 'text-amber-400' : 'text-slate-500'} />
              </div>
              <div>
                <p className={`text-2xl font-bold tracking-tight ${accent ? 'text-white' : 'text-slate-900'}`}>
                  {value}
                </p>
                <p className={`text-[10px] font-medium leading-tight ${accent ? 'text-slate-400' : 'text-slate-400'}`}>
                  {label}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upcoming events */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <span className="section-title">Hoy</span>
          <Link to="/agenda" className="text-xs font-medium text-slate-500 flex items-center gap-0.5 hover:text-slate-900 transition-colors">
            Ver agenda <ChevronRight size={12} />
          </Link>
        </div>
        <div className="space-y-2">
          {upcomingEvents.map((event: AgendaEvent) => (
            <Card key={event.id}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex flex-col items-center justify-center shrink-0">
                  <Clock size={14} className="text-slate-400" />
                  <span className="text-[9px] font-semibold text-slate-500 mt-0.5">{formatTime(event.time)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 truncate">{event.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{event.location}</p>
                </div>
                <Badge variant="default" className="shrink-0">{EVENT_LABELS[event.category]}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick access grid */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <span className="section-title">Accesos rápidos</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {quickLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl hover:bg-white hover:shadow-card active:scale-95 transition-all duration-150"
            >
              <div className="w-11 h-11 rounded-xl bg-white shadow-card flex items-center justify-center border border-slate-100">
                <Icon size={18} className="text-slate-600" />
              </div>
              <span className="text-[10px] font-medium text-slate-500 text-center leading-tight">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent documents */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <span className="section-title">Documentos recientes</span>
          <Link to="/documentos" className="text-xs font-medium text-slate-500 flex items-center gap-0.5 hover:text-slate-900 transition-colors">
            Ver todos <ChevronRight size={12} />
          </Link>
        </div>
        <Card className="divide-y divide-slate-50 p-0 overflow-hidden">
          {recentDocs.map((doc: DocumentItem) => (
            <button key={doc.id} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 active:bg-slate-100 transition-colors text-left">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-[9px] font-bold text-slate-500">{doc.fileType.toUpperCase()}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 truncate">{doc.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{formatDate(doc.date)}</p>
              </div>
              <Badge variant="default">{DOC_LABELS[doc.category]}</Badge>
            </button>
          ))}
        </Card>
      </section>

      {/* Announcement banner */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-800 text-white">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Building2 size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Convención anual 2024</p>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Registro abierto hasta el 30 de octubre. No pierdas tu lugar.
            </p>
          </div>
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 hover:bg-white/20 transition-colors cursor-pointer">
            <ArrowRight size={14} className="text-white" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <TrendingUp size={12} className="text-amber-400" />
          <span className="text-xs text-amber-400 font-medium">248 registrados</span>
        </div>
      </Card>

    </div>
  )
}
