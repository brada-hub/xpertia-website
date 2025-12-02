import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pilares from './components/Pilares'
import Diferencial from './components/Diferencial'
import Services from './components/Services'
import Proceso from './components/Proceso'
import Equipo from './components/Equipo'
import Contacto from './components/Contacto'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-primary text-white selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />
      <Pilares />
      <Diferencial />
      <Services />
      <Proceso />
      <Equipo />
      <Contacto />
      <Footer />
    </div>
  )
}

export default App
