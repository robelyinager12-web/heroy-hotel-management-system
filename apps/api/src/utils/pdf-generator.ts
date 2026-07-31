import PDFDocument from "pdfkit";
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
    guest: { firstName: string; lastName: string };
    room: { number: string; roomType: { name: string } };
  }>;
}

export function streamRevenuePdf(res: Response, data: RevenueReportData) {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=heroy-revenue-report.pdf");
  doc.pipe(res);

  doc.fontSize(20).fillColor("#1c2434").text("Heroy Hotel — Revenue Report", { align: "left" });
  doc
    .fontSize(10)
    .fillColor("#666")
    .text(`${data.from.toDateString()} to ${data.to.toDateString()}`);
  doc.moveDown(1.5);

  doc.fontSize(12).fillColor("#000");
  doc.text(`Total Revenue: Br ${data.totalRevenue.toLocaleString()}`);
  doc.text(`Total Reservations: ${data.totalReservations}`);
  doc.text(`Total Room-Nights: ${data.totalNights}`);
  doc.moveDown(1.5);

  doc.fontSize(13).text("Reservation Detail", { underline: true });
  doc.moveDown(0.5);

  doc.fontSize(9);
  data.reservations.forEach((r) => {
    const line = `${r.guest.firstName} ${r.guest.lastName}  |  Room ${r.room.number} (${r.room.roomType.name})  |  ${new Date(r.checkInDate).toDateString()} - ${new Date(r.checkOutDate).toDateString()}  |  Br ${Number(r.totalAmount).toLocaleString()}`;
    doc.text(line);
    doc.moveDown(0.3);
  });

  doc.end();
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

export function streamOccupancyPdf(res: Response, data: OccupancyReportData) {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=heroy-occupancy-report.pdf");
  doc.pipe(res);

  doc.fontSize(20).fillColor("#1c2434").text("Heroy Hotel — Occupancy Report");
  doc.moveDown(1.5);

  doc.fontSize(12).fillColor("#000");
  doc.text(`Occupancy Rate: ${data.occupancyRate}%`);
  doc.text(`Total Rooms: ${data.totalRooms}`);
  doc.text(`Occupied: ${data.occupied}`);
  doc.text(`Available: ${data.available}`);
  doc.text(`Cleaning: ${data.cleaning}`);
  doc.text(`Maintenance: ${data.maintenance}`);
  doc.moveDown(1.5);

  doc.fontSize(13).text("Room Detail", { underline: true });
  doc.moveDown(0.5);

  doc.fontSize(9);
  data.rooms.forEach((r) => {
    doc.text(`Room ${r.number} · Floor ${r.floor ?? "-"} · ${r.roomType.name} · ${r.status}`);
    doc.moveDown(0.3);
  });

  doc.end();
}