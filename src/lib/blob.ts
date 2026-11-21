import { del, put } from "@vercel/blob";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8MB
const MAX_AUDIO_SIZE = 20 * 1024 * 1024; // 20MB

export class BlobValidationError extends Error {}

export async function uploadGalleryImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new BlobValidationError("Chỉ cho phép tải lên file ảnh.");
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new BlobValidationError("Ảnh vượt quá dung lượng cho phép (tối đa 8MB).");
  }

  const pathname = `gallery/${Date.now()}-${sanitizeFileName(file.name)}`;
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return { url: blob.url, pathname: blob.pathname };
}

export async function uploadMusicTrack(file: File) {
  const allowed = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg"];
  if (!allowed.includes(file.type)) {
    throw new BlobValidationError("Chỉ cho phép file nhạc (mp3, wav, ogg).");
  }
  if (file.size > MAX_AUDIO_SIZE) {
    throw new BlobValidationError("File nhạc vượt quá dung lượng cho phép (tối đa 20MB).");
  }

  const pathname = `music/${Date.now()}-${sanitizeFileName(file.name)}`;
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return { url: blob.url, pathname: blob.pathname };
}

export async function deleteBlob(pathname: string) {
  await del(pathname);
}

function sanitizeFileName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9.\-]/g, "-")
    .toLowerCase();
}
