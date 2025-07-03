import { Router } from "express";
import { login, logout, registerUser } from "../controllers/user";

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);

export default router;
