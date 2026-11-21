"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { logoutAction } from "@/app/admin/login/actions";

const navItems = [
  { href: "/admin", label: "Tổng quan" },
  { href: "/admin/guests", label: "Khách mời" },
  { href: "/admin/rsvps", label: "Phản hồi RSVP" },
  { href: "/admin/gallery", label: "Thư viện ảnh" },
  { href: "/admin/music", label: "Nhạc nền" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-rose-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/admin" className="font-serif text-lg text-rose-700">
          Quản trị thiệp cưới
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-full px-3 py-1.5 transition",
                  active
                    ? "bg-rose-600 text-white"
                    : "text-stone-600 hover:bg-rose-50 hover:text-rose-700"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border border-stone-200 px-3 py-1.5 text-sm text-stone-600 transition hover:border-rose-300 hover:text-rose-700"
          >
            Đăng xuất
          </button>
        </form>
      </div>
    </header>
  );
}
