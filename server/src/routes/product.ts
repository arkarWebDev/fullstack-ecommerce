import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product";
import { isAdmin, protect } from "../middlewares/authMiddlewar";

const router = Router();

router.post("/products", protect, isAdmin, createProduct);
router.put("/products/:id", protect, isAdmin, updateProduct);
router.delete("/products/:id", protect, isAdmin, deleteProduct);

export default router;
