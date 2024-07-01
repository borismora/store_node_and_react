import './Cart.css'
import { useId } from 'react'
import { CartIcon, ClearCartIcon } from '../../ui/Icons'
import { useCart } from '../../../hooks/useCart'

function CartItem ({ image, price, name, quantity, addToCart }) {
  return (
    <li>
      <img src={image} alt={name} />
      <div>
        <strong>{name}</strong> {price}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export function Cart () {
  const cartCheckBoxId = useId()
  const { cart, addToCart, clearCart } = useCart()

  return (
    <>
      <label htmlFor={cartCheckBoxId} className='cart-button'>
        <CartIcon />
      </label>
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

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}