/** @format */

const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    currency: String,
    country: { type: String, enum: ["UK", "PL", "FR"], required: true },
    url: String,
    image: String,
    seller: String,
    size: String,
    keyword: String, // ✅ add this
    brand: String,
    status: { type: String, default: "available" },
  },
  { timestamps: true }
);

listingSchema.index({ title: "text", brand: "text" });
listingSchema.index({ country: 1, size: 1 });

module.exports = mongoose.model("Listing", listingSchema);
