/** @format */

const Listing = require("../models/Listing");

// @desc Search listings by filters
// @route GET /api/search
// @access Private
exports.searchListings = async (req, res) => {
  try {
    const { country, brand, size, keyword } = req.query;

    // Build query object dynamically
    let query = {};
    if (country) query.country = country;
    if (brand) query.brand = { $regex: brand, $options: "i" };
    if (size) query.size = size;
    if (keyword) query.$text = { $search: keyword }; // text search on indexed fields

    const results = await Listing.find(query).limit(50); // limit for performance
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
