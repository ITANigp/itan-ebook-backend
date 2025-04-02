"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
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
      {/* ✅ Buttons (Mobile/Tablet: Below image, Large screens: Below text) */}
      <div className="mt-6 large:mt-4 flex flex-col large:flex-row xl:flex-row w-full max-w-xs gap-3 large:w-auto xl:self-start large:self-start">
        <button className="w-full py-3 large:p-6 text-nowrap text-2xl text-white bg-red-500 font-bold rounded-md">
          Join Itan
        </button>
        <button className="w-full py-3 large:p-6 text-nowrap text-2xl border border-red-400 text-red-500 font-bold rounded-md">
          Sign In
        </button>
      </div>
    </section>
  );
};

export default Header;
