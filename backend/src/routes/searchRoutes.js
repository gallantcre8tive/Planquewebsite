/** @format */

const express = require("express");
const { searchListings } = require("../controllers/searchController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/search?country=UK&brand=Nike&size=M&keyword=shoes
router.get("/", protect, searchListings);

module.exports = router;
