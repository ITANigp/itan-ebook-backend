"use client";

const features = [
  {
    title: "Enjoy on all your devices",
    description:
      "Books that travel with you – Enjoy reading on all your devices",
  },
  {
    title: "One Place. Infinite Stories. All Ages.",
    description:
      "From picture books to handpicked reads for teens, to adult page turners, we’ve got stories for every age and stage.",
  },
  {
    title: "Give your kids access to endless books and adventures",
    description:
      "Spark curiosity with enchanting tales and first reads made to grow with your child.",
  },

  {
    title: "One Place. Infinite Stories. All Ages.",
    description:
      "From picture books to handpicked reads for teens, to adult page turners, we’ve got stories for every age and stage.",
  },
  {
    title: "Give your kids access to endless books and adventures",
    description:
      "Spark curiosity with enchanting tales and first reads made to grow with your child.",
  },
  {
    title: "Curate your favorites",
    description:
      "Organize and revisit books you love with your personalized library.",
  },
];

export default function FeatureCarousel() {
  return (
    <section className="bg-black py-16 px-4 text-white">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-12 tracking-tight">
        Stories for Everyone, <span className="text-red-600">Everywhere</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-10 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="w-full max-w-[400px] mx-auto bg-gradient-to-br border-red-500 p-7 rounded-2xl shadow-xl flex flex-col justify-between border border-blue-700/40"
            style={{ minHeight: 220 }}
          >
            <h4 className="text-xl font-semibold mb-3 drop-shadow-sm">
              {feature.title}
            </h4>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
