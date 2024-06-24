import './Main.css'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { FiltersProvider } from '../../context/FiltersContext'
import { AuthProvider } from '../../context/AuthContext'

export default function Main ({ children }) {
  return (
    <AuthProvider>
      <FiltersProvider>
        <main className='main'>
          <Navbar />
          <div className="main-content">
            {children}
          </div>
          <Footer />
        </main>
      </FiltersProvider>
    </AuthProvider>
  )
}
