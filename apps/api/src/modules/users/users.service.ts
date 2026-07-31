import bcrypt from "bcryptjs";
import { prisma } from "../../config/database";
import { CreateStaffUserInput, UpdateUserInput, ListUsersQuery } from "./users.dto";

const SALT_ROUNDS = 10;

function sanitizeUser(user: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string | null;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
}) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    phone: user.phone,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
  };
}

export async function createStaffUser(input: CreateStaffUserInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw { statusCode: 409, message: "Email already in use" };
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      role: input.role,
    },
  });

  return sanitizeUser(user);
}

export async function listUsers(query: ListUsersQuery) {
  const users = await prisma.user.findMany({
    where: {
      ...(query.role ? { role: query.role } : {}),
      ...(query.search
        ? {
            OR: [
              { firstName: { contains: query.search, mode: "insensitive" } },
              { lastName: { contains: query.search, mode: "insensitive" } },
              { email: { contains: query.search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return users.map(sanitizeUser);
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw { statusCode: 404, message: "User not found" };
  return sanitizeUser(user);
}

export async function updateUser(id: string, input: UpdateUserInput) {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "User not found" };

  const user = await prisma.user.update({ where: { id }, data: input });
  return sanitizeUser(user);
}

export async function deactivateUser(id: string) {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "User not found" };

  const user = await prisma.user.update({ where: { id }, data: { isActive: false } });
  return sanitizeUser(user);
}

export async function reactivateUser(id: string) {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "User not found" };

  const user = await prisma.user.update({ where: { id }, data: { isActive: true } });
  return sanitizeUser(user);
}