import './Cart.css'
import { useEffect, useId } from 'react'
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
          )
        }}
      />
      <input type="checkbox" id={cartCheckBoxId} hidden />

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
              href: '/checkout'
            }}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      </aside>
    </>
  )
}