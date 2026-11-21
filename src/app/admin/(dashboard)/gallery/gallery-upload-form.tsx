"use client";

import { useActionState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { uploadGalleryImageAction, type GalleryActionState } from "./actions";

const initialState: GalleryActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-rose-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-rose-700 disabled:opacity-60"
    >
      {pending ? "Đang tải lên..." : "Tải ảnh lên"}
    </button>
  );
}

export function GalleryUploadForm() {
  const [state, formAction] = useActionState(uploadGalleryImageAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="flex flex-wrap items-end gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-rose-100"
    >
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-stone-600">Chọn ảnh</label>
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          className="w-full text-sm"
        />
      </div>
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-stone-600">Chú thích (tuỳ chọn)</label>
        <input
          type="text"
          name="caption"
          placeholder="Ví dụ: Ảnh cưới sân vườn"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
        />
      </div>
      <SubmitButton />
      {state.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
