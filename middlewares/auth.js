const User = require("../model/user");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login first!",
    });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedToken._id);
  next();
};

module.exports = { isAuthenticated };
