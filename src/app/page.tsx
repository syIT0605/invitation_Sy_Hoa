import { prisma } from "@/lib/db";
import { weddingConfig } from "@/lib/config";
import { Hero } from "@/components/site/hero";
import { StoryTimeline } from "@/components/site/story-timeline";
import { WeddingAnnouncement } from "@/components/site/wedding-announcement";
import { ReceptionCard } from "@/components/site/reception-card";
import { GalleryPreview } from "@/components/site/gallery-preview";
import { RsvpForm } from "@/components/site/rsvp-form";
import { WishesWall } from "@/components/site/wishes-wall";
import { GiftBox } from "@/components/site/gift-box";
import { Footer } from "@/components/site/footer";
import { InvitationShell } from "@/components/site/invitation-shell";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ to?: string }>;
}) {
  const { to } = await searchParams;

  const [guest, images, activeTrack, wishes] = await Promise.all([
    to ? prisma.guest.findUnique({ where: { slug: to } }) : Promise.resolve(null),
    prisma.galleryImage.findMany({ orderBy: { order: "asc" } }),
    prisma.musicTrack.findFirst({ where: { isActive: true } }),
    prisma.rsvp.findMany({
      where: { message: { not: null } },
      orderBy: { createdAt: "desc" },
      take: 12,
    }),
  ]);

  // Lọc sự kiện theo "bên" của khách (Nhà trai / Nhà gái / Chung) — khách không
  // có link riêng hoặc thuộc "Chung" sẽ thấy tất cả (cả 2 ngày).
  const guestSide = guest?.side ?? "BOTH";
  const visibleEvents = weddingConfig.events.filter(
    (e) => !e.side || e.side === "BOTH" || guestSide === "BOTH" || e.side === guestSide
  );

  // Mỗi "bên" (nhà gái / nhà trai) có 1 sự kiện lễ (card trang trọng) + các sự
  // kiện tiệc (card lịch/bản đồ/RSVP) đi kèm. Khi khách thấy cả 2 bên, mỗi bên
  // vẫn giữ đúng cặp lễ + tiệc riêng, chỉ dồn tất cả card tiệc xuống sau album ảnh.
  const eventGroups = new Map<string, typeof visibleEvents>();
  for (const event of visibleEvents) {
    const key = event.side ?? "BOTH";
    eventGroups.set(key, [...(eventGroups.get(key) ?? []), event]);
  }
  const ceremonyEvents = Array.from(eventGroups.values(), (group) => group[0]);
  const receptionEvents = Array.from(eventGroups.values(), (group) => group.slice(1)).flat();

  return (
    <InvitationShell
      track={activeTrack ? { url: activeTrack.url, title: activeTrack.title } : null}
      coverImage={images[0]?.url}
    >
      <div className="flex-1">
        <Hero guestName={guest?.name} heroImage={images[0]?.url} />
        <StoryTimeline />
        {ceremonyEvents.map((event) => (
          <WeddingAnnouncement key={event.id} event={event} />
        ))}

        <GalleryPreview images={images.map((i) => ({ id: i.id, url: i.url, caption: i.caption }))} />

        {receptionEvents.map((event) => (
          <ReceptionCard key={event.id} event={event} />
        ))}

        <section id="rsvp" className="px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-script text-2xl text-rose-500">Gửi yêu thương</p>
            <h2 className="mt-2 font-heading text-3xl text-rose-800 sm:text-4xl">Sổ Lưu Bút</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-stone-600">
              Mong bạn xác nhận tham dự và để lại lời chúc cho chúng mình.
            </p>
            <div className="mx-auto my-6 h-px w-24 section-divider" />
          </div>

          <div className="mx-auto max-w-md">
            <RsvpForm
              guestSlug={guest?.slug}
              guestName={guest?.name}
              maxCompanions={guest?.maxCompanions ?? 10}
            />
          </div>

          <WishesWall
            wishes={wishes
              .filter((w) => w.message)
              .map((w) => ({ id: w.id, name: w.name, message: w.message as string, createdAt: w.createdAt }))}
          />
        </section>

        <GiftBox />
        <Footer />
      </div>
    </InvitationShell>
  );
}
