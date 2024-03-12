import { Router } from "express";
import { login, logout, profile, register, verifyToken } from "../controllers/auth.js";
import { authRequire } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema, loginSchema } from "../schemas/auth.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken)

router.get("/profile", authRequire, profile);

export default router;
