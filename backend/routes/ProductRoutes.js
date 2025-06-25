const express = require("express");
const Product = require("../modules/Product"); // Mongoose model
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collectionName,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !countInStock ||
      !sku ||
      !category ||
      !collectionName ||
      !gender ||
      !Array.isArray(images) ||
      !images.length ||
      !Array.isArray(sizes) ||
      !sizes.length ||
      !Array.isArray(colors) ||
      !colors.length
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this SKU already exists." });
    }

    const product = new Product({
      name,
      description,
      price,
      discount,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collectionName,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      collectionName,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    if (collectionName && collectionName.toLowerCase() !== "all") {
      query.collectionName = collectionName.toLowerCase();
    }

    if (size) {
      query.sizes = { $in: [size] };
    }

    if (color) {
      query.colors = { $in: [color] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (category) {
      query.category = category;
    }

    if (brand) {
      query.brand = brand;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sortBy === "priceAsc") sortOption.price = 1;
    else if (sortBy === "priceDesc") sortOption.price = -1;
    else if (sortBy === "newest") sortOption.createdAt = -1;

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(limit ? parseInt(limit) : 0);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collectionName,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found." });

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.discount = discount ?? product.discount;
    product.countInStock = countInStock ?? product.countInStock;
    product.sku = sku ?? product.sku;
    product.category = category ?? product.category;
    product.brand = brand ?? product.brand;
    product.sizes = sizes ?? product.sizes;
    product.colors = colors ?? product.colors;
    product.collectionName = collectionName ?? product.collectionName;
    product.gender = gender ?? product.gender;
    product.images = images ?? product.images;
    product.isFeatured = isFeatured ?? product.isFeatured;
    product.isPublished = isPublished ?? product.isPublished;
    product.tags = tags ?? product.tags;
    product.dimensions = dimensions ?? product.dimensions;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product by ID
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found." });

    await Product.deleteOne({ _id: req.params.id });

    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ FIXED POSITION — BestSellers route moved above /:id
// @route   GET /api/products/BestSellers
router.get("/BestSellers", async (req, res) => {
  try {
    const bestSellers = await Product.findOne().sort({ sold: -1 }).limit(10);
    if(bestSellers){
      res.json(bestSellers);
    }else{
      res.status(404).json({ message: "No best sellers found." });
    }  
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// @route GET /api/products/new-arrivals

router.get("/new-arrivals", async(req,res)=>{
  try{
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(10);
    res.json(newArrivals);


  }catch(error){
    console.error("Error fetching new arrivals:", error.message);
    res.status(500).json({message: "Server error" });

  }
})
// @route   GET /api/products/:id
// @desc    Get a single product by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found." });

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
