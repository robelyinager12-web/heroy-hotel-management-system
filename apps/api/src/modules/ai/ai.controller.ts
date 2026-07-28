import { Request, Response, NextFunction } from "express";
import { chatMessageSchema } from "./ai.dto";
import * as aiService from "./ai.service";

export async function sendMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const input = chatMessageSchema.parse(req.body);
    const userId = (req as any).user?.sub;
    const data = await aiService.sendChatMessage(input, userId);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function listConversations(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.sub;
    const data = await aiService.listConversations(userId);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getConversation(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await aiService.getConversation(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function deleteConversation(req: Request, res: Response, next: NextFunction) {
  try {
    await aiService.deleteConversation(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function transcribe(req: Request, res: Response, next: NextFunction) {
  try {
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ success: false, message: "No audio file provided" });
    }
    const data = await aiService.transcribeAudio(file.buffer, file.originalname || "audio.webm");
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}