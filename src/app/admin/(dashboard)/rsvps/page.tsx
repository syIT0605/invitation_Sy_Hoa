import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { prisma } from "@/lib/db";

export const metadata = { title: "Phản hồi RSVP | Quản trị" };

const answerBadge: Record<string, { label: string; className: string }> = {
  ATTENDING: { label: "Sẽ tham dự", className: "bg-green-50 text-green-700" },
  DECLINED: { label: "Vắng mặt", className: "bg-stone-100 text-stone-500" },
  PENDING: { label: "Chưa rõ", className: "bg-amber-50 text-amber-700" },
};

export default async function AdminRsvpsPage() {
  const rsvps = await prisma.rsvp.findMany({
    include: { guest: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl text-rose-800">Phản hồi RSVP</h1>

      {rsvps.length === 0 ? (
        <p className="text-sm text-stone-400">Chưa có phản hồi nào.</p>
      ) : (
        <div className="space-y-3">
          {rsvps.map((rsvp) => {
            const badge = answerBadge[rsvp.answer];
            return (
              <div key={rsvp.id} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-rose-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-stone-800">{rsvp.name}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${badge.className}`}>
                      {badge.label}
                    </span>
                    {rsvp.guest && (
                      <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs text-rose-600">
                        Có link riêng
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-stone-400">
                    {format(rsvp.createdAt, "HH:mm dd/MM/yyyy", { locale: vi })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-stone-500">
                  {rsvp.phone ? `${rsvp.phone} · ` : ""}
                  {rsvp.answer === "ATTENDING" ? `Đi cùng ${rsvp.companions} người` : ""}
                </p>
                {rsvp.message && (
                  <p className="mt-2 rounded-lg bg-rose-50/60 p-2 text-sm italic text-stone-600">
                    &ldquo;{rsvp.message}&rdquo;
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
