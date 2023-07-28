const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/apiFeatures");

//Get all product
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const product = await apiFeatures.query;
    res.status(200).json({
      success: true,
      product,
      productCount,
      resultPerPage,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getAllProductsWithoutPagination = asyncHandler(async (req, res) => {
  try {
    console.log("1");
    const product = await Product.find();
    console.log("2");
    if (!product) {
      throw new Error("No Prouduct Found");
    }
    console.log(product);
    console.log("3");
    const productCount = await Product.countDocuments();
    console.log("4");
    res.status(200).json({ success: true, product, productCount });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
// create Product --Admin
const createProduct = asyncHandler(async (req, res) => {
  try {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//update the product --Admin
const UpdateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (!product) {
      res.status(404);
      throw new Error("product not found");
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

//delete the product --Admin
const DeleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    } else {
      res.status(404);

      throw new Error("product not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

//get product details
const getProductDetail = asyncHandler(async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (product) {
      product = await Product.findById(req.params.id);
      res.status(200).json({ success: true, product });
    } else {
      res.status(404).json({ success: false, message: "product not found" });
    }
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});
const createProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id.toString(),
      name: req.user.name,
      rating: rating,
      comment,
    };

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      console.log("111111111");
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          //so that we can see which review was given by this user

          rev.comment = comment;
          rev.user = req.user._id;
          rev.name = req.user.name;
          rev.rating = rating;
        }
      });
    } else {
      console.log("2222222");
      console.log(review);
      product.reviews.push(review);
      product.numofReviews = product.reviews.length;
      product.user = req.user._id;
    }

    const sumOfRatings = product.reviews.reduce(
      (acc, cur) => acc + cur.rating,
      0
    );
    if (product.reviews.length !== 0) {
      product.rating = sumOfRatings / product.reviews.length;
    } else {
      product.rating = review.rating;
    }

    await product.save();
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400);
    console.log(error.message);
    throw new Error(error.message);
  }
});
const getProductAllReviews = asyncHandler(async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json({ success: true, review: product.reviews });
    } else {
      res.status(404).json({ success: false, message: "product not found" });
    }
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log("req.query.id", req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("product not found");
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() != req.query.id.toString()
    );
    let avg = 0;
    product.rating = product.reviews.forEach((rev) => {
      avg = avg + rev.rating;
    });

    const rating = avg / product.reviews.length;
    const numofReviews = reviews.length;
    await Product.findByIdAndUpdate(
      req.params.id,
      {
        reviews,
        rating,
        numofReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = {
  getAllProducts,
  createProduct,
  UpdateProduct,
  DeleteProduct,
  getProductDetail,
  createProductReview,
  deleteReview,
  getProductAllReviews,
  getAllProductsWithoutPagination,
};
