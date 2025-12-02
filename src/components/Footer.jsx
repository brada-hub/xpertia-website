import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-blue-500 rounded-lg flex items-center justify-center text-white font-heading font-bold text-xl">
              X
            </div>
            <span className="text-2xl font-bold text-white">XPERTIA</span>
          </motion.div>
          
          <motion.p
            className="text-white/80 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Tu socio tecnológico de confianza
          </motion.p>
          
          <motion.p
            className="text-white/60 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            © 2024 Xpertia. Todos los derechos reservados.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
