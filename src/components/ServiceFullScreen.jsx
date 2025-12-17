import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

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
          icon: '📋',
          title: 'Diagnóstico Tecnológico Integral',
          description: 'Evaluación completa de tu infraestructura actual, identificando fortalezas, debilidades y oportunidades de mejora. Analizamos sistemas, procesos y capacidades técnicas para crear un mapa detallado de tu situación tecnológica.'
        },
        {
          icon: '🗺️',
          title: 'Hoja de Ruta de Transformación Digital',
          description: 'Planificación estratégica detallada con fases, hitos y métricas de éxito para tu evolución tecnológica. Definimos prioridades, presupuestos y cronogramas realistas alineados con tus objetivos de negocio.'
        },
        {
          icon: '👥',
          title: 'PMO (Project Management Office)',
          description: 'Gestión profesional de proyectos con metodologías ágiles, asegurando entregas a tiempo y dentro del presupuesto. Coordinamos equipos, gestionamos riesgos y mantenemos comunicación constante con stakeholders.'
        },
        {
          icon: '📚',
          title: 'Asesoría de Tesis y Proyectos Académicos',
          description: 'Acompañamiento especializado en proyectos de investigación y desarrollo tecnológico académico. Orientamos en metodologías, arquitecturas y mejores prácticas para proyectos de grado y posgrado en áreas tecnológicas.'
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
      intro: 'Cada negocio es único y merece soluciones tecnológicas diseñadas específicamente para sus desafíos. Nuestro equipo de ingenieros expertos desarrolla aplicaciones web y móviles de alto rendimiento, moderniza sistemas legacy y construye arquitecturas escalables que crecen con tu empresa.',
      servicios: [
        {
          icon: '🌐',
          title: 'Aplicaciones Web Empresariales (CRM/ERP)',
          description: 'Sistemas personalizados para gestión de clientes, recursos empresariales y procesos de negocio específicos. Desarrollamos plataformas web robustas con tecnologías modernas que optimizan tus operaciones.'
        },
        {
          icon: '📱',
          title: 'Aplicaciones Móviles Nativas',
          description: 'Desarrollo de apps iOS y Android con rendimiento óptimo y experiencia de usuario excepcional. Aprovechamos las capacidades nativas de cada plataforma para crear aplicaciones rápidas e intuitivas.'
        },
        {
          icon: '🔄',
          title: 'Modernización de Sistemas Legacy',
          description: 'Actualización y migración de sistemas antiguos a tecnologías modernas sin perder funcionalidad crítica. Transformamos aplicaciones obsoletas en soluciones ágiles y mantenibles.'
        },
        {
          icon: '🏗️',
          title: 'Arquitectura de Microservicios',
          description: 'Diseño de sistemas distribuidos escalables y resilientes para aplicaciones empresariales complejas. Implementamos arquitecturas modernas que facilitan el mantenimiento y la evolución continua.'
        },
        {
          icon: '⚙️',
          title: 'DevOps y CI/CD',
          description: 'Implementación de pipelines de integración y despliegue continuo para entregas rápidas y confiables. Automatizamos procesos de testing, build y deployment para maximizar la eficiencia.'
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
      intro: 'La inteligencia artificial ya no es el futuro, es el presente. Ayudamos a las empresas a aprovechar el poder de la IA y el machine learning para automatizar procesos, obtener insights valiosos de sus datos y tomar decisiones más informadas.',
      servicios: [
        {
          icon: '🤖',
          title: 'Integración de Herramientas de IA y Machine Learning',
          description: 'Implementación de modelos de ML personalizados para predicción, clasificación y análisis de datos. Desarrollamos soluciones de IA adaptadas a tus necesidades específicas de negocio.'
        },
        {
          icon: '📊',
          title: 'Analítica Predictiva y Big Data',
          description: 'Procesamiento y análisis de grandes volúmenes de datos para obtener insights accionables. Transformamos tus datos en ventajas competitivas mediante análisis avanzados y visualizaciones inteligentes.'
        },
        {
          icon: '⚡',
          title: 'Automatización Inteligente (IPA/RPA)',
          description: 'Automatización de procesos repetitivos con inteligencia artificial para mayor eficiencia operativa. Liberamos a tu equipo de tareas manuales para que se enfoquen en actividades de mayor valor.'
        },
        {
          icon: '🎓',
          title: 'Programas de Capacitación Técnica',
          description: 'Formación especializada en tecnologías emergentes, desarrollo de software y mejores prácticas. Transferimos conocimiento para que tu equipo pueda mantener y evolucionar las soluciones implementadas.'
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
      intro: 'En un mundo cada vez más conectado, la seguridad y el rendimiento de tu infraestructura de red son críticos. Diseñamos, implementamos y gestionamos redes empresariales de alto rendimiento mientras protegemos tus activos digitales contra amenazas cibernéticas.',
      servicios: [
        {
          icon: '🌐',
          title: 'Diseño y Optimización de Redes Empresariales',
          description: 'Arquitectura de red escalable y de alto rendimiento adaptada a las necesidades de tu organización. Diseñamos topologías eficientes que garantizan conectividad confiable y rápida.'
        },
        {
          icon: '☁️',
          title: 'Servicios Cloud y DevOps',
          description: 'Migración, gestión y optimización de infraestructura en la nube (AWS, Azure, GCP). Implementamos soluciones cloud que reducen costos y aumentan la flexibilidad operativa.'
        },
        {
          icon: '🔍',
          title: 'Auditoría de Ciberseguridad',
          description: 'Evaluación exhaustiva de vulnerabilidades y riesgos de seguridad en tu infraestructura. Identificamos puntos débiles y proporcionamos recomendaciones accionables para fortalecer tu postura de seguridad.'
        },
        {
          icon: '🔒',
          title: 'Implementación de Protocolos de Seguridad',
          description: 'Despliegue de medidas de seguridad avanzadas: firewalls, VPN, autenticación multifactor, encriptación. Protegemos tus datos y sistemas contra accesos no autorizados.'
        },
        {
          icon: '🔬',
          title: 'Recuperación y Análisis Forense',
          description: 'Investigación de incidentes de seguridad y recuperación de sistemas comprometidos. Analizamos brechas de seguridad, recuperamos datos y establecemos medidas preventivas.'
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
      intro: 'En la era digital, tu sitio web es la cara de tu negocio. Diseñamos experiencias web que no solo se ven increíbles, sino que convierten visitantes en clientes. Combinamos diseño UX/UI de vanguardia con sistemas de gestión de contenidos potentes.',
      servicios: [
        {
          icon: '🎨',
          title: 'Diseño Web UX/UI de Alto Impacto',
          description: 'Interfaces modernas, intuitivas y centradas en el usuario que convierten visitantes en clientes. Diseñamos experiencias digitales que reflejan la identidad de tu marca y optimizan la conversión.'
        },
        {
          icon: '📝',
          title: 'Implementación y Personalización de CMS',
          description: 'Desarrollo de sitios web con WordPress, Drupal y otros CMS, totalmente personalizados. Te damos el control total sobre tu contenido con interfaces fáciles de usar.'
        },
        {
          icon: '📚',
          title: 'Gestión de Plataformas LMS',
          description: 'Implementación y personalización de sistemas de gestión de aprendizaje (Moodle, Canvas). Creamos plataformas educativas completas para capacitación corporativa o educación en línea.'
        },
        {
          icon: '⚡',
          title: 'Optimización SEO y Performance',
          description: 'Mejora de posicionamiento en buscadores y optimización de velocidad de carga. Aseguramos que tu sitio sea encontrado por tu audiencia y ofrezca una experiencia rápida y fluida.'
        }
      ],
      beneficios: [
        'Investigación: Entendemos tu negocio, audiencia y competencia',
        'Diseño: Creamos wireframes y prototipos interactivos',
        'Desarrollo: Construimos tu sitio con código limpio y optimizado',
        'Lanzamiento: Desplegamos y monitoreamos el rendimiento'
      ]
    }
  };

  if (!service || !serviceData[service]) return null;

  const data = serviceData[service];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Navbar Fija */}
          <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  X
                </div>
                <span className="text-2xl font-bold text-primary">XPERTIA</span>
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={onClose}
                  className="text-gray-600 hover:text-primary font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver al Inicio
                </motion.button>
                <motion.a
                  href="#contacto"
                  onClick={onClose}
                  className="px-6 py-2 bg-accent text-white rounded-full font-semibold hover:bg-accent/90 transition-colors"
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
            className="pt-20 pb-16 bg-gradient-to-br from-primary via-primary-light to-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-5xl mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {data.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                {data.description}
              </p>
            </div>
          </motion.section>

          {/* Descripción General */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6">
              <motion.div
                className="bg-white p-10 rounded-3xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  ¿Por qué necesitas {service === 'consultoria' ? 'consultoría estratégica' : 'este servicio'}?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {data.intro}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Servicios Incluidos */}
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
                Servicios Incluidos
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {data.servicios.map((servicio, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
                      {servicio.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-accent mb-4">
                      {servicio.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {servicio.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Beneficios */}
          <section className="py-16 bg-gradient-to-br from-primary to-primary-light">
            <div className="max-w-5xl mx-auto px-6">
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-10 rounded-3xl border border-white/20"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">
                  {service === 'desarrollo' ? 'Tecnologías que dominamos' : service === 'ia' ? 'Casos de uso de IA' : service === 'redes' ? 'Protección multicapa' : service === 'diseno' ? 'Nuestro proceso de diseño' : 'Beneficios de nuestro servicio'}
                </h2>
                <ul className="space-y-4">
                  {data.beneficios.map((beneficio, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white/10 rounded-xl border-l-4 border-accent"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white text-lg font-medium">{beneficio}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h3 className="text-3xl font-bold text-primary mb-6">
                ¿Listo para transformar tu negocio?
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                Agenda una consulta gratuita y descubre cómo podemos ayudarte
              </p>
              <motion.a
                href="#contacto"
                onClick={onClose}
                className="inline-block px-10 py-4 bg-gradient-to-r from-accent to-blue-500 text-white rounded-full font-bold text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicitar Consulta Gratuita
              </motion.a>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-primary py-12">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-white/80">© 2024 Xpertia. Todos los derechos reservados.</p>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceFullScreen;