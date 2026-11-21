"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createGuestAction, type GuestActionState } from "./actions";

const initialState: GuestActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-rose-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-rose-700 disabled:opacity-60"
    >
      {pending ? "Đang thêm..." : "Thêm khách mời"}
    </button>
  );
}

export function GuestCreateForm() {
  const [state, formAction] = useActionState(createGuestAction, initialState);

  return (
    <form
      action={formAction}
      className="grid gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-rose-100 sm:grid-cols-2 lg:grid-cols-6"
    >
      <input
        name="name"
        placeholder="Họ tên khách mời"
        required
        className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 lg:col-span-2"
      />
      <input
        name="phone"
        placeholder="Số điện thoại"
        className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
      />
      <select
        name="side"
        defaultValue="BOTH"
        className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
      >
        <option value="BOTH">Chung</option>
        <option value="GROOM">Nhà trai</option>
        <option value="BRIDE">Nhà gái</option>
      </select>
      <input
        name="group"
        placeholder="Nhóm (bạn bè, đồng nghiệp...)"
        className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
      />
      <input
        name="maxCompanions"
        type="number"
        min={0}
        max={20}
        defaultValue={1}
        title="Số người đi kèm tối đa"
        className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
      />

      <div className="flex items-center gap-3 lg:col-span-6">
        <SubmitButton />
        {state.error && <p className="text-sm text-red-600">{state.error}</p>}
        {state.success && <p className="text-sm text-green-600">Đã thêm khách mời.</p>}
      </div>
    </form>
  );
}
