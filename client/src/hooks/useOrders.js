import { useAuth } from '../context/AuthContext'
import { fetchOrders, addOrder } from '../services/orders'

export default function useOrders () {
  const { token } = useAuth()

  const getOrders = async () => {
    const response = await fetchOrders({ token })
    return response
  }

  const createOrder = async (order) => {
    const response = await addOrder({ token, order })
    return response
  }

  return { getOrders, createOrder }
}