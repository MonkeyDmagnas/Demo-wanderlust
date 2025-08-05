import { Router } from "express";

import { VerifyToken } from "../middlewares/auth.middleware.js";
import {
  createPost,
  getAllPosts,
  getFeaturedPosts,
  getPostByCategory,
  getPostById,
  updatePost,
} from "../controllers/post.controller.js";
import { isAuthorMiddleware } from "../middlewares/post.middleware.js";

const router = Router();

router.route("/").post(VerifyToken, createPost);
router.route("/").get(getAllPosts);
router.route("/featured").get(getFeaturedPosts);
router.route("/categories/:category").post(getPostByCategory);
router.route("/:id").get(getPostById);
router.route("/:id").patch(VerifyToken, isAuthorMiddleware, updatePost);
// router.route('/:id').delete(VerifyToken, isAuthorMiddleware, delete)
export default router;
