import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role, // include role
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ✅ Register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password }); // default role=user

    res.status(201).json({
      message: "Registration successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
};

// ✅ Login user
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user),
      });
    }

    res.status(401).json({ message: "Invalid email or password" });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

// ✅ Get logged-in user info
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};
