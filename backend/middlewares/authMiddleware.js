const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Error("Please login to continue", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id).select("-password");

  next();
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new Error("You are not an Admin");
  } else {
    next();
  }
});

module.exports = {
  authMiddleware,
  isAdmin,
};
