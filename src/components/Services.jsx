import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import ServiceFullScreen from './ServiceFullScreen';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openFullscreen = (serviceId) => {
    setSelectedService(serviceId);
    setFullscreenOpen(true);
  };

  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Asesoramiento Estratégico',
      description: 'Planificación de la transformación digital con diagnóstico integral, hoja de ruta TI y PMO especializado.',
      gradient: 'from-blue-500 via-cyan-500 to-teal-400',
      features: ['Diagnóstico TI', 'Roadmap Digital', 'PMO Especializado'],
      id: 'consultoria'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Ingeniería de Soluciones',
      description: 'Desarrollo a medida desde la arquitectura hasta el despliegue: aplicaciones web, móviles y modernización de sistemas.',
      gradient: 'from-purple-500 via-pink-500 to-rose-400',
      features: ['Apps Web/Móvil', 'APIs REST', 'Microservicios'],
      id: 'desarrollo'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Integración Cognitiva',
      description: 'Automatización inteligente, analítica avanzada y transferencia de conocimiento con IA y Machine Learning.',
      gradient: 'from-emerald-400 via-green-500 to-lime-400',
      features: ['Machine Learning', 'Procesamiento NLP', 'Computer Vision'],
      id: 'ia'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Defensa Digital',
      description: 'Arquitectura de red de alto rendimiento, ciberseguridad, auditoría y recuperación forense.',
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      features: ['Pentesting', 'SOC 24/7', 'Respuesta Incidentes'],
      id: 'redes'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Experiencia Digital',
      description: 'Diseño web UX/UI de alto impacto y gestión de contenidos estratégica con CMS y LMS personalizados.',
      gradient: 'from-indigo-500 via-purple-500 to-violet-400',
      features: ['UI/UX Design', 'Design System', 'Prototipos'],
      id: 'diseno'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="services" className="py-24 bg-primary relative overflow-hidden" ref={ref}>
      {/* Background mejorado */}
      <div className="absolute inset-0 bg-pattern opacity-20" />
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Servicios</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Soluciones que <span className="text-gradient">Transforman</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tecnología integral diseñada para escalar tu negocio al siguiente nivel.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -10 }}
              onClick={() => openFullscreen(service.id)}
            >
              {/* Card con efectos glass */}
              <div className="relative bg-glass p-8 rounded-3xl h-full border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-accent/50">
                
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                  }}
                  animate={hoveredIndex === index ? {
                    x: ['-100%', '200%'],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />

                {/* Icon con efecto glow */}
                <motion.div
                  className={`relative w-16 h-16 mb-6 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-8 h-8 text-white relative z-10">
                    {service.icon}
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                    animate={hoveredIndex === index ? {
                      scale: [1, 1.3, 1],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    style={{
                      background: `linear-gradient(to bottom right, ${service.gradient})`,
                    }}
                  />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 group-hover:border-accent/30 group-hover:text-accent transition-all"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
                
                {/* CTA */}
                <motion.div
                  className="inline-flex items-center text-accent font-semibold group-hover:text-white transition-colors relative"
                  whileHover={{ x: 5 }}
                >
                  Ver detalles completos
                  <motion.svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={hoveredIndex === index ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Final */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-400 mb-6">¿No encuentras lo que buscas?</p>
          <motion.a
            href="#contacto"
            className="inline-block px-8 py-4 bg-gradient-to-r from-secondary to-accent rounded-full font-bold shadow-glow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Conversemos sobre tu proyecto
          </motion.a>
        </motion.div>
      </div>

      {/* Fullscreen Service View */}
      <ServiceFullScreen
        isOpen={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        service={selectedService}
      />
    </section>
  );
};

export default Services;