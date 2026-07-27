import express, { Application, Router } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";

// Module routes
import authRoutes from "./modules/auth/auth.routes";

// Placeholder routers for modules not yet implemented
const placeholder = Router();
placeholder.use((_req, res) => {
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

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

// Routes — implemented
app.use("/api/auth", authRoutes);

// Routes — not yet implemented (return 501 until built)
app.use("/api/users", placeholder);
app.use("/api/rooms", placeholder);
app.use("/api/reservations", placeholder);
app.use("/api/guests", placeholder);
app.use("/api/restaurant", placeholder);
app.use("/api/housekeeping", placeholder);
app.use("/api/payments", placeholder);
app.use("/api/ai", placeholder);
app.use("/api/reports", placeholder);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler (must be last)
app.use(errorMiddleware);

export default app;