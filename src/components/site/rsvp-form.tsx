"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitRsvpAction, type RsvpActionState } from "@/app/rsvp/actions";

const initialState: RsvpActionState = {};

const inputClass =
  "w-full rounded-lg border border-rose-300 bg-[var(--color-cream)] px-3 py-2 text-sm text-stone-700 outline-none placeholder:text-stone-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-rose-700 py-3 text-sm font-medium uppercase tracking-wide text-[var(--color-cream)] shadow-md transition hover:bg-rose-800 disabled:opacity-60"
    >
      {pending ? "Đang gửi..." : "Gửi lời chúc"}
    </button>
  );
}

export function RsvpForm({
  guestSlug,
  guestName,
  maxCompanions = 10,
}: {
  guestSlug?: string;
  guestName?: string;
  maxCompanions?: number;
}) {
  const [state, formAction] = useActionState(submitRsvpAction, initialState);
  const [answer, setAnswer] = useState<"ATTENDING" | "DECLINED">("ATTENDING");

  if (state.success) {
    return (
      <div className="rounded-2xl bg-[var(--color-cream)] p-8 text-center shadow-md ring-1 ring-rose-100">
        <p className="font-script text-3xl text-rose-600">Cảm ơn bạn!</p>
        <p className="mt-2 text-sm text-stone-600">
          Chúng mình đã nhận được phản hồi của bạn. Hẹn gặp bạn trong ngày vui!
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl bg-[var(--color-cream)] p-6 shadow-md ring-1 ring-rose-100 sm:p-8"
    >
      {guestSlug && <input type="hidden" name="slug" value={guestSlug} />}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-stone-700">
          Họ và tên
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={guestName}
          placeholder="Nhập tên*"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-stone-700">
          Số điện thoại <span className="text-stone-400">(không bắt buộc)</span>
        </label>
        <input id="phone" name="phone" type="tel" placeholder="09xx xxx xxx" className={inputClass} />
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-stone-700">Bạn có thể tham dự không?</span>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm transition ${
              answer === "ATTENDING"
                ? "border-rose-600 bg-rose-50 text-rose-700"
                : "border-rose-200 text-stone-600"
            }`}
          >
            <input
              type="radio"
              name="answer"
              value="ATTENDING"
              checked={answer === "ATTENDING"}
              onChange={() => setAnswer("ATTENDING")}
              className="sr-only"
            />
            Tham dự
          </label>
          <label
            className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm transition ${
              answer === "DECLINED"
                ? "border-rose-600 bg-rose-50 text-rose-700"
                : "border-rose-200 text-stone-600"
            }`}
          >
            <input
              type="radio"
              name="answer"
              value="DECLINED"
              checked={answer === "DECLINED"}
              onChange={() => setAnswer("DECLINED")}
              className="sr-only"
            />
            Xin phép vắng
          </label>
        </div>
      </div>

      {answer === "ATTENDING" && (
        <div>
          <label htmlFor="companions" className="mb-1 block text-sm font-medium text-stone-700">
            Số người đi cùng
          </label>
          <input
            id="companions"
            name="companions"
            type="number"
            min={0}
            max={maxCompanions}
            defaultValue={0}
            className={inputClass}
          />
        </div>
      )}

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-stone-700">
          Lời chúc <span className="text-stone-400">(không bắt buộc)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Nhập lời chúc*"
          className={inputClass}
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
