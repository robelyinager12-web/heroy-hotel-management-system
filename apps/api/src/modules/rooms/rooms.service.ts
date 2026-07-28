import { prisma } from "../../config/database";
import {
  CreateRoomTypeInput,
  UpdateRoomTypeInput,
  CreateRoomInput,
  UpdateRoomInput,
  UpdateRoomStatusInput,
  CheckAvailabilityInput,
} from "./rooms.dto";

// ---------- Room Types ----------

export async function listRoomTypes() {
  return prisma.roomType.findMany({ orderBy: { basePrice: "asc" } });
}

export async function createRoomType(input: CreateRoomTypeInput) {
  return prisma.roomType.create({ data: input });
}

export async function updateRoomType(id: string, input: UpdateRoomTypeInput) {
  const existing = await prisma.roomType.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Room type not found" };

  return prisma.roomType.update({ where: { id }, data: input });
}

export async function deleteRoomType(id: string) {
  const existing = await prisma.roomType.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Room type not found" };

  await prisma.roomType.delete({ where: { id } });
}

// ---------- Rooms ----------

export async function listRooms(branchId?: string, status?: string) {
  return prisma.room.findMany({
    where: {
      ...(branchId ? { branchId } : {}),
      ...(status ? { status: status as any } : {}),
    },
    include: { roomType: true, branch: true },
    orderBy: { number: "asc" },
  });
}

export async function getRoomById(id: string) {
  const room = await prisma.room.findUnique({
    where: { id },
    include: { roomType: true, branch: true },
  });
  if (!room) throw { statusCode: 404, message: "Room not found" };
  return room;
}

export async function createRoom(input: CreateRoomInput) {
  const existing = await prisma.room.findFirst({
    where: { branchId: input.branchId, number: input.number },
  });
  if (existing) {
    throw { statusCode: 409, message: "Room number already exists in this branch" };
  }

  return prisma.room.create({ data: input });
}

export async function updateRoom(id: string, input: UpdateRoomInput) {
  const existing = await prisma.room.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Room not found" };

  return prisma.room.update({ where: { id }, data: input });
}

export async function updateRoomStatus(id: string, input: UpdateRoomStatusInput) {
  const existing = await prisma.room.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Room not found" };

  return prisma.room.update({ where: { id }, data: { status: input.status } });
}

export async function deleteRoom(id: string) {
  const existing = await prisma.room.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Room not found" };

  await prisma.room.update({ where: { id }, data: { isActive: false } });
}

// ---------- Availability ----------

export async function checkAvailability(input: CheckAvailabilityInput) {
  const checkIn = new Date(input.checkInDate);
  const checkOut = new Date(input.checkOutDate);

  if (checkIn >= checkOut) {
    throw { statusCode: 400, message: "checkOutDate must be after checkInDate" };
  }

  const rooms = await prisma.room.findMany({
    where: {
      branchId: input.branchId,
      isActive: true,
      status: { not: "OUT_OF_SERVICE" },
      ...(input.roomTypeId ? { roomTypeId: input.roomTypeId } : {}),
      roomType: { maxOccupancy: { gte: input.adults + input.children } },
      reservations: {
        none: {
          status: { in: ["PENDING", "CONFIRMED", "CHECKED_IN"] },
          AND: [
            { checkInDate: { lt: checkOut } },
            { checkOutDate: { gt: checkIn } },
          ],
        },
      },
    },
    include: { roomType: true, branch: true },
    orderBy: { roomType: { basePrice: "asc" } },
  });

  return rooms;
}