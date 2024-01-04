const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./database/Connection");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

//cors policy
app.use(cors());

//load env vars
dotenv.config({ path: "./.env" });

//connect to DB
connection();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//route files
const post = require("./routes/Post");

// //mount routes
app.use("/api/post", post);

app.use(bodyParser.json());

app.listen(8000, () => {
  console.log("server running on port 8000");
});
