import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";

export const protect = asyncHandler (async (req, res, next) => {
  const token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    const jwtToken = token.split(" ")[1];
    // console.log(jwtToken);
    
    try {
      const { id } = jwt.verify(jwtToken, process.env.JWT_SECRET)
      // console.log(id);
      const user = await User.findById(id).select('-password')
      if(!user){
        res.status(400)
        throw new Error ('User not found with given token')
      }
      req.user = user
      next()
    } catch (err) {
      // console.log(err);
      res.status(400)
      throw new Error ('Not Authorized token, it may be expired')
    }
  }

  if (!token) {
    res.status(400);
    throw new Error ("No Authorize, token does not found")
  }
});
