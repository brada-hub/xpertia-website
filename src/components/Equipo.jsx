import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Equipo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const team = [
    {
      initials: 'JC',
      name: 'Ing. Jose James Claure Ricaldi',
      role: 'Director de Estrategia y Consultoría (CEO)',
      description: 'Lidera la visión de Xpertia, sirviendo como el principal Asesor Informático en Negocios. Su enfoque es alinear estratégicamente la tecnología con los objetivos de crecimiento del cliente.',
    },
    {
      initials: 'AC',
      name: 'Msc. Ariel Denys Cámara Arze',
      role: 'Director Técnico (CTO) y Arquitecto de Soluciones',
      description: 'Experto en el diseño y construcción de arquitecturas sólidas. Combina su maestría en Redes Informáticas con su rol como Desarrollador Full-Stack.',
    },
    {
      initials: 'HR',
      name: 'Ing. Harold Marco Antonio Rojas Torres',
      role: 'Líder de Calidad y Desarrollo de Software',
      description: 'Es el garante de la excelencia. Su especialización en QUAS (Quality Assurance Systems) asegura que cada línea de código sea robusta y segura.',
    },
    {
      initials: 'JM',
      name: 'Ing. Juan Jose Mamani Via',
      role: 'Especialista en Integración de IA y Desarrollo Senior',
      description: 'Se enfoca en el futuro de las soluciones. Como Desarrollador Full-Stack y Especialista en IA, incorpora inteligencia artificial y automatización avanzada.',
    },
    {
      initials: 'GM',
      name: 'Msc. Gustavo Magariños Camacho',
      role: 'Especialista Líder en Ciberseguridad y Auditoría',
      description: 'Responsable de la protección de los activos digitales. Su expertise en Ciberseguridad lo convierte en el pilar para diseñar sistemas resilientes.',
    },
    {
      initials: 'BP',
      name: 'Brayan David Padilla Siles',
      role: 'Desarrollador Frontend (Especialista en Interfaces)',
      description: 'Especialista en desarrollo frontend y experiencia de usuario. Domina las tecnologías modernas de interfaces web, creando aplicaciones reactivas e intuitivas.',
    },
    {
      initials: 'JS',
      name: 'Juan Pablo Sandagorda',
      role: 'Desarrollador Backend (Especialista en Arquitectura de Datos)',
      description: 'Experto en desarrollo backend y arquitectura de bases de datos. Diseña y construye APIs robustas y sistemas escalables de alto rendimiento.',
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="equipo" className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            La Experiencia Detrás de Xpertia
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            En Xpertia, la experiencia es la base de cada solución. Nuestro equipo multidisciplinario combina la
            visión estratégica con la maestría técnica para impulsar su transformación digital.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all group"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {member.initials}
              </motion.div>
              <h4 className="text-center font-heading font-bold text-primary mb-2 text-lg">
                {member.name}
              </h4>
              <p className="text-center text-accent font-semibold mb-4 text-sm">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Equipo;
