import { prisma } from "../../config/database";
import {
  CreatePaymentInput,
  UpdatePaymentStatusInput,
  ListPaymentsQuery,
} from "./payments.dto";

export async function createPayment(input: CreatePaymentInput) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: input.reservationId },
    include: { payments: true },
  });
  if (!reservation) throw { statusCode: 404, message: "Reservation not found" };

  const payment = await prisma.payment.create({
    data: {
      reservationId: input.reservationId,
      amount: input.amount,
      method: input.method,
      transactionRef: input.transactionRef,
      status: "PAID",
      paidAt: new Date(),
    },
  });

  const totalPaid =
    reservation.payments.reduce((sum, p) => sum + Number(p.amount), 0) + input.amount;

  if (totalPaid >= Number(reservation.totalAmount)) {
    await generateInvoiceIfMissing(reservation.id, Number(reservation.totalAmount));
  }

  return payment;
}

export async function listPayments(query: ListPaymentsQuery) {
  return prisma.payment.findMany({
    where: {
      ...(query.reservationId ? { reservationId: query.reservationId } : {}),
      ...(query.status ? { status: query.status as any } : {}),
      ...(query.method ? { method: query.method as any } : {}),
    },
    include: { reservation: { include: { guest: true, room: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPaymentById(id: string) {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { reservation: { include: { guest: true, room: true } } },
  });
  if (!payment) throw { statusCode: 404, message: "Payment not found" };
  return payment;
}

export async function updatePaymentStatus(id: string, input: UpdatePaymentStatusInput) {
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw { statusCode: 404, message: "Payment not found" };

  return prisma.payment.update({
    where: { id },
    data: {
      status: input.status,
      ...(input.status === "PAID" ? { paidAt: new Date() } : {}),
    },
  });
}

export async function refundPayment(id: string) {
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw { statusCode: 404, message: "Payment not found" };
  if (payment.status !== "PAID") {
    throw { statusCode: 400, message: "Only paid payments can be refunded" };
  }

  return prisma.payment.update({ where: { id }, data: { status: "REFUNDED" } });
}

async function generateInvoiceIfMissing(reservationId: string, amount: number) {
  const existing = await prisma.invoice.findFirst({ where: { reservationId } });
  if (existing) return existing;

  const invoiceNumber = `INV-${Date.now()}-${reservationId.slice(-6).toUpperCase()}`;
  const taxAmount = Math.round(amount * 0.15 * 100) / 100;

  return prisma.invoice.create({
    data: {
      reservationId,
      invoiceNumber,
      amount,
      taxAmount,
    },
  });
}