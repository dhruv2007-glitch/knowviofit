import { registerUser, verifyEmail, login, logout, } from "../controllers/user.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/verifyemail/:id", verifyEmail);
router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
export default router;
