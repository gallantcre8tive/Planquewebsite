/** @format */

// backend/src/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // For password reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and set reset token (stored as hashed token)
userSchema.methods.createPasswordResetToken = function () {
  // raw token sent in email
  const resetToken = crypto.randomBytes(32).toString("hex");

  // store hashed version in DB
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // expire in 1 hour
  this.resetPasswordExpire = Date.now() + 60 * 60 * 1000;

  return resetToken; // return raw token to include in email link
};

module.exports = mongoose.model("User", userSchema);
