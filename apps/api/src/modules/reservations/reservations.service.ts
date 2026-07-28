import { prisma } from "../../config/database";
import {
  CreateReservationInput,
  UpdateReservationStatusInput,
  ListReservationsQuery,
} from "./reservations.dto";

async function assertRoomIsFree(
  roomId: string,
  checkIn: Date,
  checkOut: Date,
  excludeReservationId?: string
) {
  const conflict = await prisma.reservation.findFirst({
    where: {
      roomId,
      id: excludeReservationId ? { not: excludeReservationId } : undefined,
      status: { in: ["PENDING", "CONFIRMED", "CHECKED_IN"] },
      AND: [{ checkInDate: { lt: checkOut } }, { checkOutDate: { gt: checkIn } }],
    },
  });

  if (conflict) {
    throw { statusCode: 409, message: "Room is not available for the selected dates" };
  }
}

export async function createReservation(input: CreateReservationInput, bookedByUserId?: string) {
  const checkIn = new Date(input.checkInDate);
  const checkOut = new Date(input.checkOutDate);

  if (checkIn >= checkOut) {
    throw { statusCode: 400, message: "checkOutDate must be after checkInDate" };
  }

  const room = await prisma.room.findUnique({
    where: { id: input.roomId },
    include: { roomType: true },
  });
  if (!room || !room.isActive) {
    throw { statusCode: 404, message: "Room not found" };
  }

  await assertRoomIsFree(input.roomId, checkIn, checkOut);

  let guestId = input.guestId;
  if (!guestId && input.guest) {
    const guest = await prisma.guest.create({ data: input.guest });
    guestId = guest.id;
  }
  if (!guestId) {
    throw { statusCode: 400, message: "guestId or guest details required" };
  }

  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  const totalAmount = Number(room.roomType.basePrice) * nights;

  const reservation = await prisma.reservation.create({
    data: {
      branchId: input.branchId,
      roomId: input.roomId,
      guestId,
      bookedByUserId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults: input.adults,
      children: input.children,
      promoCode: input.promoCode,
      source: input.source,
      notes: input.notes,
      totalAmount,
      status: "PENDING",
    },
    include: { room: { include: { roomType: true } }, guest: true, branch: true },
  });

  await prisma.room.update({ where: { id: input.roomId }, data: { status: "RESERVED" } });

  return reservation;
}

export async function listReservations(query: ListReservationsQuery) {
  return prisma.reservation.findMany({
    where: {
      ...(query.branchId ? { branchId: query.branchId } : {}),
      ...(query.status ? { status: query.status as any } : {}),
      ...(query.guestId ? { guestId: query.guestId } : {}),
      ...(query.from ? { checkInDate: { gte: new Date(query.from) } } : {}),
      ...(query.to ? { checkOutDate: { lte: new Date(query.to) } } : {}),
    },
    include: { room: { include: { roomType: true } }, guest: true, branch: true },
    orderBy: { checkInDate: "desc" },
  });
}

export async function getReservationById(id: string) {
  const reservation = await prisma.reservation.findUnique({
    where: { id },
    include: {
      room: { include: { roomType: true } },
      guest: true,
      branch: true,
      payments: true,
      invoices: true,
    },
  });
  if (!reservation) throw { statusCode: 404, message: "Reservation not found" };
  return reservation;
}

export async function updateReservationStatus(id: string, input: UpdateReservationStatusInput) {
  const reservation = await prisma.reservation.findUnique({ where: { id } });
  if (!reservation) throw { statusCode: 404, message: "Reservation not found" };

  const updated = await prisma.reservation.update({
    where: { id },
    data: {
      status: input.status,
      ...(input.status === "CHECKED_IN" ? { actualCheckIn: new Date() } : {}),
      ...(input.status === "CHECKED_OUT" ? { actualCheckOut: new Date() } : {}),
    },
  });

  const roomStatusMap: Record<string, string> = {
    CHECKED_IN: "OCCUPIED",
    CHECKED_OUT: "CLEANING",
    CANCELLED: "AVAILABLE",
    NO_SHOW: "AVAILABLE",
  };
  const nextRoomStatus = roomStatusMap[input.status];
  if (nextRoomStatus) {
    await prisma.room.update({
      where: { id: reservation.roomId },
      data: { status: nextRoomStatus as any },
    });
  }

  if (input.status === "CHECKED_OUT") {
    await prisma.housekeepingLog.create({
      data: { roomId: reservation.roomId, notes: "Auto-created after guest checkout" },
    });
  }

  return updated;
}

export async function cancelReservation(id: string) {
  return updateReservationStatus(id, { status: "CANCELLED" });
}