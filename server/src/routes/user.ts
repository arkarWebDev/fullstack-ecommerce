import { Router } from "express";
import { login, logout, registerUser } from "../controllers/user";
import { loginValidator, registerValidator } from "../validators/user";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/login", loginValidator, validateRequest, login);
router.post("/logout", logout);

export default router;
