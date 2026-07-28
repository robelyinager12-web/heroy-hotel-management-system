import { Request, Response, NextFunction } from "express";
import {
  createRoomTypeSchema,
  updateRoomTypeSchema,
  createRoomSchema,
  updateRoomSchema,
  updateRoomStatusSchema,
  checkAvailabilitySchema,
} from "./rooms.dto";
import * as roomsService from "./rooms.service";

// Room Types

export async function listRoomTypes(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await roomsService.listRoomTypes();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function createRoomType(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createRoomTypeSchema.parse(req.body);
    const data = await roomsService.createRoomType(input);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateRoomType(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateRoomTypeSchema.parse(req.body);
    const data = await roomsService.updateRoomType(req.params.id, input);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function deleteRoomType(req: Request, res: Response, next: NextFunction) {
  try {
    await roomsService.deleteRoomType(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

// Rooms

export async function listRooms(req: Request, res: Response, next: NextFunction) {
  try {
    const { branchId, status } = req.query;
    const data = await roomsService.listRooms(branchId as string, status as string);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getRoomById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await roomsService.getRoomById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function createRoom(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createRoomSchema.parse(req.body);
    const data = await roomsService.createRoom(input);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateRoom(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateRoomSchema.parse(req.body);
    const data = await roomsService.updateRoom(req.params.id, input);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateRoomStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateRoomStatusSchema.parse(req.body);
    const data = await roomsService.updateRoomStatus(req.params.id, input);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function deleteRoom(req: Request, res: Response, next: NextFunction) {
  try {
    await roomsService.deleteRoom(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

// Availability

export async function checkAvailability(req: Request, res: Response, next: NextFunction) {
  try {
    const input = checkAvailabilitySchema.parse(req.body);
    const data = await roomsService.checkAvailability(input);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}