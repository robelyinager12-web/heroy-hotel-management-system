import { Request, Response, NextFunction } from "express";
import { createStaffUserSchema, updateUserSchema, listUsersQuerySchema } from "./users.dto";
import * as usersService from "./users.service";

export async function createStaffUser(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createStaffUserSchema.parse(req.body);
    const data = await usersService.createStaffUser(input);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listUsersQuerySchema.parse(req.query);
    const data = await usersService.listUsers(query);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await usersService.getUserById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateUserSchema.parse(req.body);
    const data = await usersService.updateUser(req.params.id, input);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function deactivateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await usersService.deactivateUser(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function reactivateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await usersService.reactivateUser(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}