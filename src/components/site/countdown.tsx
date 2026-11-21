"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  const units = [
    { label: "Ngày", value: timeLeft.days },
    { label: "Giờ", value: timeLeft.hours },
    { label: "Phút", value: timeLeft.minutes },
    { label: "Giây", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5" suppressHydrationWarning>
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-white/80 shadow-sm ring-1 ring-rose-100 sm:h-20 sm:w-20"
        >
          <span className="font-heading text-xl font-semibold text-rose-700 sm:text-2xl">
            {unit.value}
          </span>
          <span className="text-[11px] uppercase tracking-wide text-stone-500">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
