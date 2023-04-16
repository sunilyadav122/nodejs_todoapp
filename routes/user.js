const express = require("express");
const router = express.Router();
const {
  getAllusers,
  createUser,
  login,
  logout,
  getMyProfile,
} = require("../controllers/user.js");
const { isAuthenticated } = require("../middlewares/auth.js");

router.get("/user/all", getAllusers);

router.post("/user/new", createUser);

router.post("/user/login", login);

router.get("/user/logout", logout);

router.get("/user/profile", isAuthenticated, getMyProfile);

module.exports = router;
