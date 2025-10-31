import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";

const router = express.Router();

// Authenticated users can view movies
router.get("/", protect, getMovies);

// Admin-only CRUD
router.post("/", protect, adminOnly, createMovie);
router.put("/:id", protect, adminOnly, updateMovie);
router.delete("/:id", protect, adminOnly, deleteMovie);

export default router;
