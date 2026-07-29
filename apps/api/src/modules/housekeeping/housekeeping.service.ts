import { prisma } from "../../config/database";
import {
  CreateHousekeepingLogInput,
  UpdateHousekeepingLogInput,
  ListHousekeepingQuery,
} from "./housekeeping.dto";

export async function createLog(input: CreateHousekeepingLogInput) {
  const room = await prisma.room.findUnique({ where: { id: input.roomId } });
  if (!room) throw { statusCode: 404, message: "Room not found" };

  return prisma.housekeepingLog.create({
    data: {
      roomId: input.roomId,
      assignedTo: input.assignedTo,
      notes: input.notes,
    },
  });
}

export async function listLogs(query: ListHousekeepingQuery) {
  return prisma.housekeepingLog.findMany({
    where: {
      ...(query.roomId ? { roomId: query.roomId } : {}),
      ...(query.completed === "true" ? { completedAt: { not: null } } : {}),
      ...(query.completed === "false" ? { completedAt: null } : {}),
    },
    include: { room: { include: { roomType: true, branch: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getLogById(id: string) {
  const log = await prisma.housekeepingLog.findUnique({
    where: { id },
    include: { room: { include: { roomType: true, branch: true } } },
  });
  if (!log) throw { statusCode: 404, message: "Housekeeping log not found" };
  return log;
}

export async function updateLog(id: string, input: UpdateHousekeepingLogInput) {
  const existing = await prisma.housekeepingLog.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Housekeeping log not found" };

  return prisma.housekeepingLog.update({
    where: { id },
    data: {
      assignedTo: input.assignedTo,
      notes: input.notes,
      startedAt: input.startedAt ? new Date(input.startedAt) : undefined,
      completedAt: input.completedAt ? new Date(input.completedAt) : undefined,
    },
  });
}

export async function startCleaning(id: string) {
  const existing = await prisma.housekeepingLog.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Housekeeping log not found" };

  return prisma.housekeepingLog.update({
    where: { id },
    data: { startedAt: new Date() },
  });
}

export async function completeCleaning(id: string) {
  const existing = await prisma.housekeepingLog.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Housekeeping log not found" };

  const log = await prisma.housekeepingLog.update({
    where: { id },
    data: { completedAt: new Date() },
  });

  // Room becomes available again once cleaning is confirmed complete
  await prisma.room.update({
    where: { id: existing.roomId },
    data: { status: "AVAILABLE" },
  });

  return log;
}

// Priority list: rooms currently marked CLEANING, oldest pending log first —
// this is what the AI Housekeeping "suggest rooms to clean" feature will consume later.
export async function getCleaningPriorityQueue() {
  return prisma.room.findMany({
    where: { status: "CLEANING" },
    include: {
      roomType: true,
      branch: true,
      housekeepingLogs: {
        where: { completedAt: null },
        orderBy: { createdAt: "asc" },
        take: 1,
      },
    },
  });
}