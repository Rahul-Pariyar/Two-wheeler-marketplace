import express from "express";
import { getOrCreateConversation, getConversation, sendMessage, getMessage } from "../Controllers/coversationController.js";
import { verifyToken } from "../middlewares/auth.js";

const router=express.Router();

router.post("/getOrCreateConversation",verifyToken,getOrCreateConversation);
router.get("/getConversation",verifyToken,getConversation);
router.post("/sendMessage",verifyToken,sendMessage);
router.get("/getMessage/:id",verifyToken,getMessage);

export default router;