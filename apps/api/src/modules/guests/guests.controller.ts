import { Request, Response, NextFunction } from "express";
import {
  createGuestSchema,
  updateGuestSchema,
  listGuestsQuerySchema,
} from "./guests.dto";
import * as guestsService from "./guests.service";

export async function createGuest(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createGuestSchema.parse(req.body);
    const data = await guestsService.createGuest(input);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function listGuests(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listGuestsQuerySchema.parse(req.query);
    const data = await guestsService.listGuests(query);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getGuestById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await guestsService.getGuestById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateGuest(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateGuestSchema.parse(req.body);
    const data = await guestsService.updateGuest(req.params.id, input);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function deleteGuest(req: Request, res: Response, next: NextFunction) {
  try {
    await guestsService.deleteGuest(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function getGuestStats(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await guestsService.getGuestStats(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}