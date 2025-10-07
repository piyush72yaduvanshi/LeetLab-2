import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { chatWithBot, getChatHistory, saveChatMessage } from "../controllers/chatbot.controller.js";

const router = express.Router();

// Chat with AI bot
router.post("/chat", authenticate, chatWithBot);

// Get chat history for a problem
router.get("/history/:problemId", authenticate, getChatHistory);

// Save chat message
router.post("/save", authenticate, saveChatMessage);

export default router;