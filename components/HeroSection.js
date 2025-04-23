"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const HeroSection = () => {
  const pathname = usePathname();
  const pageContent = {
    "/": {
      title: "Discover Global Publishing with ITAN",
      description:
        "Publish your manuscripts in multiple formats. Create ebooks and audiobooks to expand your reach and connect with new readers.",
    },
    "/publish": {
      title: "Publish With Itan Global Publishing (IGP)",
      description:
        "With Itan Global Publishing (IGP), publish your books and reach millions of readers around the world",
    },
    "/monetize": {
      title: "Monetize With Itan Global Publishing(IGP)",
      description:
        "Itan Global Publishing provides free publishing and multiple royalty streams.",
    },
    "/help": {
      title: "Full support from Itan Global Publishing(IGP)",
      description:
        "Get all the help you need with Itan Global Publishing (IGP) and see the Frequently Asked Questions (FAQ).",
    },
  };

  const content = pageContent[pathname] || pageContent["/"];
  return (
    <FadeIn>
      <section className="large:py-4 xl:py-0 flex flex-col items-center text-center large:text-left xl:text-left xl:max-w-7xl xl:mx-auto">
        <div className="flex flex-col items-center large:flex-row large:items-center large:gap-6 w-full large:max-w-7xl mx-auto xl:flex-row xl:items-center xl:gap-12 xl:max-w-8xl">
          {/* Left Section: Text */}
          <div className="large:mt-6 xl:mt-5 max-w-2xl">
            <h2 className="xs:px-10 font-bold py-4 large:py-2 xl:py-2 text-3xl md:text-4xl large:text-6xl xl:text-7xl">
              {content.title}
            </h2>
            <p className="large:mt-4 text-lg text-gray-700 px-2 large:text-2xl xl:text-2xl">
              {content.description}
            </p>
          </div>
          {/* Right Section: Image */}
          <figure className="mt-6 large:mt-0 w-full large:max-w-md xl:mt-0 xl:max-w-lg">
            <Image
              src="/images/books-with-headphone.png"
              alt="ebooks"
              width={500}
              height={350}
              priority={true}
              quality={80}
              className="w-full h-auto rounded-md"
            />
          </figure>
        </div>
        {/* Buttons - Left-aligned with appropriate sizing */}
        <div className="mt-8 flex flex-col items-center medium:flex-row large:flex-row xl:flex-row gap-4 w-full">
          <button className="px-10 py-1.5 text-sm medium:px-4 medium:py-2 medium:text-base large:px-10 large:py-2.5 large:text-base xl:px-10 xl:py-3 xl:text-lg font-semibold border-2 border-red-500 text-red-500 bg-white hover:bg-red-50 rounded-md transition-colors duration-300 shadow-sm w-auto">
            Sign In
          </button>

          <button className="px-4 py-1.5 text-sm medium:px-4 medium:py-2 medium:text-base large:px-4 large:py-2.5 large:text-base xl:px-5 xl:py-3 xl:text-lg font-semibold border-2 border-red-500 bg-red-500 text-white hover:bg-red-600 rounded-md transition-colors duration-300 shadow-sm w-auto">
            Create Account
          </button>
        </div>
      </section>
    </FadeIn>
  );
};

export default HeroSection;
