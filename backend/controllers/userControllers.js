import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateJwtToken } from "./helpers.js";

// public api/users POST
export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  const user = await newUser.save();
  if (user) {
    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token: generateJwtToken(user.id),
    });
  }
});

//  public api/users/login POST
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add both email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("invalid credentials");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.status(400);
    throw new Error("invalid credentials");
  }

  res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token: generateJwtToken(user.id),
  });
});

//  private api/uses/me GET
export const getMe = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ user: req.user, token: generateJwtToken(req.user.id) });
});

//  private api/users GET
export const getUsers = asyncHandler(async (req, res) => {
  const { username } = req.query;
  let users = [];
  if (username) {
    users = await User.find({ username: { $regex: "^" + username } });
  } else {
    users = await User.find();
  }
  res.status(200).json({
    users,
  });
});

//  private api/users/search GET
export const searchUser = asyncHandler(async (req, res) => {
  const { q: searchText } = req.query;
  if (!searchText) {
    res.status(400);
    throw new Error("Username must not be empty");
  }

  var regexp = new RegExp("^" + searchText, "i");
  const users = await User.find(
    { username: regexp },
    "username following followers"
  );
  res.json({
    message: "success",
    users,
  });
});

// private api/users/:id GET
export const getUserDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("User id must not be empty.");
  }
  let user;
  try {
    user = await User.findById(id, "-password").populate({
      path: "posts",
      options: {
        sort: { createdAt: -1 },
      },
      populate: { path: "author", select: "-password", model: "User" },
    });
  } catch {}
  if (!user) {
    res.status(400);
    throw new Error("User is not found with the given id");
  }
  res.status(200).json(user);
});

// private api/users/:id PATCH
export const toggleFollow = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  if (!userId) {
    res.status(400);
    throw new Error("userId must not be empty");
  }

  let followingUser;
  try {
    followingUser = await User.findById(userId);
  } catch {}
  if (!followingUser) {
    res.status(400);
    throw new Error("User is not found.");
  }

  // checking already following or not
  const fIndex = followingUser.followers.findIndex(
    (user) => user.toString() === req.user.id
  );

  if (fIndex === -1) {
    followingUser.followers.push(req.user.id);
    await followingUser.save();

    const currentUser = await User.findById(req.user.id);
    currentUser.following.push(followingUser.id);
    await currentUser.save();
    res.status(201).json({ message: "successfully followed" });
  } else {
    followingUser.followers = followingUser.followers.filter(
      (user) => user.toString() !== req.user.id
    );
    await followingUser.save();

    const currentUser = await User.findById(req.user.id);
    currentUser.following = currentUser.following.filter(
      (user) => user.toString() !== followingUser.id
    );
    await currentUser.save();
    res.status(201).json({ message: "successfully unfollowed" });
  }
});

// private api/users/:id/following GET
export const getFollowing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("User id must not be empty.");
  }
  let user;
  try {
    user = await User.findById(id, "following username").populate(
      "following",
      "username following followers"
    );
  } catch {}

  if (!user) {
    res.status(400);
    throw new Error("User is not found with the given id");
  }
  res.json({
    username: user.username,
    following: user.following,
  });
});

// private api/users/:id/following GET
export const getFollowers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("User id must not be empty.");
  }
  let user;
  try {
    user = await User.findById(id, "following username").populate(
      "followers",
      "username following followers"
    );
  } catch {}
  if (!user) {
    res.status(400);
    throw new Error("User is not found with the given id");
  }
  res.json({
    username: user.username,
    followers: user.followers,
  });
});

// private api/users/following/post GET
export const getFollowingPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id, "following").populate({
    path: "following",
    populate: {
      path: "posts",
      populate: {
        path: "author",
        select: "username"
      }
    }
  });
  let postsArr = []
  for (const following of user.following) {
    postsArr = [...postsArr, ...following.posts]
  }

  postsArr.sort((a,b) => b.createdAt - a.createdAt)
  res.json({
    message: "success",
    posts: postsArr
  });
});
