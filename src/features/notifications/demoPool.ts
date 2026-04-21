import type { NotificationType } from '@/types'

interface DemoEntry {
  title: string
  body: string
  type: NotificationType
}

export const DEMO_POOL: DemoEntry[] = [
  {
    title: 'Actualización de agenda',
    body: 'La sesión ejecutiva cambió a Sala de Consejo, piso 18. El horario se mantiene a las 09:00 hrs.',
    type: 'warning',
  },
  {
    title: 'Cambio de horario confirmado',
    body: 'La capacitación de herramientas digitales iniciará a las 11:45 hrs. Recibirás recordatorio 15 minutos antes.',
    type: 'info',
  },
  {
    title: 'Aviso importante',
    body: 'Se publicó una circular prioritaria sobre lineamientos de seguridad. Revisa el documento antes de finalizar el día.',
    type: 'warning',
  },
  {
    title: 'Documento listo para revisión',
    body: 'El Informe de resultados Q3 2024 ya está disponible con indicadores actualizados y resumen ejecutivo.',
    type: 'success',
  },
  {
    title: 'Registro abierto: Convención 2024',
    body: 'Tu lugar aún no está confirmado. El registro cierra el 30 de octubre y el cupo es limitado.',
    type: 'info',
  },
  {
    title: 'Ubicación actualizada',
    body: 'La presentación a socios estratégicos se movió a Sala VIP, Torre Norte. El mapa ya fue actualizado.',
    type: 'info',
  },
  {
    title: 'Confirmación recibida',
    body: 'Tu asistencia al webinar de tendencias del sector quedó registrada correctamente.',
    type: 'success',
  },
  {
    title: 'Recordatorio ejecutivo',
    body: 'La Asamblea General Ordinaria será el 12 de mayo a las 10:00 hrs en el Auditorio Central.',
    type: 'warning',
  },
  {
    title: 'Comunicado publicado',
    body: 'Ya está disponible el comunicado oficial sobre la certificación ISO 9001:2015.',
    type: 'success',
  },
  {
    title: 'Mantenimiento programado',
    body: 'El domingo 21 de abril de 00:00 a 04:00 hrs habrá mantenimiento preventivo de servicios digitales.',
    type: 'warning',
  },
]

let demoIndex = 0

export function nextDemoNotification(): DemoEntry {
  const entry = DEMO_POOL[demoIndex % DEMO_POOL.length]
  demoIndex++
  return entry
}
