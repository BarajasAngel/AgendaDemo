import type { InfoPage } from '@/types'

export const mockPages: InfoPage[] = [
  {
    id: 'pg-001',
    title: 'Quiénes somos',
    excerpt: 'Conoce la historia, misión, visión y valores que guían a nuestra organización desde su fundación.',
    content: `
      <h2>Nuestra historia</h2>
      <p>Desde nuestra fundación en 1982, hemos crecido para convertirnos en una de las organizaciones de referencia en el sector. Con más de cuatro décadas de experiencia, hemos acompañado el desarrollo de miles de personas y empresas a lo largo de México.</p>
      <h2>Misión</h2>
      <p>Impulsar el desarrollo económico y social de nuestros asociados mediante servicios de calidad, formación continua y representación efectiva ante instancias gubernamentales y privadas.</p>
      <h2>Visión</h2>
      <p>Ser la organización corporativa líder en México, reconocida por su innovación, transparencia e impacto positivo en el ecosistema empresarial nacional.</p>
      <h2>Valores</h2>
      <ul>
        <li><strong>Integridad:</strong> Actuamos con honestidad y ética en todo momento.</li>
        <li><strong>Excelencia:</strong> Buscamos la mejora continua en cada proceso y servicio.</li>
        <li><strong>Compromiso:</strong> Nos involucramos profundamente con el éxito de nuestros asociados.</li>
        <li><strong>Innovación:</strong> Adoptamos nuevas herramientas y metodologías para ofrecer mejores soluciones.</li>
      </ul>
    `,
    category: 'institucional',
    date: '2026-01-15',
    author: 'Comunicación Corporativa',
    readTime: 4,
    isFeatured: true,
  },
  {
    id: 'pg-002',
    title: 'Plan de beneficios 2025',
    excerpt: 'Descubre todos los beneficios a los que tienes acceso como asociado activo: seguros, descuentos, capacitación y más.',
    content: `
      <h2>Beneficios para asociados activos</h2>
      <p>Como parte de nuestra comunidad, tienes acceso a un amplio catálogo de beneficios diseñados para apoyar tu desarrollo personal y profesional.</p>
      <h2>Seguros y protección</h2>
      <ul>
        <li>Seguro de vida institucional sin costo adicional</li>
        <li>Seguro de gastos médicos mayores con cobertura ampliada</li>
        <li>Seguro de accidentes personales</li>
      </ul>
      <h2>Capacitación y desarrollo</h2>
      <ul>
        <li>Acceso a plataforma e-learning con más de 500 cursos</li>
        <li>Descuento del 40% en programas de posgrado con universidades aliadas</li>
        <li>Asistencia gratuita a talleres y webinars mensuales</li>
      </ul>
      <h2>Convenios y descuentos</h2>
      <ul>
        <li>Red de más de 200 establecimientos con descuentos exclusivos</li>
        <li>Tarifas preferenciales en hoteles y aerolíneas para viajes de negocio</li>
        <li>Acceso prioritario a eventos y convenciones del sector</li>
      </ul>
    `,
    category: 'beneficios',
    date: '2026-01-10',
    author: 'Recursos Humanos',
    readTime: 5,
    isFeatured: true,
  },
  {
    id: 'pg-003',
    title: 'Código de conducta y ética',
    excerpt: 'Marco normativo que rige el comportamiento ético de todos los miembros y colaboradores de la organización.',
    content: `
      <h2>Principios generales</h2>
      <p>El presente Código de Conducta establece los principios y normas éticas que deben guiar el actuar de todos los integrantes de nuestra organización, sin importar su nivel jerárquico o área de adscripción.</p>
      <h2>Conductas esperadas</h2>
      <ul>
        <li>Trato respetuoso y digno hacia todos los compañeros, clientes y proveedores</li>
        <li>Confidencialidad en el manejo de información sensible</li>
        <li>Rechazo absoluto a cualquier forma de corrupción, soborno o conflicto de interés</li>
        <li>Uso responsable de los recursos y activos de la organización</li>
      </ul>
      <h2>Canal de denuncias</h2>
      <p>La organización cuenta con un canal de denuncias confidencial disponible las 24 horas. Cualquier integrante puede reportar conductas contrarias a este código sin temor a represalias.</p>
      <h2>Consecuencias</h2>
      <p>El incumplimiento de este código podrá resultar en medidas disciplinarias que van desde amonestación escrita hasta la separación definitiva de la organización, según la gravedad de la falta.</p>
    `,
    category: 'normativa',
    date: '2025-11-20',
    author: 'Área Legal',
    readTime: 6,
  },
  {
    id: 'pg-004',
    title: 'Convención Anual 2024 — Todo lo que debes saber',
    excerpt: 'Información completa sobre el evento más importante del año: sede, programa, registro y preguntas frecuentes.',
    content: `
      <h2>Bienvenidos a la Convención Anual 2024</h2>
      <p>Este año celebramos nuestro 42° aniversario con un evento memorable en el Centro de Convenciones WTC de la Ciudad de México. El tema central será <strong>"Transformación con propósito"</strong>.</p>
      <h2>Programa general</h2>
      <ul>
        <li>08:00 — Registro y acreditación</li>
        <li>09:30 — Sesión inaugural</li>
        <li>11:00 — Panel de expertos: El futuro del sector</li>
        <li>13:00 — Comida oficial</li>
        <li>15:00 — Talleres simultáneos (4 opciones)</li>
        <li>18:00 — Reconocimientos y premiaciones</li>
        <li>20:00 — Cena de gala</li>
      </ul>
      <h2>Registro</h2>
      <p>El registro está abierto hasta el 30 de octubre. Los asociados activos tienen acceso sin costo. Los acompañantes tienen un costo preferencial de $850 MXN.</p>
      <h2>Hospedaje</h2>
      <p>Contamos con tarifas preferenciales en el Hotel Camino Real Polanco y el Hotel Nikko. Menciona el código <strong>CONV2024</strong> al reservar.</p>
    `,
    category: 'noticias',
    date: '2026-04-01',
    author: 'Comité Organizador',
    readTime: 4,
    isFeatured: true,
  },
  {
    id: 'pg-005',
    title: 'Programa de formación continua 2025',
    excerpt: 'Catálogo completo de cursos, talleres, diplomados y certificaciones disponibles para asociados durante 2025.',
    content: `
      <h2>Filosofía de formación</h2>
      <p>Creemos que el aprendizaje continuo es el motor del desarrollo personal y organizacional. Por ello, ofrecemos un programa robusto de formación alineado con las tendencias del mercado y las necesidades de nuestros asociados.</p>
      <h2>Oferta 2025</h2>
      <h3>Diplomados</h3>
      <ul>
        <li>Dirección estratégica para PyMEs (80 horas)</li>
        <li>Transformación digital y tecnología aplicada (60 horas)</li>
        <li>Liderazgo y gestión del cambio (48 horas)</li>
      </ul>
      <h3>Talleres presenciales</h3>
      <ul>
        <li>Finanzas para no financieros</li>
        <li>Comunicación efectiva y presentaciones ejecutivas</li>
        <li>Gestión de proyectos con metodologías ágiles</li>
      </ul>
      <h3>Webinars mensuales</h3>
      <p>Cada mes organizamos al menos 2 webinars gratuitos con expertos del sector. Consulta el calendario en la sección Agenda.</p>
      <h2>Certificaciones</h2>
      <p>Algunos programas ofrecen certificación con validez oficial en colaboración con instituciones educativas de prestigio.</p>
    `,
    category: 'beneficios',
    date: '2026-01-05',
    author: 'Área de Capacitación',
    readTime: 5,
  },
]
