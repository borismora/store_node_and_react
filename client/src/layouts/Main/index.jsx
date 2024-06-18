import './Main.css'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { FiltersProvider } from '../../context/filters'

export default function Main ({ children }) {
  return (
    <FiltersProvider>
      <main className='main'>
        <Navbar />
        <div className="main-content">
          {children}
        </div>
        <Footer />
      </main>
    </FiltersProvider>
  )
}
