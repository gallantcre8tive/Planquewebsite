/** @format */

const express = require("express");
const router = express.Router();
const {
  createListing,
  getListings,
} = require("../controllers/listingController");

// Add new listing
router.post("/", createListing);

// Get all listings
router.get("/", getListings);

module.exports = router;
