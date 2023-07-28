const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const newOrder = asyncHandler(async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItem,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    console.log("orderItems", orderItem);
    const order = await Order.create({
      shippingInfo,
      orderItem,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    res.status(404);
    throw new Error("order not found with this id");
  }
  res.status(200).json({
    success: true,
    order,
  });
});
const myOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    res.status(404);
    throw new Error("order not found with this id");
  }
  res.status(200).json({
    success: true,

    orders,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
const updateOrder = asyncHandler(async (req, res) => {
  try {
    console.log("the body", req.body);
    const orders = await Order.findById(req.params.id);

    if (!orders) {
      res.status(404);
      throw new Error("order not found with this id");
    }
    console.log("1");
    if (orders.orderStatus === "Delivered") {
      res.status(400);
      throw new Error("you have already delivered this order");
    }
    console.log("2");

    orders.orderItem.forEach((order) => {
      updateStock(order.product, order.quantity);
    });
    console.log("3");
    orders.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      orders.deliveredAt = Date.now();
    }
    console.log("4");

    await orders.save({ validateBeforeSave: false });
    console.log("5");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
const deleteOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find(req.params.id);
  if (!orders) {
    res.status(404);
    throw new Error("Order not found with this Id");
  }

  await orders.remove();

  res.status(200).json({
    success: true,
  });
});
module.exports = {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrders,
  updateOrder,
  deleteOrders,
};
