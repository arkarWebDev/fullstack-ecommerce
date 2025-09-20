import { Router } from "express";
import { protect } from "../middlewares/authMiddlewar";
import {
  confirmSessionId,
  createOrderAndCheckOutSession,
} from "../controllers/order";
import {
  confirmSessionIdValidator,
  orderCreateValidator,
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

export default router;
