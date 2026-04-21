# SistemaAgenda — PWA Demo Design Spec
Date: 2026-04-20

## Product
Corporate agenda + content PWA demo. Deployable on Cloudflare Pages Free. No backend, no admin, no external API keys. Read-only content consumption.

## Goals
- Presentable to client as real demo
- Base for real project (auth, admin, backend, push later)
- Feels installed, corporate, premium

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v3
- React Router v6
- vite-plugin-pwa
- lucide-react
- No backend — mock/local data only
- Build: `npm install` / `npm run dev` / `npm run build`
- Deploy: Cloudflare Pages (static)

## Design System

### Palette
| Token      | Value     | Use                  |
|------------|-----------|----------------------|
| primary    | slate-900 | nav, headers, text   |
| accent     | amber-600 | CTA, active badges   |
| surface    | white     | cards                |
| background | slate-50  | app background       |
| muted      | slate-400 | secondary text       |
| border     | slate-200 | dividers             |
| danger     | red-500   | alerts               |

### Typography
- Font: Inter (Google Fonts, loaded via CSS)
- Scale: Tailwind defaults (text-xs through text-2xl)

### Style Rules
- Rounded corners: rounded-xl cards, rounded-lg buttons
- Shadows: shadow-sm cards, shadow-md modals
- No gradients except subtle top bar
- Icons: lucide-react only

## Architecture

### File Structure
```
SistemaAgenda/
├── public/
│   └── icons/                    # PWA icons (192, 512)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx      # Root layout wrapper
│   │   │   ├── TopBar.tsx        # Logo, search, bell, avatar
│   │   │   ├── BottomNav.tsx     # Mobile nav (5 items)
│   │   │   └── Sidebar.tsx       # Tablet+ nav
│   │   ├── ui/
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Avatar.tsx
│   │   └── notifications/
│   │       ├── NotificationCenter.tsx
│   │       └── NotificationItem.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Agenda.tsx
│   │   ├── Maps.tsx
│   │   ├── Social.tsx
│   │   ├── Documents.tsx
│   │   ├── Pages.tsx
│   │   ├── Notifications.tsx
│   │   └── Favorites.tsx
│   ├── data/mock/
│   │   ├── agenda.ts
│   │   ├── documents.ts
│   │   ├── notifications.ts
│   │   ├── social.ts
│   │   └── pages.ts
│   ├── hooks/
│   │   ├── useNotifications.ts   # Permission + local notify + localStorage
│   │   └── useLocalStorage.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Navigation

### Mobile (default)
- `BottomNav`: Home, Agenda, Documentos, Notificaciones, Más (sheet)
- "Más" opens bottom sheet with: Mapas, Social, Páginas, Favoritos

### Tablet+ (≥768px)
- `Sidebar` left (64px collapsed / 240px expanded)
- All 8 sections visible

### TopBar (always)
- Left: Logo + app name
- Right: search icon, notification bell (unread badge), avatar

## Pages

### Home
- Welcome card (user name, date)
- KPI strip (3-4 stat cards)
- Upcoming events (horizontal scroll)
- Recent documents (list)
- Quick actions (grid)

### Agenda
- Month calendar view (custom, no lib)
- Event list below calendar
- Tap event → detail sheet

### Maps
- Static placeholder map image (no API)
- Location cards: name, address, category, distance
- Filter tabs: Todos, Oficinas, Eventos, Socios

### Social
- Stories row (horizontal scroll, avatars)
- Feed: corporate posts with image, text, reactions count
- No real interaction (read-only)

### Documents
- Filter tabs: Todos, Reportes, Circulares, Manuales
- Grid/list toggle
- Card: icon, title, date, size, category badge

### Pages
- CMS-like content list
- Section pages with rich text (mock HTML)
- Breadcrumb navigation

### Notifications
- Permission status indicator
- "Solicitar permiso" button → `Notification.requestPermission()`
- "Enviar notificación de prueba" button → `new Notification()` + append internal
- Notification list (from localStorage)
- Mark all read button
- Fallback banner if no permission/support

### Favorites
- Aggregated bookmarks across all sections
- Category filter
- Empty state if no favorites

## Notifications Demo (critical)

### `useNotifications` hook
```ts
// State managed in localStorage key: 'app_notifications'
// Permission state: 'default' | 'granted' | 'denied'
// Actions: requestPermission(), sendTestNotification(), markAllRead(), clearAll()
```

### Flow
1. User visits Notifications page
2. If permission === 'default': show request UI
3. Click "Solicitar permiso" → browser prompt
4. If granted: show "Enviar prueba" button
5. Click "Enviar prueba":
   - Fire `new Notification('Prueba', {...})`
   - Append notification object to localStorage list
   - Show in internal center
   - Increment bell badge
6. If permission denied or no support:
   - Show in-app visual fallback (banner style)
   - Still append to internal list

## PWA Config
- `vite-plugin-pwa` with Workbox
- Strategy: generateSW
- Cache: assets + pages (cache-first)
- Manifest: name, short_name, icons, theme_color (#0F172A), display: standalone
- start_url: /

## Cloudflare Pages Config
- Build command: `npm run build`
- Output dir: `dist`
- `public/_redirects`: `/* /index.html 200` (SPA routing)

## Constraints
- No real auth
- No backend calls
- No external APIs
- No paid dependencies
- All mock data in `src/data/mock/`

## Out of Scope (this demo)
- Authentication
- Admin panel
- Real push notifications (FCM/VAPID)
- Real maps API
- Real document upload
- Real social interactions
