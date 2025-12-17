
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Orbs difusos con movimiento lento */}
            <motion.div 
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary/10 blur-[120px]"
                animate={{ 
                    x: [0, 100, 0], 
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1] 
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/10 blur-[150px]"
                animate={{ 
                    x: [0, -100, 0], 
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1] 
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Grid overlay sutil para dar textura tecnica */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
        </div>
    );
};

export default AnimatedBackground;
