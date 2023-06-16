const express = require("express");
const {
  getAllProducts,
  createProduct,
  UpdateProduct,
  DeleteProduct,
  getProductDetail,
  createProductReview,
  getProductAllReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Auth");

const router = express.Router();
router.route("/product").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), UpdateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), DeleteProduct);

router.route("/product/:id").get(getProductDetail);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews/:id")

  .get(getProductAllReviews)
  .delete(isAuthenticatedUser, deleteReview);
module.exports = router;
