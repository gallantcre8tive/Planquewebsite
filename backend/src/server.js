/** @format */

const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env vars (assumes server.js inside src/)
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend API is running...");
});

// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// Mount other routes (if you have them)
app.use("/api/filters", require("./routes/filterRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
