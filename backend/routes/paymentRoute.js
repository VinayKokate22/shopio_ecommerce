const express = require("express");
const { isAuthenticatedUser } = require("../middleware/Auth");
const {
  processPayment,
  sendStripeApiKey,
  sendHi,
} = require("../controllers/paymentController");

const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router
  .route("/payment/stripeapikey")
  .get(isAuthenticatedUser, sendStripeApiKey);
router.route("/sendhi").get(isAuthenticatedUser, sendHi);
module.exports = router;
