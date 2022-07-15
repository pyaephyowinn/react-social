import express from "express";
import {
  register,
  login,
  getMe,
  getUsers,
  searchUser,
  toggleFollow,
  getUserDetail,
  getFollowing,
  getFollowers,
  getFollowingPosts
} from "../controllers/userControllers.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", register);

router.post("/login", login);
router.get("/search", protect, searchUser)
router.get("/following/posts", protect, getFollowingPosts)

router.get("/:id", protect, getUserDetail);
router.get("/:id/following", protect, getFollowing);
router.get("/:id/followers", protect, getFollowers);
router.patch("/:id", protect, toggleFollow);
router.get("/me", protect, getMe);

export default router;
