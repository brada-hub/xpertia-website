import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary pt-20">
      {/* Background pattern original */}
      <div className="absolute inset-0 bg-pattern opacity-30" />
      
      {/* Orbs con efecto de seguimiento del mouse - TIEMPO REAL */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        animate={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
        transition={{ type: "tween", duration: 0.05, ease: "linear" }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        animate={{
          right: `${100 - mousePosition.x}%`,
          bottom: `${100 - mousePosition.y}%`,
        }}
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, transparent 70%)',
          transform: 'translate(50%, 50%)',
        }}
        transition={{ type: "tween", duration: 0.1, ease: "linear" }}
      />

      {/* Mini X flotantes en lugar de círculos */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-accent/40 font-bold pointer-events-none select-none"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            fontSize: `${10 + Math.random() * 14}px`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        >
          ✕
        </motion.div>
      ))}


      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge animado con X de Xpertia */}
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 opacity-30 animate-ping"></span>
              <span className="relative inline-flex h-6 w-6 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 items-center justify-center text-white font-bold text-xs shadow-lg shadow-cyan-500/30">X</span>
            </span>
            <span className="text-sm text-gray-300">Transformación Digital 2024</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ingeniería de Software
            </motion.span>
            <br />
            <motion.span
              className="text-gradient-premium drop-shadow-lg inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                textShadow: '0 0 80px rgba(79, 70, 229, 0.4)',
              }}
            >
              a la Medida de Tu Visión
            </motion.span>
          </h1>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-10 max-w-3xl mx-auto font-light leading-relaxed px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="font-semibold text-white">Xpertia:</span> Tu socio tecnológico de confianza.
            Transformamos ideas en soluciones digitales robustas. Desde la arquitectura de red
            hasta la inteligencia artificial, diseñamos ecosistemas tecnológicos que impulsan el
            crecimiento de tu negocio.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.a
              href="#contacto"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-secondary to-accent rounded-full font-bold text-sm sm:text-base lg:text-lg tracking-wide w-full sm:w-auto overflow-hidden text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Descubre Cómo Podemos Ayudarte</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-secondary"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 shadow-glow-lg"></div>
            </motion.a>
            
            <motion.a
              href="#servicios"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition-all w-full sm:w-auto backdrop-blur-sm relative overflow-hidden text-sm sm:text-base"
              whileHover={{ scale: 1.05, borderColor: "rgba(0, 217, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Ver Servicios
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.a>
          </motion.div>

          {/* Stats animados */}
          <motion.div
            className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            {[
              { number: '7+', label: 'Expertos' },
              { number: '50+', label: 'Proyectos' },
              { number: '99%', label: 'Satisfacción' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-1 md:mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator mejorado */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center p-1 backdrop-blur-sm bg-white/5">
          <motion.div
            className="w-1.5 h-1.5 bg-accent rounded-full shadow-glow"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;