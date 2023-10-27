import express from "express";
import {
  loginUser,
  signupUser,
  logoutUser,
  followUnfollowuser,
  updateUser,
  getUserProfile,
  getSuggestedUsers,
} from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnfollowuser);
router.put("/update/:id", protectRoute, updateUser);

export default router;
