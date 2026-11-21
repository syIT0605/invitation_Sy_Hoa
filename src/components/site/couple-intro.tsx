import { weddingConfig } from "@/lib/config";

function parentLine(relation: "Con trai" | "Con gái", father?: string, mother?: string) {
  if (father && mother) return `${relation} của ${father} và ${mother}`;
  if (father) return `${relation} của ${father}`;
  if (mother) return `${relation} của ${mother}`;
  return null;
}

export function CoupleIntro() {
  const { groom, bride } = weddingConfig;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-script text-2xl text-rose-500">Chúng mình là</p>
        <h2 className="mt-2 font-heading text-3xl text-rose-800 sm:text-4xl">Cô dâu & Chú rể</h2>

        <div className="mx-auto my-6 h-px w-24 section-divider" />

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-rose-100">
            <p className="font-script text-3xl text-rose-600">{groom.fullName}</p>
            <p className="mt-1 text-sm uppercase tracking-wide text-stone-400">Chú rể</p>
            <p className="mt-4 text-sm text-stone-600">
              {parentLine("Con trai", groom.father, groom.mother)}
            </p>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-rose-100">
            <p className="font-script text-3xl text-rose-600">{bride.fullName}</p>
            <p className="mt-1 text-sm uppercase tracking-wide text-stone-400">Cô dâu</p>
            <p className="mt-4 text-sm text-stone-600">
              {parentLine("Con gái", bride.father, bride.mother)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
