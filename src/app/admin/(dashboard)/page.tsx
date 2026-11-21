import { prisma } from "@/lib/db";

export const metadata = { title: "Tổng quan | Quản trị" };

export default async function AdminDashboardPage() {
  const [guestCount, attending, declined, pending, imageCount, trackCount] = await Promise.all([
    prisma.guest.count(),
    prisma.rsvp.findMany({ where: { answer: "ATTENDING" } }),
    prisma.rsvp.count({ where: { answer: "DECLINED" } }),
    prisma.guest.count({ where: { rsvp: null } }),
    prisma.galleryImage.count(),
    prisma.musicTrack.count(),
  ]);

  const totalAttendingPeople = attending.reduce((sum, r) => sum + 1 + r.companions, 0);

  const stats = [
    { label: "Khách mời (có link riêng)", value: guestCount },
    { label: "Xác nhận tham dự", value: attending.length },
    { label: "Tổng số người sẽ đến", value: totalAttendingPeople },
    { label: "Từ chối tham dự", value: declined },
    { label: "Khách chưa phản hồi", value: pending },
    { label: "Ảnh trong thư viện", value: imageCount },
    { label: "Bản nhạc đã tải lên", value: trackCount },
  ];

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl text-rose-800">Tổng quan</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-rose-100">
            <p className="text-sm text-stone-500">{stat.label}</p>
            <p className="mt-2 font-heading text-3xl text-rose-700">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
