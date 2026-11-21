import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { weddingConfig, type WeddingEvent } from "@/lib/config";
import { buildGoogleCalendarUrl } from "@/lib/calendar-link";
import { FloralSpray } from "./floral-spray";
import { MiniCalendar } from "./mini-calendar";

export function ReceptionCard({ event }: { event: WeddingEvent }) {
  const date = new Date(event.date);
  const calendarUrl = buildGoogleCalendarUrl({
    title: `${event.title} - ${weddingConfig.groom.shortName} & ${weddingConfig.bride.shortName}`,
    location: event.address,
    start: date,
  });
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${event.venueName}, ${event.address}`
  )}&output=embed`;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-xl">
        <div className="relative overflow-hidden rounded-2xl bg-rose-700 px-6 py-10 text-center text-[var(--color-cream)] shadow-xl sm:px-10">
          <FloralSpray className="pointer-events-none absolute -left-12 top-8 h-48 w-32 opacity-90" />

          <h2 className="font-heading text-lg uppercase tracking-[0.15em]">Thông Tin Tiệc Cưới</h2>
          <p className="mt-4 text-xs uppercase tracking-wide text-white/70">
            {event.title} sẽ diễn ra vào lúc:
          </p>

          <div className="mt-3 flex items-center justify-center gap-3 text-xs uppercase tracking-wide text-white/70">
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

          {event.lunarDate && (
            <p className="mt-3 text-[11px] uppercase tracking-wide text-white/50">
              (Tức {event.lunarDate})
            </p>
          )}

          {(event.guestArrivalTime || event.banquetTime) && (
            <div className="mx-auto mt-6 grid max-w-xs grid-cols-2 gap-4 text-xs uppercase tracking-wide text-white/70">
              {event.guestArrivalTime && (
                <div>
                  <p>Đón khách</p>
                  <p className="mt-1 text-sm font-semibold text-white">{event.guestArrivalTime}</p>
                </div>
              )}
              {event.banquetTime && (
                <div>
                  <p>Khai tiệc</p>
                  <p className="mt-1 text-sm font-semibold text-white">{event.banquetTime}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <MiniCalendar date={date} />
          </div>

          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-xs text-white/80 underline underline-offset-4 transition hover:text-white"
          >
            Thêm vào lịch
          </a>

          <div className="mt-6">
            <a
              href="#rsvp"
              className="inline-block rounded-full bg-[var(--color-cream)] px-8 py-2.5 text-sm font-medium text-rose-700 shadow-md transition hover:bg-rose-50"
            >
              Xác nhận tham dự
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="font-heading text-base uppercase tracking-wide text-rose-700">
            {event.title} sẽ tổ chức tại
          </h3>
          <p className="mt-2 text-sm text-stone-600">
            {event.venueName}
            <br />
            {event.address}
          </p>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl shadow-md ring-1 ring-rose-100">
          <iframe
            src={mapEmbedSrc}
            width="100%"
            height="280"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Bản đồ ${event.venueName}`}
          />
        </div>
      </div>
    </section>
  );
}
