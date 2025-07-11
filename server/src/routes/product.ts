import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product";
import { isAdmin, protect } from "../middlewares/authMiddlewar";
import {
  createProductValidator,
  deleteProductValidator,
} from "../validators/product";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post(
  "/products",
  protect,
  isAdmin,
  createProductValidator,
  validateRequest,
  createProduct
);
router.put(
  "/products/:id",
  protect,
  isAdmin,
  updateProduct,
  validateRequest,
  updateProduct
);
router.delete(
  "/products/:id",
  protect,
  isAdmin,
  deleteProductValidator,
  validateRequest,
  deleteProduct
);

export default router;
