// const { required } = require("joi");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },

  image: [
    {
      type: String,
    },
  ],

  place: {
    type: String,
  },
  likes: [
    {
      type: String,
    },
  ],
  comments: [],
});

module.exports = mongoose.model("posts", postSchema);
