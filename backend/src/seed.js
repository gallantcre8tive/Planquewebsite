/** @format */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Listing = require("./models/Listing"); // path correct if Listing.js is inside src/models

dotenv.config(); // loads MONGO_URI from .env

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Clear old data (optional, to avoid duplicates)
    await Listing.deleteMany({});

    // Insert sample listings
    await Listing.insertMany([
      {
        brand: "Nike",
        size: "M",
        title: "Grey Cropped Lounge Hoodie",
        price: 45,
        keyword: "hoodie",
        country: "UK",
        url: "https://www.vinted.co.uk/items/6739317944-grey-cropped-lounge-hoodie",
      },
      {
        brand: "Adidas",
        size: "L",
        title: "Adidas Running Shoes",
        price: 70,
        keyword: "shoes",
        country: "UK",
        url: "https://www.vinted.co.uk/items/6287511724-slate-grey-spider-hoodie-size-mens-medium-brand-new?",
      },
      {
        brand: "Zara",
        size: "S",
        title: "Zara Summer Dress",
        price: 35,
        keyword: "dress",
        country: "FR",
        url: "https://www.vinted.co.uk/items/1541321133-men-superdry-hoodie?",
      },
    ]);

    console.log("✅ Sample listings inserted");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error: ", err);
    process.exit(1);
  });
