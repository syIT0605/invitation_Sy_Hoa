"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { deleteBlob, uploadGalleryImage, BlobValidationError } from "@/lib/blob";

export type GalleryActionState = {
  error?: string;
  success?: boolean;
};

export async function uploadGalleryImageAction(
  _prevState: GalleryActionState,
  formData: FormData
): Promise<GalleryActionState> {
  await requireAdmin();

  const file = formData.get("file");
  const caption = (formData.get("caption") as string | null)?.trim() || null;

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Vui lòng chọn một ảnh để tải lên." };
  }

  try {
    const { url, pathname } = await uploadGalleryImage(file);
    const maxOrder = await prisma.galleryImage.aggregate({ _max: { order: true } });
    await prisma.galleryImage.create({
      data: {
        url,
        pathname,
        caption,
        order: (maxOrder._max.order ?? 0) + 1,
      },
    });
  } catch (err) {
    if (err instanceof BlobValidationError) {
      return { error: err.message };
    }
    return { error: "Tải ảnh lên thất bại. Vui lòng thử lại." };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}

export async function deleteGalleryImageAction(id: string) {
  await requireAdmin();
  const image = await prisma.galleryImage.findUnique({ where: { id } });
  if (!image) return;

  await prisma.galleryImage.delete({ where: { id } });
  await deleteBlob(image.pathname).catch(() => undefined);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function updateGalleryCaptionAction(id: string, formData: FormData) {
  await requireAdmin();
  const caption = (formData.get("caption") as string | null)?.trim() || null;
  await prisma.galleryImage.update({ where: { id }, data: { caption } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function moveGalleryImageAction(id: string, direction: "up" | "down") {
  await requireAdmin();

  const images = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
  const index = images.findIndex((img) => img.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= images.length) return;

  const current = images[index];
  const swap = images[swapIndex];

  await prisma.$transaction([
    prisma.galleryImage.update({ where: { id: current.id }, data: { order: swap.order } }),
    prisma.galleryImage.update({ where: { id: swap.id }, data: { order: current.order } }),
  ]);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}
