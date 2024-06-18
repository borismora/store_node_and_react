import Category from '../models/category';

const categoryController = {
  get: async (req, res, next) => {
    try {
      const categories = await Category.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  },
};

export default categoryController
