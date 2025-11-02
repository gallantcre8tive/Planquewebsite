/** @format */

// backend/src/controllers/userController.js
const User = require("../models/User");

// Example: update profile (protected)
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, email } = req.body;
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.json({
      message: "Profile updated",
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { updateProfile };
