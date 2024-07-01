import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export const useCart = () => {
  const cart = useContext(CartContext)

  if (cart === undefined) {
    throw new Error('Cart must be used within a CartProvider')
  }

  return cart
}