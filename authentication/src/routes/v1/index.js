import express from "express";
import {
  register,
  login,
  protectedRoute,
  resetPassword,
  verifyOTP,
} from "../../controllers/authcontroller.js";
import { authMiddleware } from "../../middlewares/authenticate.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", authMiddleware, protectedRoute);
router.post("/resetpassword", resetPassword);
router.post("/verifyotp", verifyOTP);
export default router;
