import { Request, Response, NextFunction } from "express";
import {
  createPaymentSchema,
  updatePaymentStatusSchema,
  listPaymentsQuerySchema,
} from "./payments.dto";
import * as paymentsService from "./payments.service";

export async function createPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createPaymentSchema.parse(req.body);
    const data = await paymentsService.createPayment(input);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function listPayments(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listPaymentsQuerySchema.parse(req.query);
    const data = await paymentsService.listPayments(query);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getPaymentById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await paymentsService.getPaymentById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updatePaymentStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updatePaymentStatusSchema.parse(req.body);
    const data = await paymentsService.updatePaymentStatus(req.params.id, input);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function refundPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await paymentsService.refundPayment(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}