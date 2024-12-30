import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z]+(\.[a-zA-Z0-9]+)?[0-9]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const SALT = await bcrypt.genSalt(9);
    this.password = await bcrypt.hash(this.password, SALT);
  }
  next();
});

// Compare the plain password with the hashed password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate a JWT for the user
userSchema.methods.genJWT = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // Token expires in 1 day
  );
};
const user = mongoose.model("User", userSchema);
export default user;
