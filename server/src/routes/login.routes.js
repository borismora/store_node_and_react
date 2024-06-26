import { Router } from "express";
import loginController from "../controllers/login.controller";
import authMiddleware from "../middlewares/auth.middleware";

const loginRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 * 
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Create a new user account with provided name, email, and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

loginRoutes.post('/signup', loginController.signUp);

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 * 
 * /signin:
 *   post:
 *     summary: User signin
 *     description: Authenticate a user based on provided email and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token for authentication.
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
loginRoutes.post("/signin", loginController.signIn);

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 * 
 * /logout:
 *   get:
 *     summary: User logout
 *     description: Log out the currently authenticated user.
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating successful logout.
 *       500:
 *         description: Internal Server Error
 */
loginRoutes.get('/logout', loginController.logout);

loginRoutes.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You are authorized to access this resource' });
});

export { loginRoutes };
