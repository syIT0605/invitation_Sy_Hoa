import "server-only";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/auth";

/** Dùng trong Server Actions / Server Components để xác thực admin (lớp bảo vệ bổ sung ngoài middleware). */
export async function requireAdmin() {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  const payload = token ? await verifyAdminSessionToken(token) : null;
  if (!payload) {
    throw new Error("UNAUTHORIZED");
  }
  return payload;
}

export async function getAdminSession() {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminSessionToken(token);
}
