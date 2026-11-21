"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { deleteBlob, uploadMusicTrack, BlobValidationError } from "@/lib/blob";

export type MusicActionState = {
  error?: string;
  success?: boolean;
};

export async function uploadMusicTrackAction(
  _prevState: MusicActionState,
  formData: FormData
): Promise<MusicActionState> {
  await requireAdmin();

  const file = formData.get("file");
  const title = (formData.get("title") as string | null)?.trim() || "Nhạc nền";

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Vui lòng chọn một file nhạc để tải lên." };
  }

  try {
    const { url, pathname } = await uploadMusicTrack(file);
    const existingCount = await prisma.musicTrack.count();
    await prisma.musicTrack.create({
      data: { title, url, pathname, isActive: existingCount === 0 },
    });
  } catch (err) {
    if (err instanceof BlobValidationError) {
      return { error: err.message };
    }
    return { error: "Tải nhạc lên thất bại. Vui lòng thử lại." };
  }

  revalidatePath("/admin/music");
  revalidatePath("/");
  return { success: true };
}

export async function setActiveMusicTrackAction(id: string) {
  await requireAdmin();
  await prisma.$transaction([
    prisma.musicTrack.updateMany({ data: { isActive: false }, where: {} }),
    prisma.musicTrack.update({ where: { id }, data: { isActive: true } }),
  ]);
  revalidatePath("/admin/music");
  revalidatePath("/");
}

export async function deleteMusicTrackAction(id: string) {
  await requireAdmin();
  const track = await prisma.musicTrack.findUnique({ where: { id } });
  if (!track) return;

  await prisma.musicTrack.delete({ where: { id } });
  await deleteBlob(track.pathname).catch(() => undefined);

  revalidatePath("/admin/music");
  revalidatePath("/");
}
