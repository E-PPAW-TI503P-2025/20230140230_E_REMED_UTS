const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());

// ===== STATIC FRONTEND =====
app.use(express.static(path.join(__dirname, "public")));

// ===== ROUTES =====
const bookRoutes = require("./routes/book.routes");
const borrowRoutes = require("./routes/borrow.routes");

// API routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

// Default route (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
