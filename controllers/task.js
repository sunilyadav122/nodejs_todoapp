const { ErrorHanlder } = require("../middlewares/error.js");
const Task = require("../model/task.js");

const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  if (title || description) {
    try {
      const task = await Task.create({
        ...req.body,
        user: req.user,
      });
      res.status(201).json({
        success: true,
        message: "Created Task",
        data: task,
      });
    } catch (err) {
      next(new ErrorHanlder(err.message, 404));
    }
  } else {
    next(new ErrorHanlder("All fields are required", 404));
  }
};

const getAllTask = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      success: true,
      message: "Fetched all Task",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHanlder(error.message));
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    try {
      await Task.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Task Deleted!",
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    next(new ErrorHanlder("ID is required", 404));
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    try {
      let task = await Task.findById(id);
      task.isCompleted = !task.isCompleted;
      task = await task.save();
      res.status(200).json({
        success: true,
        message: "Task Updated!",
        data: task,
      });
    } catch (error) {
      console.log(error);
      next(new ErrorHanlder(error.message));
    }
  } else {
    next(new ErrorHanlder("Id is Required", 404));
  }
};

module.exports = { createTask, deleteTask, updateTask, getAllTask };
