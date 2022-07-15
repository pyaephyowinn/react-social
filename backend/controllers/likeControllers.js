import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

export const toggleLike = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const post = await Post.findById(pid);
  if (!post) {
    res.status(400);
    throw new Error("Post cannot be found");
  }

  const findIndex = post.likes.findIndex(
    (user) => user.toString() === req.user.id
  );

  if (findIndex !== -1) {
    post.likes = post.likes.filter((user) => user.toString() !== req.user.id);
    await post.save();
    res.status(200).json({
      message: "successfully unliked the post",
    });
  } else {
    post.likes.push(req.user.id);
    await post.save();
    res.status(201).json({
      message: "successfully liked the post",
    });
  }
});
