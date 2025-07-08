"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";

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
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-8"
      >
        {features.map((feature, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-6 rounded-xl shadow-lg h-[200px] w-[300px]">
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm">{feature.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
