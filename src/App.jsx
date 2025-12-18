import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pilares from './components/Pilares'
import Diferencial from './components/Diferencial'
import Services from './components/Services'
import Proceso from './components/Proceso'
import Equipo from './components/Equipo'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import SocialSidebar from './components/SocialSidebar'
import { useTheme } from './context/ThemeContext'

function App() {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark 
        ? 'bg-primary text-white' 
        : 'bg-slate-50 text-gray-900'
    } selection:bg-accent selection:text-white relative`}>
      <AnimatedBackground />
      <SocialSidebar />
      <div className="relative z-10 font-sans">
        <Navbar />
        <main className="flex flex-col gap-0">
          <Hero />
          
          {/* Sutil Separador */}
          <div className={`h-px w-full max-w-7xl mx-auto ${isDark ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-black/5 to-transparent'}`} />
          
          <div className={isDark ? 'bg-slate-900/20' : 'bg-slate-100/50'}>
            <Pilares />
          </div>

          <div className={`h-px w-full max-w-7xl mx-auto ${isDark ? 'bg-gradient-to-r from-transparent via-accent/10 to-transparent' : 'bg-gradient-to-r from-transparent via-accent/20 to-transparent'}`} />

          <Diferencial />

          <div className={`h-[2px] w-full ${isDark ? 'bg-slate-950' : 'bg-slate-200'}`} />

          <Services />

          <div className={isDark ? 'bg-slate-900/30' : 'bg-slate-100/30'}>
            <Proceso />
          </div>

          <div className={`h-px w-full max-w-4xl mx-auto ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />

          <Equipo />

          <div className={isDark ? 'bg-slate-950' : 'bg-slate-200/50'}>
            <Contacto />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
