import { useEffect, useState } from 'react'
import './Checkout.css'
import mercadopagoLogo from '../../assets/mercadopago.svg'
import { Button } from '../../components/ui/Button'
import useOrders from '../../hooks/useOrders'
import { useAuth } from '../../context/AuthContext'

const buttonTitles = {
  'cash': 'Efectivo',
  'mercado_pago': <img src={mercadopagoLogo} alt='mercado_pago' />,
}

export default function Checkout () {
  const { user } = useAuth()
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  })
  const [activeButton, setActiveButton] = useState(null)
  const [formValues, setFormValues] = useState({
    email: '',
    name: '',
    address: '',
    phone: '',
    total: ''

  })
  const { createOrder } = useOrders()

  const allFieldsFilled = Object.values(formValues).every(value =>
    typeof value === 'number' || (typeof value === 'string' && value.trim() !== '')
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        setCart(JSON.parse(storedCart))
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setFormValues(prevValues => ({
      ...prevValues,
      email: user?.email || '',
      name: user?.name || '',
      total
    }))
  }, [cart, user])

  useEffect(() => {
    console.log(`allFieldsFilled: ${allFieldsFilled}`)
    console.log(`activeButton: ${activeButton}`)
    console.log(Object.values(formValues))
  }, [allFieldsFilled, activeButton])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handlePaymentMethodClick = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveButton(key);
  }

  const is_disabled = !allFieldsFilled || !activeButton

  const handleConfirm = () => {
    const payload = {
      payment_method: activeButton,
      ...formValues,
      items: cart
    }

    const response = createOrder(payload)
    console.log('Confirmar compra')
    console.log(response)
  }

  return (
    <div className='checkout'>
      <form className='checkout-info'>
        <h2>Datos del cliente:</h2>
        <input type='text' name='email' placeholder='Email' required onChange={handleInputChange} value={formValues.email} disabled />
        <input type='text' name='name' placeholder='Nombre' required onChange={handleInputChange} value={formValues.name} disabled />
        <input type='text' name='address' placeholder='Dirección' required onChange={handleInputChange} />
        <input type='text' name='phone' placeholder='Teléfono' required onChange={handleInputChange} />
        <hr />
        <h2>Métodos de pago:</h2>
        <div className='payment-methods'>
          {
            Object.entries(buttonTitles).map(([key, value]) => (
              <Button
                key={`payment_method_${key}`}
                params={{
                  title: value,
                  className: `payment-method ${activeButton === key ? 'active' : ''}`,
                }}
                onClick={(e) => handlePaymentMethodClick(e, key)}
              />
            ))
          }
        </div>
      </form>
      <div className='checkout-cart'>
        {cart.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <br />
            <p className='checkout-price'>${product.price} x {product.quantity}</p>
          </div>
        ))}
        <strong className='checkout-total'>
          Total: ${cart.reduce((total, product) => total + product.price * product.quantity, 0)}
        </strong>
        <button onClick={handleConfirm} disabled={is_disabled} className={is_disabled ? '' : 'checkout-confirm-active'}>
          Confirmar
        </button>
      </div>
    </div>
  )
}
