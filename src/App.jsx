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

function App() {
  return (
    <div className="min-h-screen bg-primary text-white selection:bg-accent selection:text-white relative">
      <AnimatedBackground />
      <div className="relative z-10 font-sans">
        <Navbar />
        <main className="flex flex-col gap-0">
          <Hero />
          <Pilares />
          <Diferencial />
          <Services />
          <Proceso />
          <Equipo />
          <Contacto />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
