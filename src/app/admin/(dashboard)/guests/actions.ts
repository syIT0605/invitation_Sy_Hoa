"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { guestCreateSchema, guestUpdateSchema } from "@/lib/validations";
import { generateGuestSlug } from "@/lib/slug";

export type GuestActionState = {
  error?: string;
  success?: boolean;
};

function formDataToGuestInput(formData: FormData) {
  return {
    name: formData.get("name"),
    phone: formData.get("phone") ?? "",
    side: formData.get("side") || "BOTH",
    group: formData.get("group") ?? "",
    maxCompanions: formData.get("maxCompanions") || 1,
    note: formData.get("note") ?? "",
  };
}

export async function createGuestAction(
  _prevState: GuestActionState,
  formData: FormData
): Promise<GuestActionState> {
  await requireAdmin();

  const parsed = guestCreateSchema.safeParse(formDataToGuestInput(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  }

  let slug = generateGuestSlug(parsed.data.name);
  for (let attempt = 0; attempt < 5; attempt++) {
    const existing = await prisma.guest.findUnique({ where: { slug } });
    if (!existing) break;
    slug = generateGuestSlug(parsed.data.name);
  }

  await prisma.guest.create({
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      side: parsed.data.side,
      group: parsed.data.group || null,
      maxCompanions: parsed.data.maxCompanions,
      note: parsed.data.note || null,
      slug,
    },
  });

  revalidatePath("/admin/guests");
  return { success: true };
}

export async function updateGuestAction(
  _prevState: GuestActionState,
  formData: FormData
): Promise<GuestActionState> {
  await requireAdmin();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { error: "Thiếu thông tin khách mời." };
  }

  const parsed = guestUpdateSchema.safeParse(formDataToGuestInput(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  }

  await prisma.guest.update({
    where: { id },
    data: {
      ...parsed.data,
      phone: parsed.data.phone || null,
      group: parsed.data.group || null,
      note: parsed.data.note || null,
    },
  });

  revalidatePath("/admin/guests");
  return { success: true };
}

export async function deleteGuestAction(id: string) {
  await requireAdmin();
  await prisma.guest.delete({ where: { id } });
  revalidatePath("/admin/guests");
}
