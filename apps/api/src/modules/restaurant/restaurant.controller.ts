import { Request, Response, NextFunction } from "express";
import {
  createMenuItemSchema,
  updateMenuItemSchema,
  createOrderSchema,
  updateOrderStatusSchema,
} from "./restaurant.dto";
import * as restaurantService from "./restaurant.service";

// Menu

export async function listMenuItems(req: Request, res: Response, next: NextFunction) {
  try {
    const { branchId, category } = req.query;
    const data = await restaurantService.listMenuItems(branchId as string, category as string);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function createMenuItem(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createMenuItemSchema.parse(req.body);
    const data = await restaurantService.createMenuItem(input);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateMenuItem(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateMenuItemSchema.parse(req.body);
    const data = await restaurantService.updateMenuItem(req.params.id, input);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function deleteMenuItem(req: Request, res: Response, next: NextFunction) {
  try {
    await restaurantService.deleteMenuItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

// Orders

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createOrderSchema.parse(req.body);
    const data = await restaurantService.createOrder(input);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function listOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const { branchId, status } = req.query;
    const data = await restaurantService.listOrders(branchId as string, status as string);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await restaurantService.getOrderById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateOrderStatusSchema.parse(req.body);
    const data = await restaurantService.updateOrderStatus(req.params.id, input);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}