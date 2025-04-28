"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

const HeroSection = () => {
  const pathname = usePathname();
  const pageContent = {
    "/": {
      title: "Discover ITAN Global Publishing",
      description:
        "Publish your manuscripts in multiple formats. Create ebooks and audiobooks to expand your reach and connect with new readers.",
    },
    "/publish": {
      title: "Publish With IGP",
      description:
        "With Itan Global Publishing (IGP), publish your books and reach millions of readers around the world",
    },
    "/monetize": {
      title: "Monetize With Itan Global Publishing(IGP)",
      description:
        "Itan Global Publishing provides free publishing and multiple royalty streams.",
    },
    "/help": {
      title: "Get Full support from IGP",
      description:
        "Get all the help you need with Itan Global Publishing (IGP) and see the Frequently Asked Questions (FAQ).",
    },
  };

  const content = pageContent[pathname] || pageContent["/"];
  return (
    <FadeIn>
      <section className="mt-4 medium:mt-6 flex flex-col items-center text-center large:text-left xl:text-left xl:max-w-7xl xl:mx-auto">
        <div className="flex flex-col items-center large:flex-row large:items-center w-full large:max-w-7xl mx-auto xl:flex-row xl:items-center xl:gap-6 xl:max-w-8xl">
          {/* Left Section: Text */}
          <div className="max-w-2xl mt-2 medium:mt-4 large:mt-0 xl:mt-0 large:w-1/2 xl:w-1/2">
            <h2 className="font-bold text-3xl md:text-4xl large:text-5xl xl:text-5xl px-4 xs:px-6 large:px-0 xl:px-0">
              {content.title}
            </h2>
            <p className="mt-3 large:mt-4 xl:mt-5 text-lg text-center large:text-left xl:text-left text-gray-700 px-4 xs:px-6 large:px-0 xl:px-0 large:text-2xl xl:text-2xl">
              {content.description}
            </p>

            {/* Buttons - Only visible on large screens */}
            <div className="hidden large:flex xl:flex flex-row gap-3 mt-6">
              <Link href="/author/sign_in">
                <button className="w-[180px] px-0 py-2 text-base large:w-[180px] xl:w-[200px] xl:py-2.5 xl:text-lg font-semibold border-2 border-red-500 text-red-500 bg-white hover:bg-red-50 rounded-md transition-colors duration-300 shadow-sm text-center">
                  Sign In
                </button>
              </Link>

              <Link href="/author/sign_up">
                <button className="w-[180px] px-0 py-2 text-base large:w-[180px] xl:w-[200px] xl:py-2.5 xl:text-lg font-semibold border-2 border-red-500 bg-red-500 text-white hover:bg-red-600 rounded-md transition-colors duration-300 shadow-sm text-center">
                  Create Account
                </button>
              </Link>
            </div>
          </div>

          {/* Right Section: Image */}
          <figure className="mt-4 medium:mt-5 large:mt-0 xl:mt-0 w-full large:w-1/2 xl:w-1/2 large:max-w-md xl:max-w-lg">
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

        {/* Buttons - Only visible on mobile/medium screens */}
        <div className="mt-4 medium:mt-6 flex flex-col items-center gap-3 w-full large:hidden xl:hidden">
          <Link href="/author/sign_in">
            <button className="w-[170px] px-0 py-1.5 text-sm medium:w-[180px] medium:py-2 medium:text-base font-semibold border-2 border-red-500 text-red-500 bg-white hover:bg-red-50 rounded-md transition-colors duration-300 shadow-sm text-center">
              Sign In
            </button>
          </Link>

          <Link href="/author/sign_up">
            <button className="w-[170px] px-0 py-1.5 text-sm medium:w-[180px] medium:py-2 medium:text-base font-semibold border-2 border-red-500 bg-red-500 text-white hover:bg-red-600 rounded-md transition-colors duration-300 shadow-sm text-center">
              Create Account
            </button>
          </Link>
        </div>
      </section>
    </FadeIn>
  );
};

export default HeroSection;
