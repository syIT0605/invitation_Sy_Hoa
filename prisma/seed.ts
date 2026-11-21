import { prisma } from "../src/lib/db";
import { generateGuestSlug } from "../src/lib/slug";

const sampleGuests = [
  { name: "Nguyễn Văn Minh", side: "GROOM" as const, group: "Bạn đại học", maxCompanions: 1 },
  { name: "Trần Thị Hoa", side: "BRIDE" as const, group: "Đồng nghiệp", maxCompanions: 2 },
  { name: "Lê Thị Lan", side: "BOTH" as const, group: "Gia đình", maxCompanions: 3 },
];

async function main() {
  for (const guest of sampleGuests) {
    const slug = generateGuestSlug(guest.name);
    await prisma.guest.create({ data: { ...guest, slug } });
  }
  console.log(`Đã tạo ${sampleGuests.length} khách mời mẫu.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
