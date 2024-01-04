const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGODB_URL = process.env.MONGO_URL;
mongoose.set("strictQuery", false);

const connection = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
};
mongoose.connection.on("connected", () => {
  console.log("Database connected succesfully");
});
mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});
mongoose.connection.on("error", (error) => {
  console.log("error in database connection", error.message);
});

module.exports = connection;
