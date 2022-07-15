import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

//  private api/posts POST
export const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    res.status(400);
    throw new Error("Post must not be empty");
  }

  const newPost = new Post({
    author: req.user.id,
    content,
  });
  const post = await newPost.save();

  const user = await User.findById(req.user.id);
  user.posts.push(post.id);
  await user.save();

  res.status(201).json({ id: post.id });
});

//  private api/posts GET
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate("author", "username")
    .sort({ createdAt: -1 });
  res.status(200).json({
    posts,
  });
});

//  private api/posts/pid GET
export const getPost = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  let post;
  try {
    post = await Post.findById(pid)
      .populate("author", "username")
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: { path: "author", model: "User", select: "username" },
      });
  } catch {}

  if (!post) {
    res.status(400);
    throw new Error("Post cannot be found");
  }
  res.status(200).json(post);
});

//private api/posts/pid DELETE
export const deletePost = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const post = await Post.findOne({ id: pid });
  if (!post) {
    res.status(400);
    throw new Error("Post cannot be found");
  }
  // check author or not
  if (post.author.toString() !== req.user.id) {
    res.status(400);
    throw new Error("You do not have permission");
  }

  const deletedPost = await Post.findByIdAndDelete(pid);
  if (!deletedPost) {
    res.status(400);
    throw new Error("Post cannt be found");
  }

  // delete post in the owner's posts array
  const user = await User.findById(req.user.id);
  user.posts = user.posts.filter((post) => post._id.toString() !== pid);
  await user.save();

  // delete the post's comments
  await Comment.deleteMany({ _id: { $in: deletedPost.comments } });

  res.status(200).json({
    message: "success",
    id: deletedPost.id,
  });
});
