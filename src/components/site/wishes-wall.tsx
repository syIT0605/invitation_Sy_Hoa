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
    <section className="px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-script text-2xl text-rose-500">Gửi yêu thương</p>
        <h2 className="mt-2 font-heading text-3xl text-rose-800 sm:text-4xl">Lời chúc từ bạn bè</h2>
        <div className="mx-auto my-6 h-px w-24 section-divider" />
      </div>

      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {wishes.map((wish) => (
          <div key={wish.id} className="rounded-xl bg-white/80 p-5 shadow-sm ring-1 ring-rose-100">
            <p className="text-sm italic leading-relaxed text-stone-600">&ldquo;{wish.message}&rdquo;</p>
            <div className="mt-3 flex items-center justify-between text-xs text-stone-400">
              <span className="font-medium text-rose-600">{wish.name}</span>
              <span>{format(wish.createdAt, "dd/MM/yyyy", { locale: vi })}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
