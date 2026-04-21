import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import Home from '@/pages/Home'
import Agenda from '@/pages/Agenda'
import Maps from '@/pages/Maps'
import Social from '@/pages/Social'
import Documents from '@/pages/Documents'
import Pages from '@/pages/Pages'
import Notifications from '@/pages/Notifications'
import Favorites from '@/pages/Favorites'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'agenda', element: <Agenda /> },
      { path: 'mapas', element: <Maps /> },
      { path: 'social', element: <Social /> },
      { path: 'documentos', element: <Documents /> },
      { path: 'paginas', element: <Pages /> },
      { path: 'notificaciones', element: <Notifications /> },
      { path: 'favoritos', element: <Favorites /> },
    ],
  },
])
