"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import type { GalleryImageItem } from "./gallery-grid";

const VISIBLE_RANGE = 2;
const AUTOPLAY_MS = 3000;

export function PhotoCoverflow({ images }: { images: GalleryImageItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (count === 0) {
    return (
      <p className="text-center text-sm text-stone-400">
        Album ảnh cưới sẽ được cập nhật sớm.
      </p>
    );
  }

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative mx-auto h-[360px] max-w-2xl sm:h-[400px]" style={{ perspective: "1200px" }}>
        {images.map((img, i) => {
          let offset = i - index;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;
          if (Math.abs(offset) > VISIBLE_RANGE) return null;

          const isActive = offset === 0;
          const translateX = offset * 120;
          const scale = isActive ? 1 : 0.76 - Math.abs(offset) * 0.08;
          const rotateY = offset * -26;
          const opacity = isActive ? 1 : 0.5 - Math.abs(offset) * 0.08;

          return (
            <button
              key={img.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Xem ảnh ${i + 1}`}
              className="absolute left-1/2 top-1/2 aspect-[3/4] w-52 overflow-hidden rounded-xl shadow-xl ring-4 ring-white transition-all duration-500 ease-out sm:w-60"
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                opacity,
                zIndex: 10 - Math.abs(offset),
              }}
            >
              <Image
                src={img.url}
                alt={img.caption ?? "Ảnh cưới"}
                fill
                sizes="240px"
                className="object-cover"
                priority={isActive}
              />
            </button>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Ảnh trước"
              className="rounded-full border border-rose-300 p-2 text-rose-600 transition hover:bg-rose-50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Ảnh sau"
              className="rounded-full border border-rose-300 p-2 text-rose-600 transition hover:bg-rose-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Chuyển đến ảnh ${i + 1}`}
                className={clsx(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-5 bg-rose-600" : "w-1.5 bg-rose-200"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
