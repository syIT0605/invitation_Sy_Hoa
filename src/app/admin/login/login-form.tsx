"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginActionState } from "./actions";

const initialState: LoginActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-rose-600 py-2.5 font-medium text-white transition hover:bg-rose-700 disabled:opacity-60"
    >
      {pending ? "Đang đăng nhập..." : "Đăng nhập"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-medium text-stone-700">
          Tên đăng nhập
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-stone-700">
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
        />
      </div>
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
      )}
      <SubmitButton />
    </form>
  );
}
