const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");  
const ProductRoutes = require("./routes/ProductRoutes");
const CartRoutes = require("./routes/CartRoutes");

const app = express();

// ✅ must come BEFORE routes
app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to MongoDB
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.send("welcome");
});

// API routes
app.use("/api/user", userRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
