const express = require("express");
var cors = require("cors");
const app = express();
const cookie = require("cookie-parser");
//route  product import
const productroute = require("./routes/productRoute");
const userroute = require("./routes/userRoute");
const orderroute = require("./routes/orderRoute");
const paymentroute = require("./routes/paymentRoute");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(morgan("tiny"));
app.use("/api/v1", productroute);
app.use("/api/v1", userroute);
app.use("/api/v1", orderroute);
// app.use("/api/v1", paymentroute);
app.use(errorHandler);

module.exports = app;
