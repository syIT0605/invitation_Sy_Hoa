import { weddingConfig } from "@/lib/config";

export function StoryTimeline() {
  return (
    <section className="bg-rose-50/60 px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-script text-2xl text-rose-500">Chuyện của chúng mình</p>
        <h2 className="mt-2 font-heading text-3xl text-rose-800 sm:text-4xl">Hành trình yêu thương</h2>
        <div className="mx-auto my-6 h-px w-24 section-divider" />
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-8">
        {weddingConfig.coupleStory.map((item, index) => (
          <div key={item.year} className="relative flex gap-5 pl-2">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 font-heading text-xs font-semibold text-white">
                {item.year}
              </div>
              {index < weddingConfig.coupleStory.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-rose-200" />
              )}
            </div>
            <div className="pb-6">
              <h3 className="font-heading text-lg text-rose-700">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
