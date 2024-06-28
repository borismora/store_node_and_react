import './Product.css'
import formatPrice from '../../../utils/formatPrice'
import { Button } from '../Button'

export default function Product ({ id, name, image, price }) {
  return (
    <li className='product' key={`product-${id}`}>
      <div className='product-image'>
        <img src={image} alt={name} />
      </div>
      <div className='product-content'>
        <p className='product-name'>{name}</p>
        <strong className='product-price'>$ {formatPrice(price)}</strong>
        <br />
        <Button
          params={{
            className: 'add-to-cart-button',
            title: 'Añadir al carrito'
          }}
        />
      </div>
    </li>
  )
}