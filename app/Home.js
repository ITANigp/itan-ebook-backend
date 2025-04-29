"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link"

import  HeroSection from "@/components/HeroSection"
import FadeIn from "@/components/FadeIn";
import AnimatedLayout from "@/components/AnimatedLayout";
import ScrollToTop from "@/components/ScrollToTop";

// export const metadata = {
//   title: "ITAN | Self-publish Books & Audiobooks",
//   description: "ITAN makes self-publishing simple and accessible.",
// };

const Home = () => {
  return (
    // <AnimatedLayout>
    <section className="">
      <HeroSection />
      <FadeIn delay={0.4} direction="fade" distance={0} duration={1.2}>
        <article className="w-full mt-6 medium:mt-8 large:mt-10 xl:max-w-7xl xl:mx-auto">
          <div className="relative h-auto min-h-[280px] medium:h-72 large:h-80 xl:h-96 overflow-hidden rounded-lg bg-[#F6F6F6]">
            {/* Centered text with improved readability */}
            <div className="flex items-center justify-center h-full w-full px-6 py-8 medium:px-8 large:px-10 relative z-10">
              <FadeIn
                delay={0.6}
                direction="up"
                distance={15}
                duration={1.4}
                className="w-full flex justify-center"
              >
                <p
                  className="text-black text-center mx-auto w-full max-w-[340px] xs:max-w-md medium:max-w-lg large:max-w-xl xl:max-w-2xl 
          p-4 medium:p-5 large:p-8 xl:p-10 
          font-semibold text-base xs:text-lg medium:text-2xl large:text-3xl xl:text-4xl 
          leading-snug xs:leading-relaxed medium:leading-relaxed large:leading-relaxed xl:leading-relaxed"
                >
                  ITAN makes self-publishing simple, allowing you to release
                  books in different formats and engage new readers worldwide.
                </p>
              </FadeIn>
            </div>
          </div>
        </article>
      </FadeIn>
      <article className="xl:max-w-7xl xl:mx-auto">
        <div className="large:flex xl:flex large:items-center xl:items-center large:gap-12 xl:gap-16 large:p-8 xl:p-10">
          <figure className="mx-auto w-full max-w-xs large:max-w-sm xl:max-w-md large:w-1/2 xl:w-1/2 flex items-center justify-center">
            <Image
              src="/images/books.png"
              alt="books"
              width={714}
              height={301}
              priority={true}
              quality={85}
              className="w-full h-auto object-contain"
            />
          </figure>
          <div className="medium:w-full large:w-2/3 xl:w-2/3 large:pt-0 xl:pt-0">
            <FadeIn
              delay={0.1}
              direction="fade"
              animateChildren={true}
              staggerChildren={0.15}
            >
              <h2 className="text-center large:text-start xl:text-start text-2xl font-bold large:text-4xl xl:text-5xl mt-6 large:mt-0 xl:mt-0">
                Let the World Read and Listen to your Unique Story
              </h2>
              <h2 className="font-semibold text-2xl mt-6 medium:px-4 large:px-0 large:text-3xl xl:text-3xl xl:mt-8">
                Make your book the next bestseller
              </h2>
              <p className="mt-6 text-gray-600 medium:px-4 large:px-0 large:text-2xl xl:text-3xl">
                Publish in diverse formats to make your content easily
                accessible and enjoyable for all readers.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="fade" distance={0} duration={1.0}>
              <ul className="large:px-0 mt-8">
                <FadeIn
                  delay={0.3}
                  direction="left"
                  distance={25}
                  duration={0.9}
                >
                  <li className="flex flex-col mt-6 medium:px-4 large:px-0">
                    <div className="flex items-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0 mr-3 large:w-5 large:h-5 xl:w-6 xl:h-6"
                      >
                        <rect width="12" height="12" fill="#D78585" />
                      </svg>
                      <h2 className="font-semibold text-2xl xl:text-3xl">
                        Ebook
                      </h2>
                    </div>
                    <p className="text-gray-600 ml-[24px] large:ml-[28px] xl:ml-[32px] large:text-2xl xl:text-3xl">
                      Upload your manuscript and distribute your eBook on ITAN.
                    </p>
                  </li>
                </FadeIn>

                <FadeIn
                  delay={0.4}
                  direction="left"
                  distance={25}
                  duration={0.9}
                >
                  <li className="flex flex-col mt-6 medium:px-4 large:px-0 large:text-2xl">
                    <div className="flex items-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0 mr-3 large:w-5 large:h-5 xl:w-6 xl:h-6"
                      >
                        <rect width="12" height="12" fill="#D78585" />
                      </svg>
                      <h2 className="font-semibold text-2xl xl:text-3xl">
                        Audio Books
                      </h2>
                    </div>
                    <p className="text-gray-600 ml-[24px] large:ml-[28px] xl:ml-[32px] xl:text-3xl">
                      Publish your audiobooks and connect with readers in
                      exciting ways.
                    </p>
                  </li>
                </FadeIn>
              </ul>
            </FadeIn>
          </div>
        </div>
        <div className="bg-[#E7E7E7] mt-8 p-4 large:p-8 xl:p-10 large:mt-12 xl:mt-16 rounded-lg">
          <FadeIn delay={0.1} direction="up" distance={25}>
            <h3 className="text-2xl font-bold large:text-3xl xl:text-4xl">
              Increase your Earnings with ITAN – Monetize your Works
            </h3>
          </FadeIn>

          <div className="large:flex xl:flex large:items-center xl:items-center large:justify-between xl:justify-between large:mt-2 xl:mt-4">
            <div className="flex flex-col gap-6 mt-6 medium:px-4 large:px-0 xl:mb-0 large:w-3/5 xl:w-3/5">
              <FadeIn delay={0.2} direction="up" distance={20}>
                <p className="font-semibold text-2xl medium:px-4 large:px-0 xl:text-3xl">
                  Control your earnings
                </p>
              </FadeIn>

              <ul className="flex flex-col gap-6">
                <FadeIn delay={0.3} direction="left" distance={30}>
                  <li className="flex items-start gap-4">
                    <img
                      src="/images/cash-hand.png"
                      alt="cash hand"
                      className="mt-1 w-6 h-6 large:w-8 large:h-8 xl:w-10 xl:h-10"
                    />
                    <div>
                      <h3 className="font-semibold text-xl large:text-2xl xl:text-3xl">
                        Earn up to 70% on eBooks
                      </h3>
                      <p className="text-gray-600 mt-2 large:text-xl xl:text-2xl">
                        Earn up to 70% royalty on all ebooks sold through ITAN
                      </p>
                    </div>
                  </li>
                </FadeIn>

                <FadeIn delay={0.4} direction="left" distance={30}>
                  <li className="flex items-start gap-4">
                    <img
                      src="/images/cash-hand.png"
                      alt="cash hand"
                      className="mt-1 w-6 h-6 large:w-8 large:h-8 xl:w-10 xl:h-10"
                    />
                    <div>
                      <h3 className="font-semibold text-xl large:text-2xl xl:text-3xl">
                        Earn up to 65% on audio books
                      </h3>
                      <p className="text-gray-600 mt-2 large:text-xl xl:text-2xl">
                        Earn up to 60% royalty on audiobooks and hardcover books
                        sold through ITAN
                      </p>
                    </div>
                  </li>
                </FadeIn>

                <FadeIn delay={0.5} direction="left" distance={30}>
                  <li className="flex items-start gap-4">
                    <img
                      src="/images/hand-2-hand.png"
                      alt="hand"
                      className="mt-1 w-6 h-6 large:w-8 large:h-8 xl:w-10 xl:h-10"
                    />
                    <div>
                      <h3 className="font-semibold text-xl large:text-2xl xl:text-3xl">
                        Payment of earnings into your local account
                      </h3>
                      <p className="text-gray-600 mt-2 large:text-xl xl:text-2xl">
                        Control your earnings and get paid into any bank account
                        of your choice
                      </p>
                    </div>
                  </li>
                </FadeIn>
              </ul>
            </div>

            <figure className="xs:flex xs:items-center justify-center large:block mt-8 medium:hidden large:w-2/5 xl:w-2/5">
              <Image
                src="/images/image-one.png"
                alt="ITAN publishing"
                width={610}
                height={657}
                priority={true}
                quality={85}
                className="large:w-full large:h-auto xl:w-full xl:h-auto large:max-w-md xl:max-w-lg mx-auto"
              />
            </figure>
          </div>
        </div>
      </article>
      <FadeIn delay={0.2} direction="up">
        <div className="xl:max-w-7xl xl:mx-auto">
          <div>
            <p className="mb-8 text-center text-2xl font-semibold mt-6 medium:text-3xl medium:mt-10 large:text-3xl xl:text-4xl">
              Publish a variety of Genres
            </p>
            <div className="grid grid-cols-2 xs:grid-cols-2 medium:grid-cols-3 large:grid-cols-6 xl:grid-cols-6 gap-6 medium:gap-4 large:gap-[3px] xl:gap-[3px] p-4">
              <FadeIn direction="up" delay={0.1} distance={30}>
                <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
                  <div className="w-full aspect-square flex items-center justify-center mb-3">
                    <Image
                      src="/images/comics.png"
                      alt="comics"
                      width={197}
                      height={305}
                      priority={true}
                      quality={80}
                      className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                    />
                  </div>
                  <p className="text-base font-medium">Literature & fiction</p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.1} distance={30}>
                <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
                  <div className="w-full aspect-square flex items-center justify-center mb-3">
                    <Image
                      src="/images/horror.png"
                      alt="horror"
                      width={197}
                      height={305}
                      priority={true}
                      quality={85}
                      className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                    />
                  </div>
                  <p className="text-base font-medium">Horror</p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.1} distance={30}>
                <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
                  <div className="w-full aspect-square flex items-center justify-center mb-3">
                    <Image
                      src="/images/literature.png"
                      alt="literature"
                      width={197}
                      height={305}
                      priority={true}
                      quality={85}
                      className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                    />
                  </div>
                  <p className="text-base font-medium">Teen & Young Adult</p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.1} distance={30}>
                <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
                  <div className="w-full aspect-square flex items-center justify-center mb-3">
                    <Image
                      src="/images/mystery.png"
                      alt="mystery"
                      width={197}
                      height={305}
                      priority={true}
                      quality={85}
                      className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                    />
                  </div>
                  <p className="text-base font-medium">Romance</p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.1} distance={30}>
                <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
                  <div className="w-full aspect-square flex items-center justify-center mb-3">
                    <Image
                      src="/images/romance.png"
                      alt="romance"
                      width={197}
                      height={305}
                      priority={true}
                      quality={85}
                      className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                    />
                  </div>
                  <p className="text-base font-medium">Mystery</p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.1} distance={30}>
                <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
                  <div className="w-full aspect-square flex items-center justify-center mb-3">
                    <Image
                      src="/images/teen-adult.png"
                      alt="teen-adult"
                      width={197}
                      height={305}
                      priority={true}
                      quality={85}
                      className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                    />
                  </div>
                  <p className="text-base font-medium">Comics</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.3} direction="up">
        <article className="medium:mt-10 medium:px-4 large:mt-10 large:flex large:gap-6 large:px-6 xl:mt-4 xl:flex xl:justify-between xl:max-w-7xl xl:mx-auto">
          {/* Image figure kept exactly as is */}
          <figure className="mt-8 medium:hidden large:block xl:block">
            <Image
              src="/images/laptop.png"
              alt=""
              width={609}
              height={453}
              priority={true}
              quality={85}
              className="large:w-64 large:h-64"
            />
          </figure>

          <div className="mt-10 xl:text-2xl xl:ml-10">
            {/* Enhanced heading animation */}
            <FadeIn delay={0.1} direction="up" distance={25} duration={0.95}>
              <h3 className="text-2xl font-bold">
                Publish, Monitor Sales, and Manage Your Earnings
              </h3>
            </FadeIn>

            {/* Subtle paragraph animation */}
            <FadeIn delay={0.25} direction="fade" distance={0} duration={1.0}>
              <p className="text-gray-700 py-2">
                Own your publishing process with ITAN. Customize your book's
                content, look, and price.
              </p>
            </FadeIn>

            <ul className="space-y-3 mt-4">
              {/* First list item with left animation */}
              <FadeIn
                delay={0.4}
                direction="left"
                distance={30}
                duration={0.85}
              >
                <li className="flex items-start">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mr-3 mt-1.5"
                  >
                    <rect width="12" height="12" fill="#D78585" />
                  </svg>
                  <span className="text-xl font-semibold xl:text-2xl">
                    Publish as many titles as you desire.
                  </span>
                </li>
              </FadeIn>

              {/* Second list item with left animation and slightly more delay */}
              <FadeIn
                delay={0.55}
                direction="left"
                distance={35}
                duration={0.85}
              >
                <li className="flex items-start">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mr-3 mt-1.5"
                  >
                    <rect width="12" height="12" fill="#D78585" />
                  </svg>
                  <span className="text-xl large:pr-12 large:text-wrap font-semibold xl:text-2xl">
                    Maintain full control and ownership of your content, publish
                    at your convenience and set your pricing.
                  </span>
                </li>
              </FadeIn>
            </ul>

            {/* Button with attention-grabbing scale-up animation */}
            <FadeIn
              delay={0.7}
              direction="up"
              distance={15}
              duration={0.9}
              className="transform transition-all hover:scale-105"
            >
              <Link href="/author/sign_up">
                <button className="px-4 py-2 my-6 text-xl text-white bg-red-500 rounded-md xl:px-6 xl:py-4">
                  Get started
                </button>
              </Link>
            </FadeIn>
          </div>
        </article>
      </FadeIn>
      <ScrollToTop />
    </section>
    // {/* </AnimatedLayout> */}
  );
};
export default Home;
