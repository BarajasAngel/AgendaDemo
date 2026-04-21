# Sistema Agenda

Demo corporativa PWA para agenda, documentos, páginas informativas, mapas, social, notificaciones y favoritos.

La app está pensada como prototipo instalable y desplegable en Cloudflare Pages. Usa datos mock locales y una capa de servicios para que una fase posterior pueda conectar backend sin reescribir las pantallas.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS v3
- React Router v6
- vite-plugin-pwa
- lucide-react
- @tailwindcss/typography

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173/`.

## Build

```bash
npm run build
```

La salida queda en `dist/`.

Para revisar el build:

```bash
npm run preview
```

## Deploy en Cloudflare Pages

1. Crear un proyecto en Cloudflare Pages conectado al repositorio.
2. Configurar:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Desplegar.

El proyecto ya incluye:

- `public/_redirects` para fallback SPA.
- `public/_headers` para cache correcto de service worker y manifest.
- Manifest PWA e íconos en `public/icons/`.
- Service worker generado por `vite-plugin-pwa`.

## Estructura Principal

- `src/app`: router.
- `src/layouts`: shell de app.
- `src/components`: UI y layout reutilizable.
- `src/pages`: pantallas principales.
- `src/features`: lógica por feature, como notificaciones y favoritos.
- `src/data`: mock data y services.
- `src/hooks`: hooks compartidos.
- `src/styles`: design system base.
- `public`: assets PWA, headers y redirects.

## Listo Para Cliente

- Navegación mobile-first con drawer "Más".
- Pantallas funcionales para agenda, documentos, mapas, social, páginas, notificaciones y favoritos.
- Favoritos persistentes con `localStorage`.
- Notificaciones demo con badge de no leídas, botón "Probar notificación", historial interno, fallback tipo toast y disparo móvil vía `registration.showNotification()`.
- PWA instalable con app shell cacheado.
- Build limpio para Cloudflare Pages.
- Responsive básico para mobile, tablet y desktop.

## Fase 2 Recomendada

- Backend real para eventos, documentos, páginas, ubicaciones y usuarios.
- Admin para cargar contenido.
- Auth y roles.
- Push real con Web Push y service worker custom.
- Búsqueda global.
- Analytics de uso.
- Gestión real de archivos y permisos.
- Tests automatizados de componentes y flujos críticos.
