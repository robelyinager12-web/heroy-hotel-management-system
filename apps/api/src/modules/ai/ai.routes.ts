import { Router } from "express";
import multer from "multer";
import * as aiController from "./ai.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

const router = Router();

// Public — guests can chat with the AI receptionist without logging in
router.post("/chat", aiController.sendMessage);
router.post("/transcribe", upload.single("audio"), aiController.transcribe);

// Authenticated — conversation history management
router.get("/conversations", authMiddleware, aiController.listConversations);
router.get("/conversations/:id", authMiddleware, aiController.getConversation);
router.delete("/conversations/:id", authMiddleware, aiController.deleteConversation);

export default router;