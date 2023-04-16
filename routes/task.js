const express = require("express");
const {
  createTask,
  deleteTask,
  updateTask,
  getAllTask,
} = require("../controllers/task");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");

router.post("/task/new", isAuthenticated, createTask); //CREATE

router.get("/task/all", isAuthenticated, getAllTask);  //READ

router.put("/task/update/:id", isAuthenticated, updateTask); //UPDATE

router.delete("/task/delete/:id", isAuthenticated, deleteTask); //DELETE

module.exports = router;
