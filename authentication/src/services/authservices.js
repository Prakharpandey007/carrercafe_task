import User from "../models/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/email.js";
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
    throw new Error("Invalid or expired token.");
  }
};

export const resetpassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found.");

  const otp = crypto.randomInt(100000, 999999).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
  await user.save();

  await sendEmail(email, "OTP for Reset your password", `Your OTP is ${otp}`);
};

export const verifyotp = async (email, otp, newPassword) => {
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    throw new Error("Invalid or expired OTP.");
  }

  user.password = newPassword;
  user.otp = null;
  user.otpExpires = null;
  await user.save();
};
