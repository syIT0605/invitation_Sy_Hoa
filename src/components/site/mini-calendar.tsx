import { getDay, getDaysInMonth, startOfMonth } from "date-fns";

const WEEKDAY_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export function MiniCalendar({ date }: { date: Date }) {
  const daysInMonth = getDaysInMonth(date);
  // getDay(): 0 = Chủ nhật...6 = Thứ bảy. Đổi về cột bắt đầu Thứ hai (0) → Chủ nhật (6).
  const firstWeekday = (getDay(startOfMonth(date)) + 6) % 7;
  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="rounded-xl bg-[var(--color-cream)] p-5 text-left shadow-inner">
      <p className="text-center font-script text-lg text-rose-600">
        Tháng {date.getMonth() + 1} / {date.getFullYear()}
      </p>
      <div className="mt-4 grid grid-cols-7 gap-y-2 text-center text-[11px]">
        {WEEKDAY_LABELS.map((w) => (
          <span key={w} className="font-medium text-rose-400">
            {w}
          </span>
        ))}
        {cells.map((day, i) => (
          <span key={i} className="flex h-6 items-center justify-center">
            {day === date.getDate() ? (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-700 font-semibold text-white">
                {day}
              </span>
            ) : (
              <span className="text-stone-600">{day ?? ""}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
