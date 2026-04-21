import { useState } from 'react'
import { ExternalLink, Heart, MessageCircle, CheckCircle, Youtube, Linkedin } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { SocialService } from '@/data/services'
import { formatRelative, cn } from '@/lib/utils'
import type { SocialPlatform, SocialLinkItem } from '@/types'

// Simple Facebook/Instagram/TikTok SVG icons (lucide doesn't include social)
function PlatformIcon({ platform, size = 16 }: { platform: SocialPlatform; size?: number }) {
  const s = size
  if (platform === 'facebook') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
  if (platform === 'instagram') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
  if (platform === 'youtube') return <Youtube size={s} />
  if (platform === 'linkedin') return <Linkedin size={s} />
  if (platform === 'twitter') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
  return null
}

const PLATFORM_COLORS: Record<SocialPlatform, string> = {
  facebook: 'bg-blue-600 text-white',
  instagram: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
  youtube: 'bg-red-600 text-white',
  linkedin: 'bg-blue-700 text-white',
  twitter: 'bg-slate-900 text-white',
  tiktok: 'bg-slate-900 text-white',
}

const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  twitter: 'X / Twitter',
  tiktok: 'TikTok',
}

function SocialLinkCard({ link }: { link: SocialLinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-interactive flex items-start gap-3 text-left"
    >
      <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', PLATFORM_COLORS[link.platform])}>
        <PlatformIcon platform={link.platform} size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p className="text-sm font-semibold text-slate-900">{link.displayName}</p>
          {link.verified && (
            <CheckCircle size={13} className="text-blue-500 shrink-0" />
          )}
        </div>
        <p className="text-xs text-slate-400">{link.handle}</p>
        {link.followers && (
          <p className="text-xs font-medium text-slate-600 mt-0.5">{link.followers} seguidores</p>
        )}
        {link.description && (
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{link.description}</p>
        )}
      </div>
      <div className="text-slate-300 shrink-0 mt-1">
        <ExternalLink size={14} />
      </div>
    </a>
  )
}

type Tab = 'cuentas' | 'feed'

export default function Social() {
  const [tab, setTab] = useState<Tab>('cuentas')

  const links = SocialService.getLinks()
  const posts = SocialService.getPosts()

  return (
    <div className="px-4 pt-5 pb-4">
      <h1 className="page-title mb-4">Social Media</h1>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-5">
        {(['cuentas', 'feed'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex-1 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-150',
              tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            )}
          >
            {t === 'cuentas' ? 'Nuestras cuentas' : 'Feed reciente'}
          </button>
        ))}
      </div>

      {tab === 'cuentas' ? (
        <div className="space-y-3">
          <p className="section-title mb-3">Síguenos en redes</p>
          {links.map(link => (
            <SocialLinkCard key={link.id} link={link} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="section-title mb-3">Publicaciones recientes</p>
          {posts.map(post => (
            <Card key={post.id}>
              <div className="flex items-start gap-2.5 mb-3">
                <Avatar initials={post.authorInitials} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-slate-900">{post.author}</p>
                    {post.platform && (
                      <div className={cn(
                        'w-4 h-4 rounded flex items-center justify-center',
                        PLATFORM_COLORS[post.platform]
                      )}>
                        <PlatformIcon platform={post.platform} size={10} />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{post.authorRole} · {formatRelative(post.timestamp)}</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">{post.content}</p>
              <div className="flex items-center gap-4 pt-3 border-t border-slate-50">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Heart size={14} />
                  <span className="text-xs font-medium">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MessageCircle size={14} />
                  <span className="text-xs font-medium">{post.comments}</span>
                </div>
                {post.platform && (
                  <Badge variant="default" className="ml-auto">
                    {PLATFORM_LABELS[post.platform]}
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
