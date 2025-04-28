import React from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const Monetize = () => {
  return (
    <div className="">
      <HeroSection />

      <FadeIn delay={0.1} direction="fade" distance={0} duration={1.0}>
        <article className="w-full mt-10 xl:max-w-7xl xl:mx-auto">
          <div className="rounded-lg overflow-hidden bg-opacity-30">
            <div className="flex flex-col large:flex-row xl:flex-row">
              {/* Left Side: Text and List */}
              <div className="w-full large:w-1/2 xl:w-1/2 p-6 medium:p-8 large:p-10 xl:p-12 flex items-center">
                <div className="w-full">
                  <FadeIn
                    delay={0.2}
                    direction="up"
                    distance={20}
                    duration={0.9}
                  >
                    <h3 className="text-2xl medium:text-3xl large:text-4xl xl:text-5xl font-semibold text-center large:text-left xl:text-left mb-6">
                      Maximize your{" "}
                      <span className="text-[#EF5353]">Earning</span> Through
                      Multiple Revenue Sources
                    </h3>
                  </FadeIn>

                  <ul className="list-none space-y-4 medium:space-y-5 large:space-y-6">
                    <FadeIn
                      delay={0.3}
                      direction="left"
                      distance={20}
                      duration={0.8}
                    >
                      <li className="flex items-start">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-shrink-0 mr-3 mt-2 medium:mt-3 large:w-5 large:h-5 xl:w-6 xl:h-6"
                        >
                          <rect width="12" height="12" fill="#D78585" />
                        </svg>
                        <span className="text-lg medium:text-xl large:text-2xl xl:text-3xl">
                          Earn up to 60% royalties on your ebooks
                        </span>
                      </li>
                    </FadeIn>

                    <FadeIn
                      delay={0.45}
                      direction="left"
                      distance={20}
                      duration={0.8}
                    >
                      <li className="flex items-start">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-shrink-0 mr-3 mt-2 medium:mt-3 large:w-5 large:h-5 xl:w-6 xl:h-6"
                        >
                          <rect width="12" height="12" fill="#D78585" />
                        </svg>
                        <span className="text-lg medium:text-xl large:text-2xl xl:text-3xl">
                          Earn up to 65% royalties on your audio books
                        </span>
                      </li>
                    </FadeIn>

                    <FadeIn
                      delay={0.6}
                      direction="left"
                      distance={20}
                      duration={0.8}
                    >
                      <li className="flex items-start">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-shrink-0 mr-3 mt-2 medium:mt-3 large:w-5 large:h-5 xl:w-6 xl:h-6"
                        >
                          <rect width="12" height="12" fill="#D78585" />
                        </svg>
                        <span className="text-lg medium:text-xl large:text-2xl xl:text-3xl">
                          Get paid for every page read with Itan Unbound
                        </span>
                      </li>
                    </FadeIn>
                  </ul>
                </div>
              </div>

              {/* Right Side: Image - No animation added to image as requested */}
              <div className="w-full large:w-1/2 xl:w-1/2 h-[40vh] medium:h-[45vh] large:h-auto xl:h-auto">
                <Image
                  src="/images/happy-woman.png"
                  alt="monetize"
                  className="w-full h-full object-cover"
                  width={522}
                  height={388}
                  priority={true}
                  quality={85}
                />
              </div>
            </div>
          </div>
        </article>
      </FadeIn>

      <section className="my-16 flex flex-col large:flex-row xl:flex-row gap-6 xl:max-w-7xl xl:mx-auto">
        {/* Ebook Royalty Card */}
        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.02] mb-6 large:mb-0 xl:mb-0">
          <div className="p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 medium:w-28 medium:h-28 large:w-32 large:h-32 mb-4">
              <Image
                src="/images/phone-book.png"
                alt="phone-book"
                width={147}
                height={147}
                priority={true}
                quality={80}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-lg medium:text-3xl large:text-3xl xl:text-4xl font-semibold text-gray-800 mb-2">
              Royalty for eBook Sale
            </p>
            <p className="text-[#EF5353] text-3xl medium:text-4xl large:text-5xl xl:text-6xl font-bold">
              70%
            </p>
          </div>
        </div>

        {/* Audiobook Royalty Card */}
        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.02]">
          <div className="p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 medium:w-28 medium:h-28 large:w-32 large:h-32 mb-4">
              <Image
                src="/images/audio-book.png"
                alt="audio-book"
                width={147}
                height={147}
                priority={true}
                quality={80}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-lg medium:text-3xl large:text-3xl xl:text-4xl font-semibold text-gray-800 mb-2">
              Royalty for Audiobook Sale
            </p>
            <p className="text-[#EF5353] text-3xl medium:text-4xl large:text-5xl xl:text-6xl font-bold">
              65%
            </p>
          </div>
        </div>
      </section>

      <section className="my-16 xl:max-w-7xl xl:mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 medium:p-8 large:p-10 xl:p-12 flex flex-col large:flex-row xl:flex-row gap-8 large:gap-12 xl:gap-16">
          <div className="w-full large:w-1/2 xl:w-1/2">
            <h3 className="text-2xl medium:text-3xl large:text-4xl xl:text-5xl font-semibold text-center large:text-left xl:text-left mb-6">
              Get Paid for Every Page Read on ITAN Unbound
            </h3>

            <p className="text-lg medium:text-xl large:text-2xl text-gray-700 mb-4">
              With ITAN Unbound's subscription program, your book reaches a
              wider audience of eager readers, expanding its reach beyond
              traditional sales.
            </p>

            <p className="text-lg medium:text-xl large:text-2xl text-gray-700">
              Your revenue share is based on the number of pages read by
              customers in the subscription program.
            </p>
          </div>

          <figure className="w-full large:w-1/2 xl:w-1/2 flex items-center justify-center">
            <Image
              src="/images/woman.png"
              alt="ITAN Unbound revenue graph"
              width={308}
              height={308}
              priority={true}
              quality={85}
              className="w-full h-auto max-w-md mx-auto object-contain rounded-md"
            />
          </figure>
        </div>
      </section>
    </div>
  );
};

export default Monetize;
