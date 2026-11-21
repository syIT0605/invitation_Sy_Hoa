import { weddingConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-rose-900/95 px-4 py-10 text-center text-rose-100">
      <p className="font-script text-3xl">
        {weddingConfig.groom.shortName} & {weddingConfig.bride.shortName}
      </p>
      <p className="mt-3 text-sm text-rose-200">
        Cảm ơn bạn đã dành thời gian ghé xem thiệp cưới của chúng mình 💕
      </p>
    </footer>
  );
}
