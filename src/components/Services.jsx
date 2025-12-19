import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ServiceFullScreen from './ServiceFullScreen';

const services = [
  {
    id: 'consultoria',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Consultoría Estratégica',
    subtitle: 'Visión & Futuro',
    description: 'Transformamos tu visión corporativa en una estrategia tecnológica accionable. Desde la evaluación de infraestructura hasta la implementación de hojas de ruta digitales, aseguramos que cada inversión tecnológica impulse tus objetivos de negocio y escalabilidad a largo plazo.',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'desarrollo',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Desarrollo de Software',
    subtitle: 'Código de Alto Calibre',
    description: 'Ingeniería de software de clase mundial. Creamos aplicaciones web, móviles y sistemas empresariales a medida utilizando arquitecturas de microservicios y las tecnologías más modernas, garantizando rendimiento, seguridad y una experiencia de usuario impecable.',
    color: 'from-violet-600 to-purple-600'
  },
  {
    id: 'ia',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Ciencia de Datos & IA',
    subtitle: 'Inteligencia Aplicada',
    description: 'Convierte tus datos en tu activo más valioso. Implementamos modelos de Machine Learning, automatización inteligente y análisis predictivo para optimizar la toma de decisiones, predecir tendencias de mercado y automatizar procesos operativos complejos.',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'marketing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    title: 'Marketing Digital',
    subtitle: 'Crecimiento & Alcance',
    description: 'Impulsa tu presencia digital y maximiza tu ROI. Ofrecemos gestión integral de campañas, SEO/SEM avanzado, marketing de contenidos y estrategias de crecimiento para conectar tu marca con la audiencia correcta en el momento perfecto.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'seguridad',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.85.564-4.14C5.7 4.295 8.656 2.373 12.062 2.373a9.8 9.8 0 014.288.98M9 4.868L6.012 3m0 0l2.988 1.868" />
      </svg>
    ),
    title: 'Ciberseguridad',
    subtitle: 'Protección Total',
    description: 'Protección integral para tu ecosistema digital. Desplegamos estrategias de defensa en profundidad, desde pruebas de penetración y auditorías de seguridad hasta la implementación de centros de operaciones de seguridad y respuesta a incidentes en tiempo real.',
    color: 'from-red-600 to-orange-600'
  },
  {
    id: 'diseno',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'UX/UI & Plataformas',
    subtitle: 'Experiencias Científicas',
    description: 'Diseño centrado en el humano que cautiva y convierte. Creamos experiencias digitales intuitivas y sistemas de gestión de contenido (CMS) optimizados, especializándonos también en plataformas académicas y revistas científicas de alto impacto.',
    color: 'from-orange-500 to-amber-500'
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1); // Start focused on the second item or purely center

  const handleCardClick = (index, id) => {
    if (activeIndex === index) {
      setSelectedServiceId(id);
      setFullscreenOpen(true);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <>
      <section ref={sectionRef} id="servicios" className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mb-10">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 md:mb-4 block">Nuestras Capacidades</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Ecosistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Digital.</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-xl max-w-2xl mx-auto">
              Soluciones integrales diseñadas para el crecimiento. Haz clic en una tarjeta para expandir los detalles.
            </p>
          </motion.div>
        </div>

        {/* Focused Layout Component */}
        <div className="w-full max-w-[1400px] mx-auto px-4 relative flex flex-col items-center justify-center">

          {/* Desktop/Tablet Horizontal Layout */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-6 w-full perspective-1000">
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              const distance = Math.abs(activeIndex - index);

              // Simple scale logic based on distance
              const scale = isActive ? 1.05 : Math.max(0.90 - (distance * 0.05), 0.80);
              const opacity = isActive ? 1 : Math.max(0.8 - (distance * 0.1), 0.5);
              const zIndex = 50 - distance;

              return (
                <motion.div
                  key={service.id}
                  layout
                  className={`
                                relative rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer
                                ${isActive
                      ? 'w-full md:w-[450px] lg:w-[500px] min-h-[450px] md:min-h-[500px] bg-white/[0.08] border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.15)]'
                      : 'w-full md:w-[220px] lg:w-[240px] h-[100px] md:h-[400px] bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                    }
                                flex flex-col flex-shrink-0
                            `}
                  style={{
                    zIndex,
                    opacity: isActive || distance < 3 ? 1 : 0.5 // Keep visible but faded if far
                  }}
                  animate={{
                    flexGrow: isActive ? 2 : 0,
                    scale: window.innerWidth > 768 ? scale : 1, // On mobile, stack them normally or use different logic
                    opacity: window.innerWidth > 768 ? opacity : 1
                  }}
                  onClick={() => handleCardClick(index, service.id)}
                >
                  {/* Gradient Background for Active */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 ${isActive ? 'opacity-10' : ''} transition-opacity duration-700 pointer-events-none`} />

                  <div className={`p-6 md:p-8 flex flex-col h-full justify-between items-center text-center md:text-left`}>

                    {/* Header Area */}
                    <div className={`flex w-full ${isActive ? 'flex-row justify-between items-start' : 'flex-col items-center gap-4'}`}>
                      <div className={`
                                        rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg transition-all duration-500 flex-shrink-0
                                        ${isActive ? 'w-16 h-16' : 'w-12 h-12 mb-2'}
                                    `}>
                        <div className={`${isActive ? 'w-8 h-8' : 'w-6 h-6'}`}>
                          {service.icon}
                        </div>
                      </div>

                      {/* Inactive State Content: Title and Short Description */}
                      {!isActive && (
                        <div className="hidden md:flex flex-col items-center text-center w-full">
                          <h4 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2 h-[3.25rem] flex items-center justify-center">
                            {service.title}
                          </h4>
                          <p className="text-gray-400 text-xs w-full line-clamp-4">
                            {service.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Content Area (Only visible when active OR mobile) */}
                    <motion.div
                      className={`mt-4 w-full ${isActive ? 'block' : 'hidden md:hidden'}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2 block">{service.subtitle}</span>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{service.title}</h3>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 line-clamp-4 md:line-clamp-none">
                        {service.description}
                      </p>

                      <div className="flex items-center text-cyan-400 font-semibold group cursor-pointer hover:text-cyan-300 transition-colors">
                        <span className="mr-2 text-sm uppercase tracking-wider">Ver detalles completos</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                    </motion.div>

                    {/* Mobile Title when collapsed (though on mobile we probably just show cards stacked) */}
                    <div className={`md:hidden ${isActive ? 'hidden' : 'block text-center mt-2'}`}>
                      <h3 className="text-lg font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination/Indicators */}
          <div className="flex gap-2 mt-8 md:mt-12 justify-center">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-cyan-400' : 'bg-gray-600 hover:bg-gray-500'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      <ServiceFullScreen
        isOpen={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        service={selectedServiceId}
      />
    </>
  );
};

export default Services;