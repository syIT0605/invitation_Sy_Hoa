"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { adminLoginSchema } from "@/lib/validations";
import { ADMIN_SESSION_COOKIE, adminSessionMaxAge, createAdminSessionToken } from "@/lib/auth";

export type LoginActionState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const parsed = adminLoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu." };
  }

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !expectedPasswordHash) {
    return {
      error: "Hệ thống chưa được cấu hình ADMIN_USERNAME / ADMIN_PASSWORD_HASH.",
    };
  }

  const usernameMatches = parsed.data.username === expectedUsername;
  const passwordMatches = await bcrypt.compare(parsed.data.password, expectedPasswordHash);

  if (!usernameMatches || !passwordMatches) {
    return { error: "Tên đăng nhập hoặc mật khẩu không đúng." };
  }

  const token = await createAdminSessionToken(parsed.data.username);
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: adminSessionMaxAge,
  });

  return {};
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}
