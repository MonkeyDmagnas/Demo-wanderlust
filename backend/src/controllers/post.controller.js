import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { validCategories } from "../utils/constant.js";

export const createPost = async (req, res) => {
  console.log("post hitting 1");
  try {
    const {
      title,
      authorName,
      imageLink,
      categories,
      description,
      isFeaturedPost = false,
    } = req.body;
    console.log("post hitting 2");

    const userId = req.user._id;

    if (!title || !authorName || !imageLink || !description || !categories) {
      return res.status(400).json({
        message: "Field missing",
      });
    }
    // Validation - check if imageLink is a valid URL
    const imageLinkRegex = /\.(jpg|jpeg|png|webp)$/i;
    if (!imageLinkRegex.test(imageLink)) {
      return res.status(400).json({ message: "Invalid image" });
    }

    // Validation - check if categories array has more than 3 items
    if (categories.length > 3) {
      return res.status(400).json({ message: "Max categories only 3" });
    }

    const post = new Post({
      title,
      authorName,
      imageLink,
      description,
      categories,
      isFeaturedPost,
      authorId: req.user._id,
    });

    const savedPost = await post.save();
    await User.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } });
    console.log("saved post::", savedPost);
    res.status(201).json(savedPost);
  } catch (error) {
    console.log("error create post::", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    res.status.json(500).json({
      message: error.message,
    });
  }
};

export const getFeaturedPosts = async (req, res) => {
  try {
    const featuredPosts = await Post.find({ isFeaturedPost: true });
    res.status(200).json(featuredPosts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPostByCategory = async (req, res) => {
  const category = req.params.category;
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      messag: "Invalid categories",
    });
  }

  const categoryPosts = await Post.find({
    categories: category,
  });
  res.status(200).json(categoryPosts);
  try {
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      updatePost,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
