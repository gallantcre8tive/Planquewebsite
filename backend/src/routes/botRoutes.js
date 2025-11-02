/** @format */

// routes/botRoutes.js
const express = require("express");
const router = express.Router();
const Filter = require("../models/Filter");
const { authenticateToken } = require("../middleware/authMiddleware");

// Save a new filter
router.post("/filters", authenticateToken, async (req, res) => {
  try {
    const { country, brand, size, keyword, active } = req.body;

    const filter = new Filter({
      user: req.user.id,
      country,
      brand,
      size,
      keyword,
      active: active ?? true,
    });

    await filter.save();
    res.status(201).json(filter);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error saving filter", error: err.message });
  }
});

// Get all filters for logged-in user
router.get("/filters", authenticateToken, async (req, res) => {
  try {
    const filters = await Filter.find({ user: req.user.id });
    res.json(filters);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching filters", error: err.message });
  }
});

// Update a filter (activate/deactivate or edit)
router.put("/filters/:id", authenticateToken, async (req, res) => {
  try {
    const updated = await Filter.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Filter not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating filter", error: err.message });
  }
});

// Delete a filter
router.delete("/filters/:id", authenticateToken, async (req, res) => {
  try {
    const deleted = await Filter.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: "Filter not found" });
    res.json({ message: "Filter deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting filter", error: err.message });
  }
});

module.exports = router;
