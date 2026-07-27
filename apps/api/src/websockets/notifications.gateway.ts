import { Server as SocketIOServer, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface AuthedSocket extends Socket {
  userId?: string;
  role?: string;
}

export function registerNotificationsGateway(io: SocketIOServer) {
  const namespace = io.of("/notifications");

  namespace.use((socket: AuthedSocket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Missing auth token"));
    }
    try {
      const payload = jwt.verify(token, env.jwtSecret) as { sub: string; role: string };
      socket.userId = payload.sub;
      socket.role = payload.role;
      next();
    } catch {
      next(new Error("Invalid or expired token"));
    }
  });

  namespace.on("connection", (socket: AuthedSocket) => {
    if (socket.userId) {
      socket.join(`user:${socket.userId}`);
    }
    if (socket.role) {
      socket.join(`role:${socket.role}`);
    }

    socket.on("disconnect", () => {
      // room membership is cleaned up automatically by socket.io
    });
  });

  return namespace;
}

export function emitNotificationToUser(
  io: SocketIOServer,
  userId: string,
  payload: { title: string; message: string; type: string }
) {
  io.of("/notifications").to(`user:${userId}`).emit("notification", payload);
}

export function emitNotificationToRole(
  io: SocketIOServer,
  role: string,
  payload: { title: string; message: string; type: string }
) {
  io.of("/notifications").to(`role:${role}`).emit("notification", payload);
}