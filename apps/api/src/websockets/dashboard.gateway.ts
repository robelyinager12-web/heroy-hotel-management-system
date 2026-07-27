import { Server as SocketIOServer, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface AuthedSocket extends Socket {
  userId?: string;
  role?: string;
}

const DASHBOARD_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER"];

export function registerDashboardGateway(io: SocketIOServer) {
  const namespace = io.of("/dashboard");

  namespace.use((socket: AuthedSocket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Missing auth token"));
    }
    try {
      const payload = jwt.verify(token, env.jwtSecret) as { sub: string; role: string };
      if (!DASHBOARD_ROLES.includes(payload.role)) {
        return next(new Error("Not authorized for dashboard updates"));
      }
      socket.userId = payload.sub;
      socket.role = payload.role;
      next();
    } catch {
      next(new Error("Invalid or expired token"));
    }
  });

  namespace.on("connection", (socket: AuthedSocket) => {
    socket.join("dashboard:live");
    socket.on("disconnect", () => {
      // room membership is cleaned up automatically by socket.io
    });
  });

  return namespace;
}

export function emitDashboardUpdate(
  io: SocketIOServer,
  payload: { metric: string; value: number | string }
) {
  io.of("/dashboard").to("dashboard:live").emit("metric_update", payload);
}