import { defineConfig, env } from "@prisma/config";

// Dùng cho các lệnh CLI (prisma db push, prisma migrate, prisma studio...).
// Kết nối trực tiếp (không qua Accelerate) — khớp với biến DATABASE_URL mà
// tích hợp "Prisma Postgres" trên Vercel tự thêm vào project.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
