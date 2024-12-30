import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authentication token is missing or invalid." });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key

    // Fetch the user from the database using the decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    // Attach the user to the request object for use in the route
    req.user = user;
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token has expired. Please log in again." });
    }
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
