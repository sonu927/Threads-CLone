import express from "express";
import {
  getMessages,
  sendMessage,
  getConversations,
} from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, sendMessage);
router.get("/:otherUserId", protectRoute, getMessages);
router.get("/conversations", protectRoute, getConversations);

export default router;
