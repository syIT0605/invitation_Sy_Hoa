import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { GalleryGrid } from "@/components/site/gallery-grid";

export const metadata = {
  title: "Thư viện ảnh | Thiệp Cưới Online",
};

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="min-h-screen bg-[var(--color-cream)] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-rose-600 hover:underline"
        >
          <ArrowLeft size={16} /> Về trang chủ
        </Link>

        <div className="mb-8 text-center">
          <p className="font-script text-2xl text-rose-500">Lưu giữ</p>
          <h1 className="mt-2 font-heading text-3xl text-rose-800 sm:text-4xl">Thư viện ảnh</h1>
        </div>

        <GalleryGrid images={images.map((i) => ({ id: i.id, url: i.url, caption: i.caption }))} />
      </div>
    </div>
  );
}
