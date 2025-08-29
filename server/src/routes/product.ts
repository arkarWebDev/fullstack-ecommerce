import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewArrivalsProducts,
  getProductById,
  getProductsMeta,
  getProductsWithFilters,
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
router.get("/products", getProductsWithFilters);
router.get("/products/new", getNewArrivalsProducts);
router.get("/products/featured", getFeaturedProducts);
router.get("/products/:id", getProductById);
router.get("/filters/meta", getProductsMeta);

export default router;
