import express from "express";
import {
  registerUser,
  authUser,
  getMe,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Register (Signup)
router.post("/register", registerUser);

// ✅ Login
router.post("/login", authUser);

// ✅ Get user profile (protected)
router.get("/me", protect, getMe);

export default router;
