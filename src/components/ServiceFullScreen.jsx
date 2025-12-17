import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// Iconos SVG profesionales
const icons = {
  clipboard: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
    </svg>
  ),
  map: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  academic: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  mobile: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  refresh: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
  cubes: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  cog: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  cpu: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  ),
  chart: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  bolt: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  cloud: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  lock: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  palette: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  document: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  book: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  sparkles: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
};

const ServiceFullScreen = ({ isOpen, onClose, service }) => {
  // Cerrar con ESC y prevenir scroll
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const serviceData = {
    consultoria: {
      title: 'Asesoramiento Estratégico y Planificación de la Transformación Digital',
      description: 'Guiamos tu organización en el camino hacia la transformación digital con estrategias personalizadas y ejecutables.',
      intro: 'En un entorno empresarial cada vez más digitalizado, contar con una estrategia tecnológica clara y alineada con tus objetivos de negocio es fundamental. Nuestro servicio de consultoría estratégica te ayuda a identificar oportunidades, optimizar procesos y tomar decisiones informadas sobre inversiones tecnológicas.',
      servicios: [
        {
          icon: icons.clipboard,
          title: 'Diagnóstico Tecnológico Integral',
          description: 'Evaluación completa de tu infraestructura actual, identificando fortalezas, debilidades y oportunidades de mejora.'
        },
        {
          icon: icons.map,
          title: 'Hoja de Ruta de Transformación Digital',
          description: 'Planificación estratégica detallada con fases, hitos y métricas de éxito para tu evolución tecnológica.'
        },
        {
          icon: icons.users,
          title: 'PMO (Project Management Office)',
          description: 'Gestión profesional de proyectos con metodologías ágiles, asegurando entregas a tiempo y dentro del presupuesto.'
        },
        {
          icon: icons.academic,
          title: 'Asesoría de Tesis y Proyectos Académicos',
          description: 'Acompañamiento especializado en proyectos de investigación y desarrollo tecnológico académico.'
        }
      ],
      beneficios: [
        'Visión clara del camino tecnológico a seguir',
        'Reducción de riesgos en inversiones tecnológicas',
        'Optimización de recursos y presupuestos',
        'Alineación tecnología-negocio para máximo impacto'
      ]
    },
    desarrollo: {
      title: 'Ingeniería de Soluciones a Medida: Desde la Arquitectura hasta el Despliegue',
      description: 'Desarrollamos software robusto y escalable que se adapta perfectamente a tus necesidades de negocio.',
      intro: 'Cada negocio es único y merece soluciones tecnológicas diseñadas específicamente para sus desafíos. Nuestro equipo de ingenieros expertos desarrolla aplicaciones web y móviles de alto rendimiento.',
      servicios: [
        {
          icon: icons.globe,
          title: 'Aplicaciones Web Empresariales (CRM/ERP)',
          description: 'Sistemas personalizados para gestión de clientes, recursos empresariales y procesos de negocio específicos.'
        },
        {
          icon: icons.mobile,
          title: 'Aplicaciones Móviles Nativas',
          description: 'Desarrollo de apps iOS y Android con rendimiento óptimo y experiencia de usuario excepcional.'
        },
        {
          icon: icons.refresh,
          title: 'Modernización de Sistemas Legacy',
          description: 'Actualización y migración de sistemas antiguos a tecnologías modernas sin perder funcionalidad crítica.'
        },
        {
          icon: icons.cubes,
          title: 'Arquitectura de Microservicios',
          description: 'Diseño de sistemas distribuidos escalables y resilientes para aplicaciones empresariales complejas.'
        },
        {
          icon: icons.cog,
          title: 'DevOps y CI/CD',
          description: 'Implementación de pipelines de integración y despliegue continuo para entregas rápidas y confiables.'
        }
      ],
      beneficios: [
        'Frontend: React, Vue.js, Angular, Next.js',
        'Backend: Node.js, Python, Java, .NET, PHP/Laravel',
        'Móvil: React Native, Flutter, Swift, Kotlin',
        'Bases de Datos: PostgreSQL, MySQL, MongoDB, Redis'
      ]
    },
    ia: {
      title: 'Integración Cognitiva: Automatización, Analítica Avanzada y Transferencia de Conocimiento',
      description: 'Potenciamos tu negocio con inteligencia artificial y automatización inteligente de procesos.',
      intro: 'La inteligencia artificial ya no es el futuro, es el presente. Ayudamos a las empresas a aprovechar el poder de la IA y el machine learning.',
      servicios: [
        {
          icon: icons.cpu,
          title: 'Integración de Herramientas de IA y Machine Learning',
          description: 'Implementación de modelos de ML personalizados para predicción, clasificación y análisis de datos.'
        },
        {
          icon: icons.chart,
          title: 'Analítica Predictiva y Big Data',
          description: 'Procesamiento y análisis de grandes volúmenes de datos para obtener insights accionables.'
        },
        {
          icon: icons.bolt,
          title: 'Automatización Inteligente (IPA/RPA)',
          description: 'Automatización de procesos repetitivos con inteligencia artificial para mayor eficiencia operativa.'
        },
        {
          icon: icons.academic,
          title: 'Programas de Capacitación Técnica',
          description: 'Formación especializada en tecnologías emergentes, desarrollo de software y mejores prácticas.'
        }
      ],
      beneficios: [
        'Chatbots inteligentes para atención al cliente 24/7',
        'Sistemas de recomendación personalizados',
        'Detección de fraude y anomalías en tiempo real',
        'Optimización de procesos mediante análisis predictivo'
      ]
    },
    redes: {
      title: 'Defensa Digital y Arquitectura de Red de Alto Rendimiento',
      description: 'Protegemos tus activos digitales y diseñamos infraestructuras de red robustas y seguras.',
      intro: 'En un mundo cada vez más conectado, la seguridad y el rendimiento de tu infraestructura de red son críticos.',
      servicios: [
        {
          icon: icons.globe,
          title: 'Diseño y Optimización de Redes Empresariales',
          description: 'Arquitectura de red escalable y de alto rendimiento adaptada a las necesidades de tu organización.'
        },
        {
          icon: icons.cloud,
          title: 'Servicios Cloud y DevOps',
          description: 'Migración, gestión y optimización de infraestructura en la nube (AWS, Azure, GCP).'
        },
        {
          icon: icons.search,
          title: 'Auditoría de Ciberseguridad',
          description: 'Evaluación exhaustiva de vulnerabilidades y riesgos de seguridad en tu infraestructura.'
        },
        {
          icon: icons.lock,
          title: 'Implementación de Protocolos de Seguridad',
          description: 'Despliegue de medidas de seguridad avanzadas: firewalls, VPN, autenticación multifactor.'
        },
        {
          icon: icons.shield,
          title: 'Recuperación y Análisis Forense',
          description: 'Investigación de incidentes de seguridad y recuperación de sistemas comprometidos.'
        }
      ],
      beneficios: [
        'Seguridad perimetral con firewalls de última generación',
        'Monitoreo 24/7 de amenazas y anomalías',
        'Respuesta a incidentes rápida y efectiva',
        'Cumplimiento normativo (ISO 27001, GDPR, etc.)'
      ]
    },
    diseno: {
      title: 'Experiencia Digital y Gestión de Contenidos Estratégica',
      description: 'Creamos experiencias digitales memorables y gestionamos tu contenido de manera eficiente.',
      intro: 'En la era digital, tu sitio web es la cara de tu negocio. Diseñamos experiencias web que no solo se ven increíbles, sino que convierten visitantes en clientes.',
      servicios: [
        {
          icon: icons.palette,
          title: 'Diseño Web UX/UI de Alto Impacto',
          description: 'Interfaces modernas, intuitivas y centradas en el usuario que convierten visitantes en clientes.'
        },
        {
          icon: icons.document,
          title: 'Implementación y Personalización de CMS',
          description: 'Desarrollo de sitios web con WordPress, Drupal y otros CMS, totalmente personalizados.'
        },
        {
          icon: icons.book,
          title: 'Gestión de Plataformas LMS',
          description: 'Implementación y personalización de sistemas de gestión de aprendizaje (Moodle, Canvas).'
        },
        {
          icon: icons.sparkles,
          title: 'Optimización SEO y Performance',
          description: 'Mejora de posicionamiento en buscadores y optimización de velocidad de carga.'
        }
      ],
      beneficios: [
        'Investigación: Entendemos tu negocio, audiencia y competencia',
        'Diseño: Creamos wireframes y prototipos interactivos',
        'Desarrollo: Construimos tu sitio con código limpio y optimizado',
        'Lanzamiento: Desplegamos y monitoreamos el rendimiento'
      ]
    },
    seguridad: {
      title: 'Defensa Digital y Arquitectura de Red de Alto Rendimiento',
      description: 'Protegemos tus activos digitales y diseñamos infraestructuras de red robustas y seguras.',
      intro: 'En un mundo cada vez más conectado, la seguridad y el rendimiento de tu infraestructura de red son críticos.',
      servicios: [
        {
          icon: icons.globe,
          title: 'Diseño y Optimización de Redes Empresariales',
          description: 'Arquitectura de red escalable y de alto rendimiento adaptada a las necesidades de tu organización.'
        },
        {
          icon: icons.cloud,
          title: 'Servicios Cloud y DevOps',
          description: 'Migración, gestión y optimización de infraestructura en la nube (AWS, Azure, GCP).'
        },
        {
          icon: icons.search,
          title: 'Auditoría de Ciberseguridad',
          description: 'Evaluación exhaustiva de vulnerabilidades y riesgos de seguridad en tu infraestructura.'
        },
        {
          icon: icons.lock,
          title: 'Implementación de Protocolos de Seguridad',
          description: 'Despliegue de medidas de seguridad avanzadas: firewalls, VPN, autenticación multifactor.'
        }
      ],
      beneficios: [
        'Seguridad perimetral con firewalls de última generación',
        'Monitoreo 24/7 de amenazas y anomalías',
        'Respuesta a incidentes rápida y efectiva',
        'Cumplimiento normativo (ISO 27001, GDPR, etc.)'
      ]
    }
  };

  if (!service || !serviceData[service]) return null;

  const data = serviceData[service];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-slate-950 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Navbar Fija */}
          <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/30">
                  X
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">XPERTIA</span>
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white font-medium flex items-center gap-2 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="hidden sm:inline">Volver</span>
                </motion.button>
                <motion.a
                  href="#contacto"
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contacto
                </motion.a>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <motion.section
            className="pt-20 pb-16 bg-slate-950 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {data.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                {data.description}
              </p>
            </div>
          </motion.section>

          {/* Descripción General */}
          <section className="py-16 bg-slate-950">
            <div className="max-w-5xl mx-auto px-6">
              <motion.div
                className="bg-white/[0.03] border border-white/10 backdrop-blur-sm p-10 rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  ¿Por qué necesitas <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">este servicio</span>?
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {data.intro}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Servicios Incluidos */}
          <section className="py-16 bg-slate-950">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Servicios Incluidos
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {data.servicios.map((servicio, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/[0.03] border border-white/10 backdrop-blur-sm p-8 rounded-2xl group hover:border-cyan-500/30 transition-all"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                      {servicio.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-4">
                      {servicio.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {servicio.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Beneficios */}
          <section className="py-16 bg-slate-900/50">
            <div className="max-w-5xl mx-auto px-6">
              <motion.div
                className="bg-white/[0.03] border border-white/10 backdrop-blur-sm p-10 rounded-3xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">
                  Beneficios Clave
                </h2>
                <ul className="space-y-4">
                  {data.beneficios.map((beneficio, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border-l-4 border-cyan-500 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-200 text-lg font-medium">{beneficio}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/10">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h3 className="text-3xl font-bold text-white mb-6">
                ¿Listo para transformar tu negocio?
              </h3>
              <p className="text-xl text-gray-400 mb-8">
                Agenda una consulta gratuita y descubre cómo podemos ayudarte
              </p>
              <motion.a
                href="#contacto"
                onClick={onClose}
                className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicitar Consulta Gratuita
              </motion.a>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-950 py-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-gray-500">© 2024 Xpertia. Todos los derechos reservados.</p>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceFullScreen;