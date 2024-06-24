import Order from '../models/order';
import JwtService from '../services/jwt.service';

const orderController = {

  get: async (req, res, next) => {
    try {
      // Extraer el token del header
      const token = JwtService.jwtGetToken(req);
      console.log("Token:", token); // Log del token

      // Verificar y decodificar el token
      const decoded = JwtService.jwtVerify(token);
      console.log("Decoded Token:", decoded); // Log del token decodificado

      // Obtener el userId del token decodificado
      const userId = decoded.userId;
      console.log("User ID:", userId); // Log del userId

      // Verificar que userId no es undefined
      if (!userId) {
        throw new Error('User ID not found in token');
      }

      // Buscar los pedidos del usuario
      const orders = await Order.findAll({
        where: { userId }
      });

      return res.status(200).json(orders);
    } catch (error) {
      console.error("Error in get orders:", error); // Log del error
      next(error);
    }
  },

  add: async (req, res, next) => {
    try {
      console.log(req.body)
      const order = await Order.create(req.body);
      setTimeout(updateOrderStatus, 10000, order, 'pending');

      return res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      await order.update(req.body);
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },
};

function updateOrderStatus (order, status) {
  order.update({ status: status });

  if (status !== 'completed') {
    setTimeout(updateOrderStatus, 10000, order, 'completed');
  }
}

export default orderController