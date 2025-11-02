/** @format */

const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    country: { type: String, enum: ["UK", "PL", "FR"], required: true },
    brand: String,
    size: String,
    keyword: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Filter", filterSchema);
