const express = require("express");
const {
  addPost,
  upload,
  deletePost,
  updatePost,
  likeMyPost,
  getMyPost,
  getAllPost,
  commentMyPost,
} = require("../controllers/Post");

const router = express();
//post
router.post("/add-post", upload.single("image"), addPost);

//get
router.get("/my-post", getMyPost);
router.get("/posts", getAllPost);

// //put
router.put("/updatePost", updatePost);
router.put("/like-post", likeMyPost);
router.put("/comment-post", commentMyPost);

//delete
router.delete("/delete-post", deletePost);

module.exports = router;
