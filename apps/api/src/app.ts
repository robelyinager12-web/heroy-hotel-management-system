import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";

// Module routes
import authRoutes from "./modules/auth/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import roomsRoutes from "./modules/rooms/rooms.routes";
import reservationsRoutes from "./modules/reservations/reservations.routes";
import guestsRoutes from "./modules/guests/guests.routes";
import restaurantRoutes from "./modules/restaurant/restaurant.routes";
import housekeepingRoutes from "./modules/housekeeping/housekeeping.routes";
import paymentsRoutes from "./modules/payments/payments.routes";
import aiRoutes from "./modules/ai/ai.routes";
import reportsRoutes from "./modules/reports/reports.routes";

const app: Application = express();

// Security & performance
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: env.rateLimit.windowMs,
    max: env.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Parsing & logging
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.isProduction ? "combined" : "dev"));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/guests", guestsRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/housekeeping", housekeepingRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/reports", reportsRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler (must be last)
app.use(errorMiddleware);

export default app;