const User = require("../model/user.js");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setCookie } = require("../utils/index.js");

const getAllusers = async (req, res) => {};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid Password or Email",
    });
  }
  const isSame = await brcypt.compare(password, user.password);
  if (!isSame) {
    return res.status(404).json({
      success: false,
      message: "Invalid Password or Email",
    });
  }
  delete user.password;
  setCookie(user, res, 201, "User Logged in Successfully");
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  //Find If User already exist in DB and through error if yes
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "User all ready exist!",
    });
  }
  //Hash Password and (create) store info in DB
  const hashedPassword = await brcypt.hash(password, 10);
  const userCreated = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  //Generate Token from JWT and store in cookie
  setCookie(userCreated, res, 201, "User Created Succesfully!");
};

const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Fetched Profile",
    data: req.user,
  });
};

const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Success!",
    });
};

module.exports = { getAllusers, createUser, getMyProfile, login, logout };
