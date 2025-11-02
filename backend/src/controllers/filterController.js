/** @format */

const Filter = require("../models/Filter");

// Create new filter
exports.createFilter = async (req, res) => {
  try {
    const filter = new Filter({ ...req.body, user: req.user?.id });
    await filter.save();
    res.status(201).json(filter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all filters for user
exports.getFilters = async (req, res) => {
  try {
    const filters = await Filter.find({ user: req.user?.id });
    res.json(filters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete filter
exports.deleteFilter = async (req, res) => {
  try {
    await Filter.findByIdAndDelete(req.params.id);
    res.json({ message: "Filter deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
