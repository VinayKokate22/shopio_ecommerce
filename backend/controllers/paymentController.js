const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");
const processPayment = asyncHandler(async (req, res) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    res.status(400);
    throw new Error({ success: false, error });
  }
});
const sendStripeApiKey = async (req, res) => {
  try {
    const stripeApiKey = process.env.STRIPE_API_KEY;
    res.status(200).json({ stripeApiKey });
  } catch (error) {
    throw new Error(error);
  }
};
const sendHi = async (req, res) => {
  res.status(200).json("hi");
};
module.exports = { processPayment, sendStripeApiKey, sendHi };
