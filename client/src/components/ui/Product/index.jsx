import './Product.css'

export default function Product ({ id, name, image, price }) {
  return (
    <li className='product'>
      <div className='product-image'>
        <img src={image} alt={name} />
      </div>
      <div className='product-content'>
        <p className='product-name'>{name}</p>
        <strong className='product-price'>$ {price}</strong>
        <br />
        <button className='add-to-cart-button'>Agregar</button>
      </div>
    </li>
  )
}