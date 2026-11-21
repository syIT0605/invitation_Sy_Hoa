import { prisma } from "@/lib/db";
import { GalleryUploadForm } from "./gallery-upload-form";
import { GalleryItem } from "./gallery-item";

export const metadata = { title: "Thư viện ảnh | Quản trị" };

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl text-rose-800">Thư viện ảnh</h1>

      <div className="mb-8">
        <GalleryUploadForm />
      </div>

      {images.length === 0 ? (
        <p className="text-sm text-stone-400">Chưa có ảnh nào trong thư viện.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              isFirst={index === 0}
              isLast={index === images.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
