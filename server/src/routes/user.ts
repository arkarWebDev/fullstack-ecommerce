import { Router } from "express";
import {
  getUserInfo,
  login,
  logout,
  registerUser,
  updateEmailAddress,
  updateName,
  uploadAvatar,
} from "../controllers/user";
import {
  emailUpdateValidator,
  loginValidator,
  nameUpdateValidator,
  registerValidator,
  uploadImageValidator,
} from "../validators/user";
import { validateRequest } from "../middlewares/validateRequest";
import { protect } from "../middlewares/authMiddlewar";

const router = Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/login", loginValidator, validateRequest, login);
router.post("/logout", logout);

router.post(
  "/upload",
  uploadImageValidator,
  validateRequest,
  protect,
  uploadAvatar
);
router.get("/me", protect, getUserInfo);
router.post(
  "/update-email",
  emailUpdateValidator,
  validateRequest,
  protect,
  updateEmailAddress
);
router.post(
  "/update-name",
  nameUpdateValidator,
  validateRequest,
  protect,
  updateName
);
export default router;
