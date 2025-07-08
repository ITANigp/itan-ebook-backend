"use client";

import Image from "next/image";

import dynamic from "next/dynamic";
import FAQ from "@/components/reader/FQA";
import Link from "next/link";

// Dynamically import FeatureCarousel with SSR disabled
const FeatureCarousel = dynamic(() => import("@/components/reader/FeatureCarousel"), {
  ssr: false,
});

export default function Home() {

  return (
    <div>
      <section className="relative h-[600px] bg-black text-white overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/reader-hero.png"
            alt="Books background"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>

        {/* Red Wave Pattern at Bottom */}
        <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
          <Image
            src="/images/decorative-wave.png"
            alt="Red wave"
            width={1440}
            height={150}
            className="w-full object-cover"
          />
        </div>

        {/* Top branding and CTA */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          {/* Logo top-left */}
          <div className="absolute top-6 left-6 text-4xl font-bold text-red-600">
            ITAN
          </div>

          {/* Sign Up button top-right */}
          <div className="absolute top-6 right-6">
            <Link
              href="/reader/sign_up"
              className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition shadow"
            >
              Sign Up
            </Link>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Home of Black Fiction Novels
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-2xl mb-6 leading-relaxed mt-5">
            Explore the richest collection of black fiction in one app
          </p>

          {/* CTA Button */}
          <Link href="/reader/landing/book-store" className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700 transition mt-5">
            Get started
          </Link>
        </div>
      </section>

      <section className="py-14 bg-[#050A30]">
        <h3 className="text-4xl text-center text-white mb-14">
          Find your Match in More than 100 <br /> Genres and Categories
        </h3>
        <div className="flex justify-center space-x-2">
          <Image
            src="/images/readers/onboarding/ancestral-code.png"
            width={150}
            height={400}
            alt="ancestral code"
          />
          <Image
            src="/images/readers/onboarding/Lazarus.png"
            width={150}
            height={400}
            alt="Lazarus Convergence"
          />
          <Image
            src="/images/readers/onboarding/titan-race.png"
            width={150}
            height={400}
            alt="Titan race"
          />
          <Image
            src="/images/readers/onboarding/in-bed-with-her-guy.png"
            width={150}
            height={400}
            alt="in bed with her guy"
          />
          <Image
            src="/images/readers/onboarding/sons-of-the-7th-dawn.png"
            width={150}
            height={400}
            alt="sons of the 7th dawn"
          />
        </div>
      </section>

      <section className="relative bg-black py-20 overflow-hidden text-center text-white">
        {/* 3D rotated background */}
        <div className="absolute inset-0 z-10 transform rotateX-12 perspective-1000">
          <Image
            src="/images/readers/onboarding/rotating-red-wave.png"
            alt="Rotating red wave background"
            fill
            className="object-cover opacity-70"
          />
        </div>

        {/* Text Content */}
        <div className="relative z-10 px-4">
          <div className="text-2xl md:text-3xl lg:text-5xl font-semibold leading-10">
            <p>Feel the Fire of Black storytelling</p>
            <p className="my-5">where every book is a portal and </p>
            <p>every word is power</p>
          </div>
        </div>
      </section>

      <section className="flex justify-between bg-[#050A30]">
        <Image
          src="/images/readers/onboarding/phone-picture.png"
          width={300}
          height={400}
          alt="phone image"
        />
        <p className="text-white text-[46px] text-center mx-12 mt-5">
          ‘Step into the world of African Storytelling - where mystery meets
          magic, thrillers tangle with romance, and comics collide with sci-fi
          all set to whisk you to the island “EXCITE” ‘
        </p>
      </section>

      <FeatureCarousel />
      <FAQ />

      <section className="bg-black text-white py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get All These Experiences in ITAN
            </h2>
            <p className="text-gray-300 mb-6 max-w-md">
              Subscribe to our Newsletter and get exclusive access to
              binge-worthy stories from bestselling authors anytime, anywhere
              and follow the stories as they unfold!
            </p>

            <form className="flex max-w-md mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-grow px-4 py-3 rounded-l-md text-black focus:outline-none"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-r-md font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Book Covers */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="flex ">
              <img
                src="/images/readers/onboarding/the-color-of-belonging.png"
                alt="The Color of Belonging"
                className="w-28 md:w-64 h-auto rounded-md shadow-lg transform rotate-[6deg]"
              />
              <img
                src="/images/readers/onboarding/lagos-to-lodon.png"
                alt="From Lagos to London"
                className="w-28 md:w-64 h-auto rounded-md shadow-lg transform rotate-[6deg]"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative bg-black text-white h-72 flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/readers/onboarding/subscribe-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        <div className="relative z-10 text-center px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Are you an Author?
          </h2>
          <p className="max-w-xl mx-auto mb-6 text-gray-300">
            With ITAN Global Publishing, authors can self-publish their works,
            manage their books, and royalties all in one platform.
          </p>
          <Link href="/" className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-medium">
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
