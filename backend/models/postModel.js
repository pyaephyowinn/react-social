import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: [true, "Post must have author"],
      ref: "User",
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    content: {
      type: String,
      required: [true, "Post must not be empty"],
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
