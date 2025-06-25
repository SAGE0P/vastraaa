const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./modules/Product");
const User = require("./modules/user");
const Cart = require("./modules/Cart");
const products = require("./data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Cart.deleteMany({});
    console.log("Existing products and users deleted");

    // Create a user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456" // Will be hashed
    });

    const userId = createdUser._id;

    // Add required fields to each product
    const sampleProducts = products.map((p) => ({
      ...p,
      user: userId,
      collectionName: p.collectionName || "Default Collection"
    }));

    // Insert products
    await Product.insertMany(sampleProducts);
    console.log("Seed data inserted");

    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};



seedData();
