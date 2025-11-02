/** @format */

const express = require("express");
const router = express.Router();
const {
  createFilter,
  getFilters,
  deleteFilter,
} = require("../controllers/filterController");

// Add filter
router.post("/", createFilter);

// Get all filters
router.get("/", getFilters);

// Delete filter
router.delete("/:id", deleteFilter);

module.exports = router;
