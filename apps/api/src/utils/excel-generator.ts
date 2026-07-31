import ExcelJS from "exceljs";
import { Response } from "express";

interface RevenueReportData {
  from: Date;
  to: Date;
  totalRevenue: number;
  totalReservations: number;
  totalNights: number;
  reservations: Array<{
    id: string;
    checkInDate: Date;
    checkOutDate: Date;
    totalAmount: unknown;
    status: string;
    guest: { firstName: string; lastName: string };
    room: { number: string; roomType: { name: string } };
  }>;
}

export async function streamRevenueExcel(res: Response, data: RevenueReportData) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Heroy Hotel";

  const summary = workbook.addWorksheet("Summary");
  summary.columns = [
    { header: "Metric", key: "metric", width: 30 },
    { header: "Value", key: "value", width: 20 },
  ];
  summary.addRows([
    { metric: "Report Period", value: `${data.from.toDateString()} - ${data.to.toDateString()}` },
    { metric: "Total Revenue (Br)", value: data.totalRevenue },
    { metric: "Total Reservations", value: data.totalReservations },
    { metric: "Total Room-Nights", value: data.totalNights },
  ]);
  summary.getRow(1).font = { bold: true };

  const detail = workbook.addWorksheet("Reservations");
  detail.columns = [
    { header: "Guest", key: "guest", width: 25 },
    { header: "Room", key: "room", width: 15 },
    { header: "Room Type", key: "roomType", width: 20 },
    { header: "Check In", key: "checkIn", width: 15 },
    { header: "Check Out", key: "checkOut", width: 15 },
    { header: "Status", key: "status", width: 15 },
    { header: "Amount (Br)", key: "amount", width: 15 },
  ];
  detail.getRow(1).font = { bold: true };

  data.reservations.forEach((r) => {
    detail.addRow({
      guest: `${r.guest.firstName} ${r.guest.lastName}`,
      room: r.room.number,
      roomType: r.room.roomType.name,
      checkIn: new Date(r.checkInDate).toDateString(),
      checkOut: new Date(r.checkOutDate).toDateString(),
      status: r.status,
      amount: Number(r.totalAmount),
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=heroy-revenue-report.xlsx");

  await workbook.xlsx.write(res);
  res.end();
}

interface OccupancyReportData {
  totalRooms: number;
  occupied: number;
  available: number;
  maintenance: number;
  cleaning: number;
  occupancyRate: number;
  rooms: Array<{
    number: string;
    status: string;
    floor: number | null;
    roomType: { name: string };
    branch: { name: string };
  }>;
}

export async function streamOccupancyExcel(res: Response, data: OccupancyReportData) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Heroy Hotel";

  const summary = workbook.addWorksheet("Summary");
  summary.columns = [
    { header: "Metric", key: "metric", width: 25 },
    { header: "Value", key: "value", width: 15 },
  ];
  summary.addRows([
    { metric: "Occupancy Rate", value: `${data.occupancyRate}%` },
    { metric: "Total Rooms", value: data.totalRooms },
    { metric: "Occupied", value: data.occupied },
    { metric: "Available", value: data.available },
    { metric: "Cleaning", value: data.cleaning },
    { metric: "Maintenance", value: data.maintenance },
  ]);
  summary.getRow(1).font = { bold: true };

  const detail = workbook.addWorksheet("Rooms");
  detail.columns = [
    { header: "Room", key: "room", width: 12 },
    { header: "Floor", key: "floor", width: 10 },
    { header: "Room Type", key: "roomType", width: 20 },
    { header: "Branch", key: "branch", width: 25 },
    { header: "Status", key: "status", width: 15 },
  ];
  detail.getRow(1).font = { bold: true };

  data.rooms.forEach((r) => {
    detail.addRow({
      room: r.number,
      floor: r.floor ?? "-",
      roomType: r.roomType.name,
      branch: r.branch.name,
      status: r.status,
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=heroy-occupancy-report.xlsx");

  await workbook.xlsx.write(res);
  res.end();
}