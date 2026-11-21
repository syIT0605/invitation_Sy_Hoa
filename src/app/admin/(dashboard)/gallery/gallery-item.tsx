"use client";

import Image from "next/image";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import {
  deleteGalleryImageAction,
  moveGalleryImageAction,
  updateGalleryCaptionAction,
} from "./actions";

export function GalleryItem({
  image,
  isFirst,
  isLast,
}: {
  image: { id: string; url: string; caption: string | null };
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-rose-100">
      <div className="relative aspect-square">
        <Image src={image.url} alt={image.caption ?? "Ảnh cưới"} fill className="object-cover" />
      </div>
      <div className="p-3">
        <form action={updateGalleryCaptionAction.bind(null, image.id)} className="flex gap-2">
          <input
            name="caption"
            defaultValue={image.caption ?? ""}
            placeholder="Chú thích..."
            className="flex-1 rounded-lg border border-stone-300 px-2 py-1 text-xs"
          />
          <button
            type="submit"
            className="rounded-lg bg-stone-100 px-2 py-1 text-xs text-stone-600 hover:bg-stone-200"
          >
            Lưu
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-1">
            <form action={moveGalleryImageAction.bind(null, image.id, "up")}>
              <button
                type="submit"
                disabled={isFirst}
                className="rounded-lg border border-stone-200 p-1 text-stone-500 disabled:opacity-30"
                aria-label="Di chuyển lên"
              >
                <ArrowUp size={14} />
              </button>
            </form>
            <form action={moveGalleryImageAction.bind(null, image.id, "down")}>
              <button
                type="submit"
                disabled={isLast}
                className="rounded-lg border border-stone-200 p-1 text-stone-500 disabled:opacity-30"
                aria-label="Di chuyển xuống"
              >
                <ArrowDown size={14} />
              </button>
            </form>
          </div>

          <form action={deleteGalleryImageAction.bind(null, image.id)}>
            <ConfirmSubmitButton
              confirmMessage="Xóa ảnh này khỏi thư viện?"
              className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
            >
              <Trash2 size={14} /> Xóa
            </ConfirmSubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}
