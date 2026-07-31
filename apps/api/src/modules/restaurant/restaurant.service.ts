import { prisma } from "../../config/database";
import {
  CreateMenuItemInput,
  UpdateMenuItemInput,
  CreateOrderInput,
  UpdateOrderStatusInput,
} from "./restaurant.dto";

// ---------- Menu ----------

export async function listMenuItems(branchId?: string, category?: string) {
  return prisma.restaurantMenuItem.findMany({
    where: {
      ...(branchId ? { branchId } : {}),
      ...(category ? { category } : {}),
      isAvailable: true,
    },
    orderBy: { category: "asc" },
  });
}

export async function createMenuItem(input: CreateMenuItemInput) {
  return prisma.restaurantMenuItem.create({ data: input });
}

export async function updateMenuItem(id: string, input: UpdateMenuItemInput) {
  const existing = await prisma.restaurantMenuItem.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Menu item not found" };

  return prisma.restaurantMenuItem.update({ where: { id }, data: input });
}

export async function deleteMenuItem(id: string) {
  const existing = await prisma.restaurantMenuItem.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Menu item not found" };

  await prisma.restaurantMenuItem.update({ where: { id }, data: { isAvailable: false } });
}

// ---------- Orders ----------

export async function createOrder(input: CreateOrderInput) {
  const menuItems = await prisma.restaurantMenuItem.findMany({
    where: { id: { in: input.items.map((i) => i.menuItemId) } },
  });

  if (menuItems.length !== input.items.length) {
    throw { statusCode: 400, message: "One or more menu items not found" };
  }

  const priceMap = new Map(menuItems.map((m) => [m.id, Number(m.price)]));
  const totalAmount = input.items.reduce(
    (sum, item) => sum + (priceMap.get(item.menuItemId) || 0) * item.quantity,
    0
  );

  return prisma.order.create({
    data: {
      branchId: input.branchId,
      guestId: input.guestId,
      roomNumber: input.roomNumber,
      totalAmount,
      status: "PENDING",
      items: {
        create: input.items.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: priceMap.get(item.menuItemId) || 0,
        })),
      },
    },
    include: { items: { include: { menuItem: true } } },
  });
}

export async function listOrders(branchId?: string, status?: string) {
  return prisma.order.findMany({
    where: {
      ...(branchId ? { branchId } : {}),
      ...(status ? { status: status as any } : {}),
    },
    include: { items: { include: { menuItem: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { menuItem: true } } },
  });
  if (!order) throw { statusCode: 404, message: "Order not found" };
  return order;
}

export async function updateOrderStatus(id: string, input: UpdateOrderStatusInput) {
  const existing = await prisma.order.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Order not found" };

  return prisma.order.update({ where: { id }, data: { status: input.status } });
}