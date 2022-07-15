import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    aboutMe: {
      type: String
    },
    posts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "User"
    },
    following: {
      type: [Schema.Types.ObjectId],
      ref: "User"
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
