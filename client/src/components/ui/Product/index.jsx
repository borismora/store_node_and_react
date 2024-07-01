import './Product.css'
import formatPrice from '../../../utils/formatPrice'
import { Button } from '../Button'
import { AddToCartIcon, RemoveFromCartIcon } from '../Icons'
import { useCart } from '../../../hooks/useCart'

export default function Product ({ id, name, image, price }) {
  const { cart, addToCart, removeFromCart } = useCart()

  const isProductInCart = cart.some(item => item.id === id)

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
            title: isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />,
            onClick: () => {
              isProductInCart ? removeFromCart(id) : addToCart({ id, name, image, price })
            }
          }}
        />
      </div>
    </li>
  )
}