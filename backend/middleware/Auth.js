const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  try {
    const { token } = await req.cookies;
    if (!token) {
      res.status(401);
      throw new Error("please login to access this resource");
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401);
      throw new Error(
        `role:${req.user.role} is not allowed to acces this resouce`
      );
    }
    next();
  };
};

module.exports = { isAuthenticatedUser, authorizeRoles };
