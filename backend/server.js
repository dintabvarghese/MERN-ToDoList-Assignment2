require("dotenv").config(); // load variables from .env into process.env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// Only the React dev server may call this API (not every origin)
app.use(cors({ origin: "http://localhost:3000" }));

// Read JSON request bodies
app.use(express.json());

// All task routes live under /api/tasks
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB (string comes from .env), then start listening
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
