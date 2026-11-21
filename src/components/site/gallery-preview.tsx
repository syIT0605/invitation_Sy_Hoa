import Link from "next/link";
import { GalleryGrid, type GalleryImageItem } from "./gallery-grid";

export function GalleryPreview({ images }: { images: GalleryImageItem[] }) {
  return (
    <section className="bg-rose-50/60 px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-script text-2xl text-rose-500">Lưu giữ</p>
        <h2 className="mt-2 font-heading text-3xl text-rose-800 sm:text-4xl">Thư viện ảnh</h2>
        <div className="mx-auto my-6 h-px w-24 section-divider" />
      </div>

      <div className="mx-auto max-w-4xl">
        <GalleryGrid images={images.slice(0, 8)} />

        {images.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/gallery"
              className="inline-block rounded-full border border-rose-300 px-6 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
            >
              Xem tất cả ảnh
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
