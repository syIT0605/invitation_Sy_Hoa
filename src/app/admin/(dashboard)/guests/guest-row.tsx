"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Pencil, Trash2, X } from "lucide-react";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { CopyLinkButton } from "@/components/admin/copy-link-button";
import { deleteGuestAction, updateGuestAction, type GuestActionState } from "./actions";

type Guest = {
  id: string;
  name: string;
  phone: string | null;
  side: "GROOM" | "BRIDE" | "BOTH";
  group: string | null;
  maxCompanions: number;
  note: string | null;
  slug: string;
};

const sideLabel: Record<Guest["side"], string> = {
  GROOM: "Nhà trai",
  BRIDE: "Nhà gái",
  BOTH: "Chung",
};

const rsvpBadge: Record<"ATTENDING" | "DECLINED" | "PENDING", { label: string; className: string }> = {
  ATTENDING: { label: "Sẽ tham dự", className: "bg-green-50 text-green-700" },
  DECLINED: { label: "Vắng mặt", className: "bg-stone-100 text-stone-500" },
  PENDING: { label: "Chưa phản hồi", className: "bg-amber-50 text-amber-700" },
};

const initialState: GuestActionState = {};

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-rose-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-rose-700 disabled:opacity-60"
    >
      {pending ? "Đang lưu..." : "Lưu"}
    </button>
  );
}

export function GuestRow({
  guest,
  rsvpAnswer,
  companions,
}: {
  guest: Guest;
  rsvpAnswer: "ATTENDING" | "DECLINED" | "PENDING";
  companions: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction] = useActionState(updateGuestAction, initialState);
  const badge = rsvpBadge[rsvpAnswer];

  if (isEditing) {
    return (
      <form action={formAction} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-rose-200">
        <input type="hidden" name="id" value={guest.id} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <input
            name="name"
            defaultValue={guest.name}
            required
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm lg:col-span-2"
          />
          <input
            name="phone"
            defaultValue={guest.phone ?? ""}
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm"
          />
          <select
            name="side"
            defaultValue={guest.side}
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm"
          >
            <option value="BOTH">Chung</option>
            <option value="GROOM">Nhà trai</option>
            <option value="BRIDE">Nhà gái</option>
          </select>
          <input
            name="group"
            defaultValue={guest.group ?? ""}
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm"
          />
          <input
            name="maxCompanions"
            type="number"
            min={0}
            max={20}
            defaultValue={guest.maxCompanions}
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <SaveButton />
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="inline-flex items-center gap-1 rounded-full border border-stone-200 px-4 py-1.5 text-xs text-stone-600 hover:bg-stone-50"
          >
            <X size={14} /> Hủy
          </button>
          {state.error && <p className="text-xs text-red-600">{state.error}</p>}
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-rose-100 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-stone-800">{guest.name}</p>
          <span className={`rounded-full px-2 py-0.5 text-xs ${badge.className}`}>
            {badge.label}
            {rsvpAnswer === "ATTENDING" ? ` (${companions + 1} người)` : ""}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-stone-500">
          {sideLabel[guest.side]}
          {guest.group ? ` · ${guest.group}` : ""}
          {guest.phone ? ` · ${guest.phone}` : ""} · Tối đa {guest.maxCompanions} người đi kèm
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <CopyLinkButton path={`/?to=${guest.slug}`} />
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center gap-1 rounded-full border border-stone-200 px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-50"
        >
          <Pencil size={14} /> Sửa
        </button>
        <form action={deleteGuestAction.bind(null, guest.id)}>
          <ConfirmSubmitButton
            confirmMessage={`Xóa khách mời "${guest.name}"? Hành động này không thể hoàn tác.`}
            className="inline-flex items-center gap-1 rounded-full border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} /> Xóa
          </ConfirmSubmitButton>
        </form>
      </div>
    </div>
  );
}
