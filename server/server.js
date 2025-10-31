// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// ✅ Dynamic CORS: allow both localhost and production Vercel domain
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend-name.vercel.app", // ← replace with your Vercel frontend URL
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Parse JSON
app.use(express.json({ limit: "10mb" }));

// Root route
app.get("/", (req, res) => {
  res.send("🎬 Movie API is running on Vercel...");
});

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(err.status || 500).json({ message: err.message });
});

// 🚫 NO app.listen() — Vercel handles this automatically
export default app;
