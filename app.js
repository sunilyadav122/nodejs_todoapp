const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.js");
const taskRouter = require("./routes/task.js");

const { config } = require("dotenv");
const { errorMiddleware } = require("./middlewares/error.js");
const app = express();

config({
  path: "./data/config.env",
});

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/v1", userRouter);
app.use("/api/v1", taskRouter);
app.use(errorMiddleware);

module.exports = app;

// => /user/:userId ==> req.params
// => /user?userId=1234567890  =>  req.query
// {
//   origin: [process.env.FRONTEND_URL],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,  
// }
