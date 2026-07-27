import http from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import { env } from "./config/env";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { registerNotificationsGateway } from "./websockets/notifications.gateway";
import { registerDashboardGateway } from "./websockets/dashboard.gateway";

async function bootstrap() {
  await connectDatabase();

  const server = http.createServer(app);

  const io = new SocketIOServer(server, {
    cors: {
      origin: env.clientUrl,
      credentials: true,
    },
  });

  registerNotificationsGateway(io);
  registerDashboardGateway(io);

  server.listen(env.port, () => {
    console.log(`Heroy API running on port ${env.port} [${env.nodeEnv}]`);
  });

  const shutdown = async (signal: string) => {
    console.log(`${signal} received. Shutting down gracefully...`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});