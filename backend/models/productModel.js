const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  images: {
    type: Array,
  },
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  shopId: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  tags: {
    type: String,
  },
  colors: [
    {
      type: String,
    },
  ],
  size: [
    {
      type: Number,
    },
  ],
  level: {
    type: String,
  },
  // độ cứng
  hardness: {
    type: String,
  },
  stylePlayer: {
    type: String,
  },
  contentPlay: {
    type: String,
  },
  // trọng lương
  weight: {
    type: String,
  },
  // chiều dài
  length: {
    type: String,
  },
  // điểm cân bằng
  balancedPoint: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
