import express from "express";
import {
  getMessages,
  sendMessage,
  getChats,
} from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/chats", protectRoute, getChats);
router.get("/:otherUserId", protectRoute, getMessages);

router.post("/", protectRoute, sendMessage);

export default router;
