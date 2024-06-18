import { Op } from 'sequelize';
import Product from "../models/product";

/**
 * Get paginated products
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const productController = {
  get: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 21;
      const searchTerm = req.query.search || '';
      const offset = (page - 1) * limit;
      const minPrice = parseInt(req.query.minPrice, 10) || 0;
      const category = parseInt(req.query.category) || null;

      const whereClause = {
        name: { [Op.iLike]: `%${searchTerm}%` }, // Usando iLike para búsqueda insensible a mayúsculas y minúsculas
        price: { [Op.gte]: minPrice },
        ...(category !== null && { categoryId: { [Op.eq]: category } })
      };

      const totalProducts = await Product.count({
        where: whereClause
      });

      const products = await Product.findAll({
        limit,
        offset,
        where: whereClause
      });

      const totalPages = Math.ceil(totalProducts / limit);

      res.status(200).json({
        products,
        page: {
          currentPage: page,
          totalPages,
          totalProducts,
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los productos' });
    }
  },
};

export default productController;
