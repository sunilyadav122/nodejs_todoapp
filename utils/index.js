const jwt = require("jsonwebtoken");

const setCookie = (user, res, statusCode, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET); //process.env.JWT_SECRET
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 60,
    })
    .json({
      success: true,
      message,
      data: user,
    });
};

module.exports = { setCookie };
