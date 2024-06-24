import './Product.css'
import formatPrice from '../../../utils/formatPrice'

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
        <button className='add-to-cart-button'>Agregar</button>
      </div>
    </li>
  )
}