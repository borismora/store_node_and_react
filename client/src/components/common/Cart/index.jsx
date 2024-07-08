import './Cart.css'
import { useId } from 'react'
import { CartIcon, ClearCartIcon } from '../../ui/Icons'
import { useCart } from '../../../hooks/useCart'
import { LButton } from '../../ui/Button'

function CartItem ({ image, price, name, quantity, addToCart }) {
  return (
    <li>
      <img src={image} alt={name} />
      <div className='cart-title'>
        <strong>{name}</strong>
        <br /> ${price}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart} className='add-button'>+</button>
      </footer>
    </li>
  )
}

export function Cart () {
  const cartCheckBoxId = useId()
  const { cart, addToCart, clearCart } = useCart()

  return (
    <>
      <LButton
        params={{
          className: 'cart-button navbar-button',
          htmlFor: cartCheckBoxId,
          title: (
            <>
              <CartIcon />
              0
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
              addToCart={() => addToCart(product)}
            />
          ))}
        </ul>

        <div className='clear-button-content'>
          <button onClick={clearCart} className='clear-button'>
            <ClearCartIcon />
          </button>
        </div>
      </aside>
    </>
  )
}