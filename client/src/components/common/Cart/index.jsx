import './Cart.css'
import { useEffect, useId, useState } from 'react'
import { CartIcon, ClearCartIcon } from '../../ui/Icons'
import { useCart } from '../../../hooks/useCart'
import { LButton, AButton } from '../../ui/Button'

function CartItem ({ image, price, name, quantity, removeFromCart, addToCart }) {
  return (
    <li>
      <img src={image} alt={name} />
      <div className='cart-title'>
        <strong>{name}</strong>
        <br /> ${price}
      </div>

      <footer>
        <small>Cantidad: {quantity}</small>
        <button onClick={removeFromCart} className='remove-button'>-</button>
        <button onClick={addToCart} className='add-button'>+</button>
      </footer>
    </li>
  )
}

function cartQuantity (cart) {
  return cart.reduce((total, product) => total + product.quantity, 0)
}

export function Cart () {
  const cartCheckBoxId = useId()
  const { cart, removeFromCart, addToCart, clearCart } = useCart()
  const itemsQuantity = cartQuantity(cart)
  const [isCartVisible, setIsCartVisible] = useState(false) // Estado para controlar visibilidad del carrito

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    clearCart()

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      parsedCart.map((product) => {
        for (let i = 0; i < product.quantity; i++) {
          addToCart(product)
        }
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    function handleClickOutside (event) {
      const cartElement = document.querySelector('.cart')
      if (cartElement && !cartElement.contains(event.target)) {
        setIsCartVisible(false)
      }
    }

    if (isCartVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCartVisible])

  return (
    <>
      <LButton
        params={{
          className: 'cart-button navbar-button',
          htmlFor: cartCheckBoxId,
          title: (
            <>
              <CartIcon />
              {itemsQuantity}
            </>
          ),
          onClick: () => setIsCartVisible(!isCartVisible)
        }}
      />
      <input type="checkbox" id={cartCheckBoxId} hidden />

      {isCartVisible && (
        <aside className='cart'>
          <ul>
            {cart.map((product) => (
              <CartItem
                key={`cart-item-${product.id}`}
                {...product}
                removeFromCart={() => removeFromCart(product)}
                addToCart={() => addToCart(product)}
              />
            ))}
          </ul>

          <div className='clear-button-content'>
            <button onClick={clearCart} className='clear-button'>
              <ClearCartIcon />
            </button>

            <AButton
              params={{
                className: 'navbar-button',
                title: 'Completar',
                ...(cart.length > 0 && { href: '/checkout' })
              }}
              style={{ marginLeft: 'auto' }}
            />
          </div>
        </aside>
      )}
    </>
  )
}
