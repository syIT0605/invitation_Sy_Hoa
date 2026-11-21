import { prisma } from "@/lib/db";
import { GuestCreateForm } from "./guest-create-form";
import { GuestRow } from "./guest-row";

export const metadata = { title: "Khách mời | Quản trị" };

export default async function AdminGuestsPage() {
  const guests = await prisma.guest.findMany({
    include: { rsvp: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl text-rose-800">Danh sách khách mời</h1>

      <div className="mb-8">
        <GuestCreateForm />
      </div>

      <div className="space-y-3">
        {guests.length === 0 && (
          <p className="text-sm text-stone-400">Chưa có khách mời nào. Hãy thêm khách mời đầu tiên ở trên.</p>
        )}
        {guests.map((guest) => (
          <GuestRow
            key={guest.id}
            guest={guest}
            rsvpAnswer={guest.rsvp?.answer ?? "PENDING"}
            companions={guest.rsvp?.companions ?? 0}
          />
        ))}
      </div>
    </div>
  );
}
