import './Cart.css'
import { useId } from 'react'
import { CartIcon, ClearCartIcon } from '../../ui/Icons'

export function Cart () {
  const cartCheckBoxId = useId()

  return (
    <>
      <label htmlFor={cartCheckBoxId} className='cart-button'>
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckBoxId} hidden />

      <aside className='cart'>
        <ul>
          <li>
            <img src="https://http2.mlstatic.com/D_NQ_NP_686305-MLU72628561342_112023-O.webp" alt="productoA" />
            <div>
              <strong>ProductoA</strong> $4.499
            </div>

            <footer>
              <small>Qty: 1</small>
              <button>+</button>
            </footer>
          </li>
        </ul>

        <button>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}