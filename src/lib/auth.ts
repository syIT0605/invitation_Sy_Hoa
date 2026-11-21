import { SignJWT, jwtVerify } from "jose";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 ngày

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET chưa được thiết lập hoặc quá ngắn (cần tối thiểu 16 ký tự). Hãy thêm vào biến môi trường."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminSessionToken(username: string) {
  return new SignJWT({ role: "admin", username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload.role !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}

export const adminSessionMaxAge = SESSION_DURATION_SECONDS;
