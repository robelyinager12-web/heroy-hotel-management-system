import { Request, Response, NextFunction } from "express";
import {
  createReservationSchema,
  updateReservationStatusSchema,
  listReservationsQuerySchema,
} from "./reservations.dto";
import * as reservationsService from "./reservations.service";

export async function createReservation(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createReservationSchema.parse(req.body);
    const userId = (req as any).user?.sub;
    const data = await reservationsService.createReservation(input, userId);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function listReservations(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listReservationsQuerySchema.parse(req.query);
    const data = await reservationsService.listReservations(query);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getReservationById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await reservationsService.getReservationById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateReservationStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateReservationStatusSchema.parse(req.body);
    const data = await reservationsService.updateReservationStatus(req.params.id, input);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function cancelReservation(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await reservationsService.cancelReservation(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}