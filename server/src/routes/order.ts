import { Router } from "express";
import { isAdmin, protect } from "../middlewares/authMiddlewar";
import {
  changeOrderStatus,
  confirmSessionId,
  createOrderAndCheckOutSession,
  getAllOrders,
  getOrderByUser,
} from "../controllers/order";
import {
  confirmSessionIdValidator,
  orderCreateValidator,
  orderIdValidator,
  orderStatusValidator,
} from "../validators/order";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-order",
  protect,
  orderCreateValidator,
  validateRequest,
  createOrderAndCheckOutSession
);
router.get(
  "/confirm-order/:session_id",
  protect,
  confirmSessionIdValidator,
  validateRequest,
  confirmSessionId
);
router.get("/orders", protect, getOrderByUser);
router.get("/orders/all", protect, isAdmin, getAllOrders);
router.patch(
  "/orders/:orderId",
  orderIdValidator,
  orderStatusValidator,
  validateRequest,
  protect,
  isAdmin,
  changeOrderStatus
);

export default router;
