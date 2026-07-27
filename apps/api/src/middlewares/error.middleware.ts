import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

interface AppError {
  statusCode?: number;
  message: string;
}

export function errorMiddleware(
  err: AppError | ZodError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    });
  }

  const statusCode = (err as AppError).statusCode || 500;
  const message = err.message || "Internal server error";

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({ success: false, message });
}