import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { weddingConfig } from "@/lib/config";
import { FloralSpray } from "./floral-spray";

export function WeddingAnnouncement() {
  const ceremony = weddingConfig.events[0];
  if (!ceremony) return null;

  const date = new Date(ceremony.date);
  const { groom, bride } = weddingConfig;

  return (
    <section className="architecture-watermark relative px-4 py-16">
      <div className="relative mx-auto max-w-xl">
        <FloralSpray className="pointer-events-none absolute -right-10 top-1/4 h-56 w-36 sm:-right-16" />

        <div className="relative overflow-hidden rounded-2xl bg-rose-700 px-6 py-10 text-center text-[var(--color-cream)] shadow-xl sm:px-10">
          <h2 className="font-heading text-lg uppercase tracking-[0.15em]">Thông Tin Lễ Cưới</h2>

          <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-4 border-b border-white/15 pb-6 text-xs">
            <div>
              <p className="uppercase tracking-wide text-white/60">Ông Bà</p>
              {groom.father && <p className="mt-1 font-semibold">{groom.father}</p>}
              <p className="font-semibold">{groom.mother}</p>
              {groom.parentsAddress && <p className="mt-1 text-white/60">{groom.parentsAddress}</p>}
            </div>
            <div className="border-l border-white/15 pl-4">
              <p className="uppercase tracking-wide text-white/60">Ông Bà</p>
              {bride.father && <p className="mt-1 font-semibold">{bride.father}</p>}
              <p className="font-semibold">{bride.mother}</p>
              {bride.parentsAddress && <p className="mt-1 text-white/60">{bride.parentsAddress}</p>}
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-xs text-xs uppercase leading-relaxed tracking-wide text-white/70">
            Trân trọng báo tin
            <br />
            lễ thành hôn của con chúng tôi
          </p>

          <p className="mt-6 font-heading text-3xl">{groom.fullName}</p>
          {groom.birthOrderLabel && (
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
              {groom.birthOrderLabel}
            </p>
          )}

          <p className="my-3 font-script text-2xl text-white/80">&amp;</p>

          <p className="font-heading text-3xl">{bride.fullName}</p>
          {bride.birthOrderLabel && (
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
              {bride.birthOrderLabel}
            </p>
          )}

          <p className="mx-auto mt-7 max-w-xs text-xs uppercase leading-relaxed tracking-wide text-white/70">
            Lễ thành hôn được cử hành tại
            <br />
            {ceremony.venueName}
          </p>

          <div className="mt-5 flex items-center justify-center gap-3 text-xs uppercase tracking-wide text-white/70">
            <span>{format(date, "HH:mm")}</span>
            <span>{format(date, "EEEE", { locale: vi })}</span>
          </div>

          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="font-heading text-4xl">{format(date, "dd")}</span>
            <span className="h-10 w-px bg-white/20" />
            <span className="text-left text-xs uppercase tracking-wide text-white/80">
              Tháng {format(date, "MM")}
              <br />
              {format(date, "yyyy")}
            </span>
          </div>

          {ceremony.lunarDate && (
            <p className="mt-4 text-[11px] uppercase tracking-wide text-white/50">
              (Tức {ceremony.lunarDate})
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
