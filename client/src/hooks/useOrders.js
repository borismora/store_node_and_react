import { useAuth } from '../context/AuthContext'
import fetchOrders from '../services/orders'

export default function useOrders () {
  const { token } = useAuth()

  const getOrders = async () => {
    const response = await fetchOrders({ token })
    return response
  }

  return { getOrders }
}