const express = require("express");
const app = express();
const blogRouter = require("./routes/BlogRoutes");
const mongoose = require("mongoose");

// Middleware
app.use(express.json());

// Configure mongoose connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/CRUD")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Routes
app.use("/api/blogs", blogRouter);

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;