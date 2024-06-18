import { Router } from 'express';
import productController from '../controllers/product.controller';

const productRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product operations
 * 
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products from the database.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the product.
 *                   price:
 *                     type: number
 *                     description: The price of the product.
 *                   image:
 *                     type: string
 *                     description: The image of the product.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the product was created.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the product was last updated.
 */
productRoutes.get('/products', productController.get);

export default productRoutes
