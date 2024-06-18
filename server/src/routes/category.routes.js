import { Router } from 'express';
import categoryController from '../controllers/category.controller';

const categoryRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category operations
 * 
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories from the database.
 *     tags: [Categories]
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
 *                     description: The name of the category.
 *                   code:
 *                     type: string
 *                     description: The code of the category.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the product was created.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the product was last updated.
 */
categoryRoutes.get('/categories', categoryController.get);

export default categoryRoutes
