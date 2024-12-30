import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const registerUser = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email is always registered");
  }
  const user = new User({ email, password });
  await user.save();
  return user;
};
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("email or password is incorrect");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid email or password.");

  const token = user.genJWT();
  return { token, user };
};
export const verifyToken = async (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET); 
    } catch (err) {
      throw new Error('Invalid or expired token.');
    }
  };
  