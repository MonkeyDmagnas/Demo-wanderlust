import Post from "../models/post.model.js";

export const isAuthorMiddleware = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const post = await Post.findById(post.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    console.log(post.authorId, userId);
    if (post.authorId.toString() !== userId) {
      return res.status(403).json({
        message: "Forbidden request",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
