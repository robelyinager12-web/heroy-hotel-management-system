import { prisma } from "../../config/database";
import { ReportRangeInput } from "./reports.dto";

export async function getRevenueReportData(input: ReportRangeInput) {
  const from = new Date(input.from);
  const to = new Date(input.to);

  const reservations = await prisma.reservation.findMany({
    where: {
      ...(input.branchId ? { branchId: input.branchId } : {}),
      createdAt: { gte: from, lte: to },
      status: { not: "CANCELLED" },
    },
    include: {
      room: { include: { roomType: true } },
      guest: true,
      payments: { where: { status: "PAID" } },
    },
    orderBy: { createdAt: "asc" },
  });

  const totalRevenue = reservations
    .flatMap((r) => r.payments)
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalReservations = reservations.length;
  const totalNights = reservations.reduce((sum, r) => {
    const nights = Math.ceil(
      (r.checkOutDate.getTime() - r.checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return sum + nights;
  }, 0);

  return {
    from,
    to,
    totalRevenue,
    totalReservations,
    totalNights,
    reservations,
  };
}

export async function getOccupancyReportData(input: ReportRangeInput) {
  const rooms = await prisma.room.findMany({
    where: input.branchId ? { branchId: input.branchId } : {},
    include: { roomType: true, branch: true },
  });

  const occupied = rooms.filter((r) => r.status === "OCCUPIED").length;
  const available = rooms.filter((r) => r.status === "AVAILABLE").length;
  const maintenance = rooms.filter((r) => r.status === "MAINTENANCE").length;
  const cleaning = rooms.filter((r) => r.status === "CLEANING").length;

  return {
    totalRooms: rooms.length,
    occupied,
    available,
    maintenance,
    cleaning,
    occupancyRate: rooms.length > 0 ? Math.round((occupied / rooms.length) * 100) : 0,
    rooms,
  };
}