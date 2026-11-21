import { format } from "date-fns";
import { vi } from "date-fns/locale";

export type WishItem = {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
};

export function WishesWall({ wishes }: { wishes: WishItem[] }) {
  if (wishes.length === 0) return null;

  return (
    <div className="mx-auto mt-10 max-w-md space-y-3">
      {wishes.map((wish) => (
        <div key={wish.id} className="rounded-xl bg-[var(--color-cream)] p-4 shadow-sm ring-1 ring-rose-100">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-rose-700">{wish.name}</span>
            <span className="shrink-0 text-xs text-stone-400">
              {format(wish.createdAt, "HH:mm:ss dd/MM/yyyy", { locale: vi })}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{wish.message}</p>
        </div>
      ))}
    </div>
  );
}
