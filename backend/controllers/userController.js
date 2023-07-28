const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

//register our user

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        image: { public_id: "this is sample id", url: "profileimage url" },
      },
    });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404);
      throw new Error("give email and password");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404);
      throw new Error("user not found");
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      res.status(404);
      throw new Error("Invalid email or password");
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const logoutUser = asyncHandler(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "logout hi",
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n \n if you have not requested this email then ,please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500);
    throw new Error(error.message);
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});
const updatePassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldpassword);
    if (!isPasswordMatched) {
      res.status(404);
      throw new Error("old password is incorrect");
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      res.status(400);
      throw new Error("password does not match");
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (!newUserData.name || !newUserData.email) {
      res.status(400);
      throw new Error("enter email and name");
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    res.status(404);
    throw new Error("no users");
  }
  res.status(200).json({
    success: true,
    users,
  });
});
const getSingleUser = asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id);
  if (!users) {
    res.status(404);
    throw new Error(`user does not exist with id : ${req.params.id}`);
  }
  res.status(200).json({
    success: true,
    users,
  });
});
const updateRole = asyncHandler(async (req, res) => {
  try {
    const newUserData = {
      role: req.body.role,
    };

    // if (!newUserData.name || !newUserData.email || !newUserData.role) {
    //   res.status(400);
    //   throw new Error("enter email and name and role");
    // }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("user does not exist with id :", req.params.id);
    }
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      user,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateRole,
  deleteUser,
};
