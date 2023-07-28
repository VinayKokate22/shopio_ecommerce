const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrders,
  updateOrder,
  deleteOrders,
} = require("../controllers/orderController");

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Auth");
router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
  .route("/order/:id")
  .post(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);
router.route("/order/me").get(isAuthenticatedUser, myOrder);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .post(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrders);

module.exports = router;
