import { Request, Response, NextFunction } from "express";
import {
  createHousekeepingLogSchema,
  updateHousekeepingLogSchema,
  listHousekeepingQuerySchema,
} from "./housekeeping.dto";
import * as housekeepingService from "./housekeeping.service";

export async function createLog(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createHousekeepingLogSchema.parse(req.body);
    const data = await housekeepingService.createLog(input);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function listLogs(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listHousekeepingQuerySchema.parse(req.query);
    const data = await housekeepingService.listLogs(query);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getLogById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await housekeepingService.getLogById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateLog(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateHousekeepingLogSchema.parse(req.body);
    const data = await housekeepingService.updateLog(req.params.id, input);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function startCleaning(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await housekeepingService.startCleaning(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function completeCleaning(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await housekeepingService.completeCleaning(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getCleaningPriorityQueue(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await housekeepingService.getCleaningPriorityQueue();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}