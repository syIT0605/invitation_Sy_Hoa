"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryImageItem = {
  id: string;
  url: string;
  caption: string | null;
};

export function GalleryGrid({ images }: { images: GalleryImageItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <p className="text-center text-sm text-stone-400">
        Album ảnh cưới sẽ được cập nhật sớm.
      </p>
    );
  }

  const close = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const showNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-rose-100"
          >
            <Image
              src={image.url}
              alt={image.caption ?? "Ảnh cưới"}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative max-h-[85vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={images[activeIndex].url}
                alt={images[activeIndex].caption ?? "Ảnh cưới"}
                fill
                sizes="90vw"
                className="rounded-lg object-contain"
              />
            </div>
            {images[activeIndex].caption && (
              <p className="mt-3 text-center text-sm text-white/80">
                {images[activeIndex].caption}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
            aria-label="Ảnh sau"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}
