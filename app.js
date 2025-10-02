// Load environment variables first
require('dotenv').config();

const express = require("express");
const app = express();
const blogRouter = require("./routes/BlogRoutes");
const mongoose = require("mongoose");

// Middleware
app.use(express.json());

// MongoDB Atlas connection string
const DB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.MONGODB_TEST_URI || "mongodb+srv://mrechy_db_user:2CiliFVkHYhy0hNs@cluster0.g8lmlkx.mongodb.net/test_blog?retryWrites=true&w=majority&appName=Cluster0"
  : process.env.MONGODB_URI;

// Configure mongoose connection
mongoose
  .connect(DB_URI)
  .then(() => console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Routes
app.use("/api/blogs", blogRouter);

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;