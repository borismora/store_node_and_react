import Order from '../models/order';

const orderController = {

  get: async (req, res, next) => {
    try {
      const orders = await Order.findAll({});
      return res.status(200).json(orders);
    } catch (error) {
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

function updateOrderStatus(order, status) {
  order.update({ status: status });
  
  if (status !== 'completed') {
    setTimeout(updateOrderStatus, 10000, order, 'completed');
  }
}

export default orderController