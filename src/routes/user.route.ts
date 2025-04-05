import {
	registerUser,
	verifyEmail,
	login,
	logout,
	deleteAccount,
} from "../controllers/user.controller";
import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/verifyemail/:id", verifyEmail);
router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
router.get("/deleteuser", authMiddleware, deleteAccount);

export default router;
