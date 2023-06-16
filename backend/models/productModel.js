const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "please add the product description"],
    },
    price: {
      type: Number,
      required: [true, "please add the product price"],
      maxLength: [8, "price is to high only 8 figure are valid"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    image: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "please Enter the product category"],
    },
    stock: {
      type: Number,
      required: [true, "please Enter the product stock"],
      maxLength: [4, "max stock is of 4 figure"],
      default: 1,
    },
    numofReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "user",
          required: true,
        },
        name: {
          type: String,
          require: true,
        },
        rating: {
          type: Number,
          require: true,
        },
        comment: {
          type: String,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);
