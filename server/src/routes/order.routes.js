import { Router } from "express";
import orderController from "../controllers/order.controller";
import authMiddleware from "../middlewares/auth.middleware";

const orderRoutes = Router();

orderRoutes.get("/orders", authMiddleware, orderController.get);
orderRoutes.get("/orders/:id", authMiddleware, orderController.getById);
orderRoutes.post("/orders", authMiddleware, orderController.add);

export default orderRoutes;
