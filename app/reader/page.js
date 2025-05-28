"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    title: "Start your ",
    highlight: "Reading Adventure",
    description:
      "Discover a world of stories at your fingertips. Browse, explore, and dive into your next great read with ease.",
    image: "/images/reader.png",
  },
  {
    title: "Effortless Bookmark ",
    highlight: "Your Favourite Book",
    description:
      "Save your favorite books with a single tap and pick up right where you left off, anytime.",
    image: "/images/reader.png",
  },
  {
    title: "Listen to Your ",
    highlight: "Favourite Book Feature",
    description:
      "Save your favorite books with a single tap and pick up right where you left off, anytime.",
    image: "/images/reader.png",
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (current < slides.length - 1) setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-white">
      <div className="w-full flex justify-end">
        <button className="text-orange-600 font-medium">Skip</button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <Image
            src={slides[current].image}
            alt="Slide Image"
            width={250}
            height={500}
            className="mb-6"
          />

          <h1 className="text-xl font-semibold text-center">
            {slides[current].title}
            <span className="text-orange-600">{slides[current].highlight}</span>
          </h1>

          <p className="text-gray-600 text-center mt-3 max-w-xs">
            {slides[current].description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between w-full mt-6">
        <button
          onClick={prevSlide}
          disabled={current === 0}
          className={`p-2 rounded-full border text-orange-600 ${
            current === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-orange-600" : "bg-orange-200"
              }`}
            ></span>
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={current === slides.length - 1}
          className={`p-2 rounded-full bg-orange-600 text-white ${
            current === slides.length - 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
