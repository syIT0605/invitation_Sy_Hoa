import { prisma } from "@/lib/db";
import { Hero } from "@/components/site/hero";
import { CoupleIntro } from "@/components/site/couple-intro";
import { StoryTimeline } from "@/components/site/story-timeline";
import { EventDetails } from "@/components/site/event-details";
import { GalleryPreview } from "@/components/site/gallery-preview";
import { RsvpForm } from "@/components/site/rsvp-form";
import { WishesWall } from "@/components/site/wishes-wall";
import { GiftBox } from "@/components/site/gift-box";
import { Footer } from "@/components/site/footer";
import { MusicPlayer } from "@/components/site/music-player";

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

  return (
    <div className="flex-1">
      <Hero guestName={guest?.name} />
      <CoupleIntro />
      <StoryTimeline />
      <EventDetails />
      <GalleryPreview images={images.map((i) => ({ id: i.id, url: i.url, caption: i.caption }))} />

      <section id="rsvp" className="px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-script text-2xl text-rose-500">Xác nhận</p>
          <h2 className="mt-2 font-heading text-3xl text-rose-800 sm:text-4xl">
            Bạn sẽ đến chứ?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-stone-600">
            Mong bạn xác nhận giúp chúng mình để buổi tiệc được chu đáo nhất.
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
      </section>

      <WishesWall
        wishes={wishes
          .filter((w) => w.message)
          .map((w) => ({ id: w.id, name: w.name, message: w.message as string, createdAt: w.createdAt }))}
      />

      <GiftBox />
      <Footer />
      <MusicPlayer track={activeTrack ? { url: activeTrack.url, title: activeTrack.title } : null} />
    </div>
  );
}
