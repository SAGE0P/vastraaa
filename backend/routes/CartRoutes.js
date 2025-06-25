const express = require("express");
const Cart = require("../modules/Cart");
const Product = require("../modules/Product");

const router = express.Router();

// Utility function to fetch cart by user or guest
const getCart = async (userId, guestId) => {
  if (userId) return await Cart.findOne({ user: userId });
  if (guestId) return await Cart.findOne({ guestId });
  return null;
};

// ✅ POST: Add or update an item in the cart
router.post("/", async (req, res) => {
  const { productId, quantity, guestId, userId, color, size } = req.body || {};
  console.log("Incoming body:", req.body); // Debug log

  try {
    if (!productId || !quantity || (!guestId && !userId)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await getCart(userId, guestId);

    if (!cart) {
      cart = new Cart({
        user: userId || null,
        guestId: guestId || null,
        items: [],
        totalPrice: 0,
      });
    }

    const existingIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url || "",
        color,
        size,
        quantity,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Add error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ GET: Retrieve the user's or guest's cart
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ PUT: Update quantity of a cart item
router.put("/", async (req, res) => {
  const { productId, quantity, guestId, userId, color, size } = req.body || {};
  console.log("PUT cart body:", req.body);

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (index === -1) return res.status(404).json({ message: "Item not found in cart" });

    if (quantity <= 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = quantity;
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ DELETE: Remove a specific item from cart
router.delete("/", async (req, res) => {
  const { productId, guestId, userId, color, size } = req.body || {};
  console.log("DELETE cart body:", req.body);

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (index === -1) return res.status(404).json({ message: "Item not found in cart" });

    cart.items.splice(index, 1);

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
