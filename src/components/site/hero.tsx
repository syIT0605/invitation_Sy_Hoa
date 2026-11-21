import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { weddingConfig } from "@/lib/config";
import { FloatingPetals } from "./floating-petals";
import { FloralSpray } from "./floral-spray";
import { Countdown } from "./countdown";

export function Hero({ guestName, heroImage }: { guestName?: string; heroImage?: string }) {
  const date = new Date(weddingConfig.weddingDate);

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 via-[var(--color-cream)] to-[var(--color-cream)] px-4 text-center">
      <FloatingPetals />
      <FloralSpray className="pointer-events-none absolute -left-10 top-10 hidden h-56 w-36 opacity-80 sm:block" />
      <FloralSpray
        className="pointer-events-none absolute -right-10 top-10 hidden h-56 w-36 opacity-80 sm:block"
        mirrored
      />

      <div className="relative z-10 animate-fade-in-up">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-rose-500">Save The Date</p>

        {heroImage && (
          <div className="relative mx-auto mb-6 w-64 rotate-[-2deg] rounded-sm bg-white p-2 pb-5 shadow-xl sm:w-80">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={heroImage}
                alt="Ảnh cưới"
                fill
                sizes="(max-width: 640px) 256px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <h1 className="font-heading text-4xl font-semibold leading-tight text-rose-800 sm:text-6xl">
          {weddingConfig.groom.shortName}
          <span className="mx-3 font-script text-rose-400">&</span>
          {weddingConfig.bride.shortName}
        </h1>

        <p className="mx-auto mt-5 max-w-md font-body text-base text-stone-600 sm:text-lg">
          {weddingConfig.heroQuote}
        </p>

        <p className="mt-6 font-heading text-lg text-gold-500 sm:text-xl">
          {format(date, "EEEE, 'ngày' dd MMMM yyyy", { locale: vi })}
        </p>

        <div className="mt-8">
          <Countdown targetDate={weddingConfig.weddingDate} />
        </div>

        {guestName && (
          <p className="mt-8 text-sm text-stone-500">
            Thân mời <span className="font-semibold text-rose-700">{guestName}</span> đến chung
            vui cùng chúng mình
          </p>
        )}

        <a
          href="#rsvp"
          className="mt-10 inline-block rounded-full bg-rose-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700"
        >
          Xác nhận tham dự
        </a>
      </div>
    </section>
  );
}
