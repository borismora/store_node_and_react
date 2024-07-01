import './Main.css'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { Cart } from '../../components/common/Cart'
import { FiltersProvider } from '../../context/FiltersContext'
import { AuthProvider } from '../../context/AuthContext'
import { CartProvider } from '../../context/CartContext'

export default function Main ({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <FiltersProvider>
          <main className='main'>
            <Navbar />
            <div className="main-content">
              <Cart />
              {children}
            </div>
            <Footer />
          </main>
        </FiltersProvider>
      </CartProvider>
    </AuthProvider>
  )
}
