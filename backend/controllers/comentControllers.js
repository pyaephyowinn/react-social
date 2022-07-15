import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const addComment = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { content } = req.body;
  const post = await Post.findById(pid);
  if (!post) {
    res.status(400);
    throw new Error("Post cannot be found");
  }
  if(!content) {
    res.status(400);
    throw new Error("Comment must not be empty!")
  }
  const newComment = new Comment({
    content,
    author: req.user.id,
  });
  const comment = await newComment.save();

  post.comments.push(comment.id)
  await post.save()

  res.status(200).json({
    id: comment.id,
  });
});

export const deleteComment = asyncHandler( async (req, res) => {
  const { pid, cid } = req.params
  const comment = await Comment.findOne({_id: cid})

  // check author or not
  if (comment.author.toString() !== req.user.id) {
    res.status(400);
    throw new Error("You do not have permission");
  }

  const deletedComment = await Comment.findByIdAndDelete(cid)
  if(!deletedComment) {
    res.status(400)
    throw new Error ('Comment is not be found')
  }

  //delete the comments in the post's comments array
  const post = await Post.findOne({id: pid})
  post.comments = post.comments.filter(comment => comment._id.toString() !== cid)
  await post.save()

  res.status(200).json({
    message: 'successfully deleted the comment',
    id: deletedComment.id
  })
})
