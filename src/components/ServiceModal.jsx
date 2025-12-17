import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const ServiceModal = ({ isOpen, onClose, service }) => {
  // Cerrar con ESC
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

  if (!service) return null;

  const serviceDetails = {
    consultoria: {
      title: 'Asesoramiento Estratégico y Planificación de la Transformación Digital',
      description: 'Guiamos tu organización en el camino hacia la transformación digital con estrategias personalizadas y ejecutables.',
      services: [
        {
          name: 'Diagnóstico Tecnológico Integral',
          description: 'Evaluación completa de tu infraestructura actual, identificando fortalezas, debilidades y oportunidades de mejora.'
        },
        {
          name: 'Hoja de Ruta de Transformación Digital',
          description: 'Planificación estratégica detallada con fases, hitos y métricas de éxito para tu evolución tecnológica.'
        },
        {
          name: 'PMO (Project Management Office)',
          description: 'Gestión profesional de proyectos con metodologías ágiles, asegurando entregas a tiempo y dentro del presupuesto.'
        },
        {
          name: 'Asesoría de Tesis y Proyectos Académicos',
          description: 'Acompañamiento especializado en proyectos de investigación y desarrollo tecnológico académico.'
        }
      ]
    },
    desarrollo: {
      title: 'Ingeniería de Soluciones a Medida: Desde la Arquitectura hasta el Despliegue',
      description: 'Desarrollamos software robusto y escalable que se adapta perfectamente a tus necesidades de negocio.',
      services: [
        {
          name: 'Aplicaciones Web Empresariales (CRM/ERP)',
          description: 'Sistemas personalizados para gestión de clientes, recursos empresariales y procesos de negocio específicos.'
        },
        {
          name: 'Aplicaciones Móviles Nativas',
          description: 'Desarrollo de apps iOS y Android con rendimiento óptimo y experiencia de usuario excepcional.'
        },
        {
          name: 'Modernización de Sistemas Legacy',
          description: 'Actualización y migración de sistemas antiguos a tecnologías modernas sin perder funcionalidad crítica.'
        },
        {
          name: 'Arquitectura de Microservicios',
          description: 'Diseño de sistemas distribuidos escalables y resilientes para aplicaciones empresariales complejas.'
        },
        {
          name: 'DevOps y CI/CD',
          description: 'Implementación de pipelines de integración y despliegue continuo para entregas rápidas y confiables.'
        }
      ]
    },
    ia: {
      title: 'Integración Cognitiva: Automatización, Analítica Avanzada y Transferencia de Conocimiento',
      description: 'Potenciamos tu negocio con inteligencia artificial y automatización inteligente de procesos.',
      services: [
        {
          name: 'Integración de Herramientas de IA y Machine Learning',
          description: 'Implementación de modelos de ML personalizados para predicción, clasificación y análisis de datos.'
        },
        {
          name: 'Analítica Predictiva y Big Data',
          description: 'Procesamiento y análisis de grandes volúmenes de datos para obtener insights accionables.'
        },
        {
          name: 'Automatización Inteligente (IPA/RPA)',
          description: 'Automatización de procesos repetitivos con inteligencia artificial para mayor eficiencia operativa.'
        },
        {
          name: 'Programas de Capacitación Técnica',
          description: 'Formación especializada en tecnologías emergentes, desarrollo de software y mejores prácticas.'
        }
      ]
    },
    redes: {
      title: 'Defensa Digital y Arquitectura de Red de Alto Rendimiento',
      description: 'Protegemos tus activos digitales y diseñamos infraestructuras de red robustas y seguras.',
      services: [
        {
          name: 'Diseño y Optimización de Redes Empresariales',
          description: 'Arquitectura de red escalable y de alto rendimiento adaptada a las necesidades de tu organización.'
        },
        {
          name: 'Servicios Cloud y DevOps',
          description: 'Migración, gestión y optimización de infraestructura en la nube (AWS, Azure, GCP).'
        },
        {
          name: 'Auditoría de Ciberseguridad',
          description: 'Evaluación exhaustiva de vulnerabilidades y riesgos de seguridad en tu infraestructura.'
        },
        {
          name: 'Implementación de Protocolos de Seguridad',
          description: 'Despliegue de medidas de seguridad avanzadas: firewalls, VPN, autenticación multifactor, encriptación.'
        },
        {
          name: 'Recuperación y Análisis Forense',
          description: 'Investigación de incidentes de seguridad y recuperación de sistemas comprometidos.'
        }
      ]
    },
    diseno: {
      title: 'Experiencia Digital y Gestión de Contenidos Estratégica',
      description: 'Creamos experiencias digitales memorables y gestionamos tu contenido de manera eficiente.',
      services: [
        {
          name: 'Diseño Web UX/UI de Alto Impacto',
          description: 'Interfaces modernas, intuitivas y centradas en el usuario que convierten visitantes en clientes.'
        },
        {
          name: 'Implementación y Personalización de CMS',
          description: 'Desarrollo de sitios web con WordPress, Drupal y otros CMS, totalmente personalizados.'
        },
        {
          name: 'Gestión de Plataformas LMS',
          description: 'Implementación y personalización de sistemas de gestión de aprendizaje (Moodle, Canvas).'
        },
        {
          name: 'Optimización SEO y Performance',
          description: 'Mejora de posicionamiento en buscadores y optimización de velocidad de carga.'
        }
      ]
    }
  };

  const currentService = serviceDetails[service];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div
              className="relative bg-primary-light rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="p-8 md:p-12">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white mb-6 pr-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {currentService.title}
                </motion.h2>

                <motion.p
                  className="text-xl text-gray-400 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentService.description}
                </motion.p>

                <h3 className="text-2xl font-bold text-white mb-8">Servicios Incluidos</h3>

                <div className="space-y-6 mb-12">
                  {currentService.services.map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-primary p-6 rounded-2xl border border-white/10 hover:border-accent/30 transition-all"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <h4 className="text-xl font-bold text-accent mb-3">{item.name}</h4>
                      <p className="text-gray-400">{item.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                  <motion.a
                    href="#contacto"
                    onClick={onClose}
                    className="inline-block px-8 py-4 bg-gradient-to-r from-secondary to-accent rounded-full font-bold shadow-glow-lg text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Solicitar Información
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;