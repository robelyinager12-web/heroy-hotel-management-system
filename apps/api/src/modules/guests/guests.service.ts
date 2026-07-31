import { prisma } from "../../config/database";
import { CreateGuestInput, UpdateGuestInput, ListGuestsQuery } from "./guests.dto";

export async function createGuest(input: CreateGuestInput) {
  return prisma.guest.create({
    data: {
      ...input,
      dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : undefined,
    },
  });
}

export async function listGuests(query: ListGuestsQuery) {
  return prisma.guest.findMany({
    where: {
      ...(query.search
        ? {
            OR: [
              { firstName: { contains: query.search, mode: "insensitive" } },
              { lastName: { contains: query.search, mode: "insensitive" } },
              { email: { contains: query.search, mode: "insensitive" } },
              { phone: { contains: query.search, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(query.vipStatus ? { vipStatus: query.vipStatus === "true" } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getGuestById(id: string) {
  const guest = await prisma.guest.findUnique({
    where: { id },
    include: {
      reservations: {
        include: { room: { include: { roomType: true } } },
        orderBy: { checkInDate: "desc" },
      },
    },
  });
  if (!guest) throw { statusCode: 404, message: "Guest not found" };
  return guest;
}

export async function updateGuest(id: string, input: UpdateGuestInput) {
  const existing = await prisma.guest.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Guest not found" };

  return prisma.guest.update({
    where: { id },
    data: {
      ...input,
      dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : undefined,
    },
  });
}

export async function deleteGuest(id: string) {
  const existing = await prisma.guest.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Guest not found" };

  await prisma.guest.delete({ where: { id } });
}

export async function getGuestStats(id: string) {
  const guest = await prisma.guest.findUnique({
    where: { id },
    include: { reservations: { include: { payments: true } } },
  });
  if (!guest) throw { statusCode: 404, message: "Guest not found" };

  const totalStays = guest.reservations.filter((r) => r.status === "CHECKED_OUT").length;
  const totalSpent = guest.reservations
    .flatMap((r) => r.payments)
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return { totalStays, totalSpent, totalReservations: guest.reservations.length };
}