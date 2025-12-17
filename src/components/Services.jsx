import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ServiceFullScreen from './ServiceFullScreen';


const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Consultoría Estratégica',
      subtitle: 'Visión & Futuro',
      description: 'Transformamos tu visión en una hoja de ruta tecnológica viable y escalable.',
      color: 'from-blue-600 to-indigo-600',
      id: 'consultoria'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Desarrollo de Software',
      subtitle: 'Código de Alto Calibre',
      description: 'Arquitecturas robustas, microservicios y aplicaciones web de vanguardia.',
      color: 'from-violet-600 to-purple-600',
      id: 'desarrollo'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Ciencia de Datos & IA',
      subtitle: 'Inteligencia Aplicada',
      description: 'Modelos predictivos y automatización inteligente para toma de decisiones.',
      color: 'from-emerald-500 to-teal-500',
      id: 'ia'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.85.564-4.14C5.7 4.295 8.656 2.373 12.062 2.373a9.8 9.8 0 014.288.98M9 4.868L6.012 3m0 0l2.988 1.868" />
        </svg>
      ),
      title: 'Ciberseguridad',
      subtitle: 'Protección Total',
      description: 'Estrategias ofensivas y defensivas para blindar sus activos digitales.',
      color: 'from-rose-600 to-pink-600',
      id: 'seguridad'
    },
    {
       icon: (
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
         </svg>
       ),
       title: 'Diseño UX/UI',
       subtitle: 'Experiencias Memorables',
       description: 'Interfaces que cautivan y retienen a sus usuarios desde el primer clic.',
       color: 'from-orange-500 to-amber-500',
       id: 'diseno'
    }
];

const ServiceCard = ({ service, openFullscreen, index }) => {
    return (
        <motion.div 
            className="group relative min-h-[320px] sm:min-h-[360px] md:min-h-[400px] w-[280px] sm:w-[300px] md:w-[340px] lg:w-[380px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-500 hover:border-cyan-500/50 hover:bg-white/[0.08] flex flex-col justify-between p-5 sm:p-6 md:p-8"
            onClick={() => openFullscreen(service.id)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
        >
            {/* Gradient Background Effect on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`} />
            
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl transition-all duration-500 group-hover:bg-cyan-500/40 pointer-events-none" />

            <div className="relative z-10">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 md:mb-5 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                        {service.icon}
                    </div>
                </div>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-cyan-400 uppercase mb-1 sm:mb-2 block">{service.subtitle}</span>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3 leading-tight group-hover:text-cyan-300 transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                    {service.description}
                </p>
            </div>
            
            <div className="relative z-10 flex items-center text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform duration-300 mt-4 md:mt-6">
                <span className="mr-2 text-xs sm:text-sm uppercase tracking-wider">Explorar</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
        </motion.div>
    );
};

const Services = () => {
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openFullscreen = (serviceId) => {
    setSelectedService(serviceId);
    setFullscreenOpen(true);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section ref={sectionRef} id="servicios" className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div 
            className="text-center mb-8 sm:mb-12 md:mb-16 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 md:mb-4 block">Nuestras Capacidades</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 md:mb-6 leading-tight">
              Ecosistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Digital.</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
              Soluciones integrales de tecnología para impulsar tu negocio al siguiente nivel.
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-2 sm:gap-3 mb-6 md:mb-8">
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Cards Container - FUNCIONA CON SCROLL HORIZONTAL NATIVO */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-12 scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Spacer inicial */}
          <div className="flex-shrink-0 w-4 md:w-20" />
          
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              openFullscreen={openFullscreen}
              index={index}
            />
          ))}
          
          {/* Card final de Call to Action */}
          <motion.div 
            className="min-h-[400px] w-[320px] md:w-[380px] flex-shrink-0 flex items-center justify-center rounded-3xl border-2 border-dashed border-white/20 bg-white/[0.02] backdrop-blur-sm hover:border-cyan-400/50 transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">¿Tienes un Desafío?</h3>
              <p className="text-gray-400 mb-6 text-sm">Construyamos algo extraordinario juntos.</p>
              <a 
                href="#contacto"
                className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
              >
                Iniciar Proyecto
              </a>
            </div>
          </motion.div>
          
          {/* Spacer final */}
          <div className="flex-shrink-0 w-4 md:w-20" />
        </div>

        {/* Scroll hint */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Desliza para ver más servicios
          </p>
        </div>
      </section>
      
      <ServiceFullScreen
        isOpen={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        service={selectedService}
      />
    </>
  );
};

export default Services;