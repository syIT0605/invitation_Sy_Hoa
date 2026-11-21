"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { rsvpSubmitSchema } from "@/lib/validations";

export type RsvpActionState = {
  error?: string;
  success?: boolean;
};

export async function submitRsvpAction(
  _prevState: RsvpActionState,
  formData: FormData
): Promise<RsvpActionState> {
  const parsed = rsvpSubmitSchema.safeParse({
    slug: formData.get("slug") || undefined,
    name: formData.get("name"),
    phone: formData.get("phone") ?? "",
    answer: formData.get("answer"),
    companions: formData.get("companions") || 0,
    message: formData.get("message") ?? "",
    side: formData.get("side") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Thông tin không hợp lệ." };
  }

  const { slug, ...data } = parsed.data;
  let guestId: string | undefined;
  let maxCompanions = 10;

  if (slug) {
    const guest = await prisma.guest.findUnique({ where: { slug } });
    if (guest) {
      guestId = guest.id;
      maxCompanions = guest.maxCompanions;
    }
  }

  if (data.companions > maxCompanions) {
    return {
      error: `Số người đi kèm vượt quá số lượng cho phép (tối đa ${maxCompanions}).`,
    };
  }

  const rsvpData = {
    name: data.name,
    phone: data.phone || null,
    answer: data.answer,
    companions: data.companions,
    message: data.message || null,
    side: data.side ?? "BOTH",
  } as const;

  if (guestId) {
    // Mỗi khách mời có link riêng chỉ nên có một phản hồi — gửi lại sẽ cập nhật phản hồi cũ.
    await prisma.rsvp.upsert({
      where: { guestId },
      create: { guestId, ...rsvpData },
      update: rsvpData,
    });
  } else {
    // Form mở (không có mã khách mời) — luôn tạo phản hồi mới.
    await prisma.rsvp.create({ data: rsvpData });
  }

  revalidatePath("/");
  revalidatePath("/admin/rsvps");
  revalidatePath("/admin");
  return { success: true };
}
