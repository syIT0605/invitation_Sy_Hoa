"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitRsvpAction, type RsvpActionState } from "@/app/rsvp/actions";

const initialState: RsvpActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-rose-600 py-3 text-sm font-medium text-white shadow-md shadow-rose-200 transition hover:bg-rose-700 disabled:opacity-60"
    >
      {pending ? "Đang gửi..." : "Gửi phản hồi"}
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
      <div className="rounded-2xl bg-white/80 p-8 text-center shadow-sm ring-1 ring-rose-100">
        <p className="font-script text-3xl text-rose-600">Cảm ơn bạn!</p>
        <p className="mt-2 text-sm text-stone-600">
          Chúng mình đã nhận được phản hồi của bạn. Hẹn gặp bạn trong ngày vui!
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-rose-100 sm:p-8">
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
          placeholder="Nhập họ tên của bạn"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-stone-700">
          Số điện thoại <span className="text-stone-400">(không bắt buộc)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="09xx xxx xxx"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
        />
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-stone-700">Bạn có thể tham dự không?</span>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm transition ${
              answer === "ATTENDING"
                ? "border-rose-500 bg-rose-50 text-rose-700"
                : "border-stone-300 text-stone-600"
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
                ? "border-rose-500 bg-rose-50 text-rose-700"
                : "border-stone-300 text-stone-600"
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
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
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
          placeholder="Gửi lời chúc đến cô dâu chú rể..."
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
