import { type GalleryImageItem } from "./gallery-grid";
import { PhotoCoverflow } from "./photo-coverflow";

export function GalleryPreview({ images }: { images: GalleryImageItem[] }) {
  return (
    <section className="bg-rose-50/60 px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-script text-2xl text-rose-500">Lưu giữ</p>
        <h2 className="mt-2 font-heading text-3xl text-rose-800 sm:text-4xl">Album Ảnh</h2>
        <div className="mx-auto my-6 h-px w-24 section-divider" />
      </div>

      <PhotoCoverflow images={images} />
    </section>
  );
}
