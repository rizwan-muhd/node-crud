const postSchema = require("../modals/Post");
const userSchema = require("../modals/User");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let dest = path.join(__dirname, "../assets/");
    callback(null, dest);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // callback(null, Date.now() + file.originalname);
    callback(null, uniqueSuffix + "-" + file.originalname.match(/\..*$/)[0]);
  },
});

exports.upload = multer({ storage: storage });

exports.addUser = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .json({ message: "user with given email already exits" });
    }
    console.log("succes");
    const newUser = await new userSchema({
      ...req.body,
    }).save();

    res.status(200).send({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.addPost = async (req, res) => {
  try {
    console.log("enter here");
    console.log("body", req.body, req.file.filename);

    const newPost = await new postSchema({
      ...req.body,
      image: [req.file.filename], // Assuming image is an array field
    }).save();

    res.status(200).send({
      success: true,
      newPost,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getMyPost = async (req, res) => {
  try {
    const post = await postSchema.findById(req, query.id);

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const { name, category } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    if (category) {
      query.category = category;
    }

    const page = parseInt(req.query.page - 1 || "0");
    console.log(page);
    const page_size = parseInt(req.query.limit || "5");

    const total = await postSchema.countDocuments({});
    const totalPages = Math.ceil(total / page_size);

    const posts = await postSchema
      .find(query)
      .skip(page_size * page)
      .limit(page_size);
    console.log(posts);
    res.status(200).json({ totalPages, posts });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const id = req.query.id;
    await postSchema.findByIdAndUpdate(id, { $set: req.body });

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.query.id;
    await postSchema.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "deleted  successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.likeMyPost = async (req, res) => {
  try {
    const id = req.query.id;
    const userId = req.query.user;

    // Check if the user has already liked the post
    const post = await postSchema.findById(id);

    if (!post.likes.includes(userId)) {
      await postSchema.findByIdAndUpdate(id, {
        $push: { likes: userId },
      });

      res.status(200).json({
        success: true,
        message: "Post liked",
      });
    } else {
      // If the post is already liked, remove the like (unlike)
      await postSchema.findByIdAndUpdate(id, {
        $pull: { likes: userId },
      });

      res.status(200).json({
        success: true,
        message: "Post unliked",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.commentMyPost = async (req, res) => {
  try {
    const postId = req.query.id;
    const userId = req.query.user;
    const { commentText } = req.body;

    // Find the post
    const post = await postSchema.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Create a new comment object
    const newComment = {
      userId: userId,
      text: commentText,
    };

    // Add the comment to the post
    post.comments.push(newComment);

    // Save the updated post
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
