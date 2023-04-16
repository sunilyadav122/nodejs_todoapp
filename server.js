const {connectDB} = require("./data/database.js")
const app = require("./app.js")

connectDB()
app.listen(process.env.PORT, () => {
    console.log("Listening on PORT",process.env.PORT);
});