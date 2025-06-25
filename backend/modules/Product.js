const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    default: ""
  },
  sizes: {
    type: [String],
    required: true
  },
  colors: {
    type: [String],
    required: true
  },
  collectionName: { // ✅ renamed from `collection`
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["Men", "Women", "Unisex"]
  },
  images: [
    {
      url: {
        type: String,
        required: true
      },
      altText: {
        type: String,
        required: true
      }
    }
  ],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
    default: []
  },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number }
  },
  rating: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema)
