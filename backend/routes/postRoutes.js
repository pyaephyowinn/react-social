import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  deletePost,
} from "../controllers/postControllers.js";
import { addComment, deleteComment } from "../controllers/comentControllers.js";
import { toggleLike } from "../controllers/likeControllers.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.get("/:pid", protect, getPost);
router.delete("/:pid", protect, deletePost);

router.patch("/:pid", protect, toggleLike);

router.post("/:pid/comments", protect, addComment);
router.delete("/:pid/comments/:cid", protect, deleteComment);

export default router;
