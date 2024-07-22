import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { login, signUp, logoutUser, refreshAccessToken } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", verifyJWT, refreshAccessToken);

export default router;