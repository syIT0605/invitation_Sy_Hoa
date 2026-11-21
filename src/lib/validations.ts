import { z } from "zod";

export const rsvpAnswerSchema = z.enum(["ATTENDING", "DECLINED"]);
export const guestSideSchema = z.enum(["GROOM", "BRIDE", "BOTH"]);

export const rsvpSubmitSchema = z.object({
  slug: z.string().trim().min(1).max(100).optional(),
  name: z.string().trim().min(2, "Vui lòng nhập họ tên").max(100),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[0-9+().\-\s]*$/, "Số điện thoại không hợp lệ")
    .optional()
    .or(z.literal("")),
  answer: rsvpAnswerSchema,
  companions: z.coerce.number().int().min(0).max(20).default(0),
  message: z.string().trim().max(500).optional().or(z.literal("")),
  side: guestSideSchema.optional(),
});

export type RsvpSubmitInput = z.infer<typeof rsvpSubmitSchema>;

export const guestCreateSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  side: guestSideSchema.default("BOTH"),
  group: z.string().trim().max(100).optional().or(z.literal("")),
  maxCompanions: z.coerce.number().int().min(0).max(20).default(1),
  note: z.string().trim().max(300).optional().or(z.literal("")),
});

export type GuestCreateInput = z.infer<typeof guestCreateSchema>;

export const guestUpdateSchema = guestCreateSchema.partial();

export const galleryCaptionSchema = z.object({
  caption: z.string().trim().max(200).optional().or(z.literal("")),
});

export const adminLoginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});
