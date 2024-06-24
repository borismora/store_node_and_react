import './Profile.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import useOrders from '../../hooks/useOrders'
import ListOrders from '../../components/modules/ListOrders'
import Spinner from '../../components/ui/Spinner'

export default function Profile () {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { getOrders } = useOrders()

  useEffect(() => {
    setLoading(true)
    if (user === null) {
      window.location.href = '/login'
    }
    else {
      fetchOrders()
    }
    setLoading(false)
  }, [user, setOrders])

  async function fetchOrders () {
    const response = await getOrders()
    setOrders(response)
  }

  return (
    <div className='profile'>
      <div className='profile-header'>
        <h1>Mi Perfil</h1>
      </div>
      <div className='profile-container'>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="profile-orders">
        <h3>Mis Pedidos</h3>
        {loading ? (
          <Spinner />
        ) : orders.length > 0 ? (
          <ListOrders orders={orders} />
        ) : (
          <p>No hay pedidos registrados</p>
        )}
      </div>
    </div>
  )
}
