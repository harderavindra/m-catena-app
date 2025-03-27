import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protected Route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});

export default router;
