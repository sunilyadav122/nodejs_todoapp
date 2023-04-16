const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendApi",
    })
    .then(() => {
      console.log("DB CONNECTED");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { connectDB };
