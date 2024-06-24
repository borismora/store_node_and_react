import formatPrice from '../../../utils/formatPrice'

export default function ListOrders ({ orders }) {
  return (
    <div className='profile-container'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Tipo de pago</th>
            <th>Estado</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            orders?.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.createdAt}</td>
                <td>{order.paymentType}</td>
                <td>{order.status}</td>
                <td>$ {formatPrice(Math.floor(order.total))}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}