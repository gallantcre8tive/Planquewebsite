/** @format */

const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// forgot password + reset
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);

router.get("/profile", protect, getProfile);

module.exports = router;
