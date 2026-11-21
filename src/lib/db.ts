import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Runtime dùng kết nối pooled (phù hợp serverless, nhiều connection ngắn hạn);
  // rơi về DATABASE_URL nếu chưa cấu hình biến pooled riêng.
  const connectionString = process.env.DATABASE_URL_POOLED ?? process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Thiếu biến môi trường DATABASE_URL (hoặc DATABASE_URL_POOLED).");
  }

  const adapter = new PrismaPg(connectionString);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
