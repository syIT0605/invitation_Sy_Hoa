import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { MapPin, Clock } from "lucide-react";
import { weddingConfig } from "@/lib/config";

export function EventDetails() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-script text-2xl text-rose-500">Thông tin</p>
        <h2 className="mt-2 font-heading text-3xl text-rose-800 sm:text-4xl">Lễ cưới</h2>
        <div className="mx-auto my-6 h-px w-24 section-divider" />
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {weddingConfig.events.map((event) => {
          const date = new Date(event.date);
          return (
            <div
              key={event.id}
              className="flex flex-col rounded-2xl bg-white/80 p-6 text-center shadow-sm ring-1 ring-rose-100"
            >
              <h3 className="font-heading text-xl text-rose-700">{event.title}</h3>
              <p className="mt-1 text-sm text-stone-500">{event.description}</p>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-stone-600">
                <Clock size={16} className="text-rose-400" />
                <span>
                  {format(date, "HH:mm, EEEE dd/MM/yyyy", { locale: vi })}
                </span>
              </div>

              <div className="mt-2 flex items-start justify-center gap-2 text-sm text-stone-600">
                <MapPin size={16} className="mt-0.5 shrink-0 text-rose-400" />
                <span>
                  <strong className="font-medium text-stone-700">{event.venueName}</strong>
                  <br />
                  {event.address}
                </span>
              </div>

              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block self-center rounded-full border border-rose-300 px-5 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
              >
                Xem bản đồ
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
