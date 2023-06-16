const jwt = require("jsonwebtoken");
const sendToken = (user, statusCode, res) => {
  console.log("user in send token function", user);
  const token = user.getJWTToken();
  // console.log(token);
  // const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log("decodedData inside sendtoken", decodedData);
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports = sendToken;
