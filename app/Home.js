"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FadeIn from "@/components/FadeIn";
import ScrollToTop from "@/components/ScrollToTop";

// export const metadata = {
//   title: "ITAN | Self-publish Books & Audiobooks",
//   description: "ITAN makes self-publishing simple and accessible.",
// };

const Home = () => {
  return (
    <div className="text-black font-sans mt-20 md:pt-22">
      <section className="relative flex flex-col items-center text-center py-10 md:py-16 xl:py-24 px-4 overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 -z-10"></div>

        {/* Larger, more sophisticated book background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.07] -z-5">
          <div className="absolute top-10 right-[5%] w-28 h-36 md:w-40 md:h-52 xl:w-56 xl:h-72 rounded-md transform rotate-12">
            <Image
              src="/images/book-show.png"
              alt="Decorative book"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
          <div className="absolute bottom-10 left-[5%] w-24 h-32 md:w-36 md:h-48 xl:w-48 xl:h-64 rounded-md transform -rotate-6">
            <Image
              src="/images/book-show.png"
              alt="Decorative book"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>

          {/* New decorative element for XL screens */}
          <div className="absolute top-1/3 left-[15%] w-0 h-0 xl:w-32 xl:h-40 rounded-md transform rotate-45 opacity-70 hidden xl:block">
            <Image
              src="/images/book-show.png"
              alt="Decorative book"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        </div>

        {/* Content with improved responsive sizing */}
        <div className="relative z-10 w-full max-w-4xl xl:max-w-6xl mx-auto">
          <FadeIn delay={0.1} direction="down" distance={15} duration={0.8}>
            <h2
              className="text-[2rem] xs:text-[2.5rem] medium:text-[3.2rem] large:text-[3.8rem] xl:text-[4.5rem] 2xl:text-[5.2rem] font-bold tracking-tight leading-[1.1] mb-2 md:mb-4 xl:mb-6"
              style={{
                fontFamily: "Georgia, Times New Roman, Times, serif",
                background: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              Discover Global <br className="xs:hidden" /> Publishing with ITAN
            </h2>
          </FadeIn>

          <FadeIn delay={0.3} direction="up" distance={10} duration={0.7}>
            <p
              className="max-w-[500px] sm:text-2xl sm:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] mx-auto mt-4 md:mt-6 xl:mt-8 mb-5 md:mb-6 xl:mb-8 text-gray-700 leading-relaxed xl:leading-relaxed"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              Publish your manuscripts in multiple formats. Create ebooks and
              audiobooks to expand your reach and connect with new readers.
            </p>
          </FadeIn>

          <div className="inline-flex">
            <Link
              href="/author/sign_up"
              className="flex justify-center items-center rounded-sm sm:rounded-md bg-[#E50913] hover:bg-[#c20810] transition-colors duration-300 px-4 py-2.5 h-[35px] sm:h-[40px] w-[140px] xl:h-[50px] xl:w-[170px] space-x-2 text-white cursor-pointer shadow-sm hover:shadow-md"
            >
              <p className="text-sm xl:text-base font-semibold">Get Started</p>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="w-3 sm:w-3.5 xl:w-4"
              />
            </Link>
          </div>

          {/* Enhanced decorative dots */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 xl:space-x-3 mt-8">
            <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-[#E50913] opacity-90"></div>
            <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-[#E50913] opacity-60"></div>
            <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-[#E50913] opacity-30"></div>
          </div>
        </div>

        {/* Enhanced subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('/images/subtle-paper-texture.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      </section>

      <div className="flex justify-center px-2">
        <Image
          src="/images/book-show.png"
          alt="books show"
          width={450}
          height={350}
          className="sm:max-w-[650px] sm:max-h-[450px] w-full h-auto"
        />
      </div>

      <section className="flex flex-col sm:flex-row justify-center w-full md:mb-16 px-3 sm:px-4 md:px-6 mt-10 sm:mt-12">
        <FadeIn delay={0.2} direction="up" distance={10} duration={0.7}>
          <div className="relative bg-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 pt-8 pb-7 md:py-10 lg:py-12 rounded-md sm:max-w-[700px] md:max-w-full xl:max-w-[1200px] 2xl:max-w-[1400px] flex justify-center items-center mx-1 md:mx-10 overflow-hidden border-l-2 border-red-500/20">
            <div className="absolute left-0 top-0 w-20 h-20 bg-gradient-to-br from-slate-100 to-transparent opacity-40 rounded-full -translate-x-10 -translate-y-10"></div>

            <Image
              src="/images/global-map.png"
              width={70}
              height={100}
              className="absolute -left-[10px] xs:w-24 sm:w-32 sm:-left-1 top-2 lg:w-44 xl:w-48 z-10 transition-all duration-300"
              alt="globe"
              priority={true}
            />

            <p
              className="max-w-[300px] text-lg sm:text-xl md:text-2xl lg:text-[32px] xl:text-[38px] 2xl:text-[44px] text-center sm:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1200px] leading-snug md:leading-snug lg:leading-snug xl:leading-normal pl-10 sm:pl-16 md:pl-20 lg:pl-28 xl:pl-32 md:mx-8 font-medium text-gray-800"
              style={{
                fontFamily: "Georgia, Times New Roman, Times, serif",
                textShadow: "0 1px 1px rgba(0,0,0,0.05)",
              }}
            >
              ITAN empowers authors to publish professionally across formats,
              connecting your stories with readers around the world.
            </p>

            <div className="absolute right-0 bottom-0 w-40 h-40 bg-gradient-to-tl from-slate-300 to-transparent opacity-50 rounded-full translate-x-20 translate-y-20"></div>
          </div>
        </FadeIn>
      </section>

      {/* Blue section */}
      <div className="relative overflow-hidden bg-[#111928] mt-12 lg:py-24 py-10">
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('/images/subtle-paper-texture.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn delay={0.1} direction="up" distance={10} duration={0.7}>
            {/* CHANGED: Reduced gap for tablet/desktop only */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-0 lg:gap-0 xl:gap-0 items-center">
              {/* Image Section */}
              {/* CHANGED: Added md:justify-end to push image closer to text on tablet/desktop */}
              <div className="flex justify-center md:justify-end md:pr-2 lg:pr-4 xl:pr-6">
                <div className="relative transform transition-transform duration-500 hover:scale-[1.02] max-w-[320px] md:max-w-none">
                  <div className="absolute -inset-0.5 bg-gradient-to-tr from-red-600/20 to-gray-400/10 rounded-xl blur opacity-30"></div>
                  <Image
                    src="/images/phone-book.png"
                    width={400}
                    height={600}
                    className="relative md:-mb-24 lg:-mb-24 mt-6 md:mt-0 w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] h-auto z-10 drop-shadow-2xl"
                    alt="Phone and books"
                    priority
                  />
                </div>
              </div>

              {/* Text Section */}
              {/* CHANGED: Reduced left padding for tablet/desktop to bring text closer to image */}
              <div className="mt-10 md:mt-0 text-white max-w-xl md:pl-2 lg:pl-3 xl:pl-4">
                <h3 className="text-3xl sm:text-4xl lg:text-4xl font-semibold leading-tight mb-6 tracking-tight">
                  Let the world read and listen to your unique story
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
                  Publish in multiple formats to reach broader audiences and
                  create immersive experiences that resonate with readers
                  worldwide.
                </p>

                <div className="space-y-6">
                  {/* Ebooks */}
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <span className="text-gray-900 text-xs font-bold">1</span>
                    </div>
                    <h4 className="text-xl font-semibold mb-1">Ebooks</h4>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      Transform your manuscripts into professional ebooks on
                      ITAN and connect with digital readers across every
                      continent.
                    </p>
                  </div>

                  {/* Audiobooks */}
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <span className="text-gray-900 text-xs font-bold">2</span>
                    </div>
                    <h4 className="text-xl font-semibold mb-1">Audio Books</h4>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      Bring your stories to life with immersive audio
                      experiences that captivate listeners during commutes,
                      workouts, and beyond.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <section className="py-16 bg-gradient-to-b from-red-50 to-red-50/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeIn delay={0.2} direction="up" distance={10} duration={0.7}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 xl:gap-16">
              {/* Content box */}
              <div className="relative bg-white/90 shadow-lg rounded-xl overflow-hidden border border-red-200/50 lg:max-w-[550px] xl:max-w-[600px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-500"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-100 to-transparent opacity-70 rounded-full"></div>

                <div className="px-6 sm:px-8 py-10 sm:py-12">
                  <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-800 mb-8 tracking-tight">
                    Earn More—Monetize Your Works
                  </h3>

                  <div className="space-y-6 sm:space-y-8">
                    {/* Ebooks royalty */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-red-400 flex items-center justify-center shadow-sm mt-0.5">
                        <Image
                          src="/images/save-money.png"
                          width={20}
                          height={20}
                          alt="earn money icon"
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">
                          Earn Up To 70% On Ebooks
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          Earn up to 70% royalty on all ebooks sold through ITAN
                        </p>
                      </div>
                    </div>

                    {/* Audiobooks royalty */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-red-400 flex items-center justify-center shadow-sm mt-0.5">
                        <Image
                          src="/images/save-money.png"
                          width={20}
                          height={20}
                          alt="earn money icon"
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">
                          Earn Up To 65% On Audiobooks
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          Earn up to 60% royalty on audiobooks and hardcover
                          books sold through ITAN
                        </p>
                      </div>
                    </div>

                    {/* Local payment */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-red-400 flex items-center justify-center shadow-sm mt-0.5">
                        <Image
                          src="/images/save-money.png"
                          width={20}
                          height={20}
                          alt="earn money icon"
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">
                          Royalty Payment Into Your Local Account
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          Control your earnings and get paid into any bank
                          account of your choosing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image container */}
              <div className="relative flex justify-center lg:flex-1">
                <div className="relative transition-transform duration-500 hover:scale-[1.02] max-w-[350px] sm:max-w-[450px] md:max-w-[500px]">
                  <div className="absolute -inset-0.5 bg-gradient-to-tr from-red-500/20 to-red-300/10 rounded-xl blur opacity-30"></div>
                  <div className="bg-white/80 rounded-xl shadow-lg overflow-hidden relative z-10 p-3 sm:p-4">
                    <Image
                      src="/images/earn-money.png"
                      width={500}
                      height={650}
                      alt="Earn money with ITAN"
                      className="w-full h-auto rounded-lg"
                      priority={true}
                    />
                  </div>
                  <div className="absolute -z-10 w-full h-full bg-gradient-to-tr from-red-100 to-red-50 rounded-xl -rotate-3 -translate-x-2 translate-y-2 opacity-70"></div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-[#111928] to-[#1a2235] py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
          <FadeIn delay={0.2} direction="up" distance={10} duration={0.7}>
            {/* Mobile-optimized layout with improved spacing and sizing */}
            <div className="flex flex-col sm:hidden gap-6">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-[130px]">
                  <div className="relative transform transition-transform duration-500 hover:scale-[1.02]">
                    <div className="absolute -inset-0.5 bg-gradient-to-tr from-red-600/10 to-gray-400/5 rounded-xl blur opacity-30"></div>
                    <Image
                      src="/images/itan-phone.png"
                      width={200}
                      height={400}
                      alt="ITAN mobile app"
                      className="relative z-10 w-full h-auto drop-shadow-2xl"
                      priority={true}
                    />
                  </div>
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-xl text-white leading-tight tracking-tight">
                    Building global bridges through storytelling.
                  </h3>

                  <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                    From text to audio, engage all audiences
                  </p>
                </div>
              </div>

              {/* Congratulation message for mobile - improved container */}
              <div className="mt-6 w-full max-w-full mx-auto px-2">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  {/* Enhanced gradient overlay with better opacity */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-white/15 mix-blend-overlay"></div>

                  {/* Better responsive image with proper scaling */}
                  <div className="relative">
                    <Image
                      src="/images/congratulation-meg.png"
                      width={450}
                      height={250}
                      alt="Success message"
                      className="w-full h-auto opacity-95"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      priority={true}
                    />

                    {/* Subtle border effect */}
                    <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet and desktop layout (grid based) */}
            <div className="hidden sm:grid grid-cols-12 gap-y-10 gap-x-6 md:gap-x-8 lg:gap-x-12 relative">
              {/* Left column with phone image */}
              <div className="col-span-5 lg:col-span-5 flex justify-center">
                <div className="relative transform transition-transform duration-500 hover:scale-[1.02] max-w-[280px] w-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-tr from-red-600/10 to-gray-400/5 rounded-xl blur opacity-30"></div>
                  <Image
                    src="/images/itan-phone.png"
                    width={400}
                    height={700}
                    alt="ITAN mobile app"
                    className="relative z-10 w-full h-auto drop-shadow-2xl"
                    priority={true}
                  />
                </div>
              </div>

              {/* Right column with text content */}
              <div className="col-span-7 lg:col-span-7 flex flex-col items-start z-10">
                <h3 className="font-bold mt-8 text-3xl md:text-4xl lg:text-5xl text-white leading-tight tracking-tight max-w-xl">
                  Building global bridges through the power of storytelling.
                </h3>

                <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 mt-6 md:mt-8 max-w-xl mb-8 md:mb-10">
                  From text to audio, engage all audiences
                </p>

                {/* Congratulation message integrated with text */}
                <div className="w-full max-w-[350px] md:max-w-[400px] lg:max-w-[450px]">
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-500/5 to-white/10 mix-blend-overlay"></div>
                    <Image
                      src="/images/congratulation-meg.png"
                      width={350}
                      height={200}
                      alt="Success message"
                      className="w-full h-auto opacity-95 drop-shadow-md"
                      priority={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-10 mt-4 lg:mb-10 md:mx-10">
        <h3
          className="text-center text-2xl mb-2 font-bold md:text-[40px] md:mt-8 lg:mb-5"
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
        >
          Publish a variety of Genres
        </h3>
        <div className="w-full flex justify-center py-7">
          <div
            className="grid grid-cols-3 sm:grid-cols-6 gap-y-5 max-w-[1580px]"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            <div className="flex flex-col items-center">
              <Image
                src="/images/lit-and-fiction.png"
                width={100}
                height={150}
                alt="itan phone"
                className=" lg:w-[150px]"
              />
              <p className="text-xs lg:text-lg lg:mt-2">
                Literature & Fiction{" "}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/horror.png"
                width={100}
                height={150}
                alt="itan phone"
                className="lg:w-[150px]"
              />
              <p className="text-xs lg:text-lg lg:mt-2">Horror </p>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/images/teen-and-young.png"
                width={100}
                height={150}
                alt="itan phone"
                className="lg:w-[150px]"
              />
              <p className="text-xs lg:text-lg lg:mt-2">Teen & Young Adult </p>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/images/romance.png"
                width={100}
                height={150}
                alt="itan phone"
                className="lg:w-[150px]"
              />
              <p className="text-xs lg:text-lg lg:mt-2">Romance </p>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/images/mystery.png"
                width={100}
                height={150}
                alt="itan phone"
                className="lg:w-[150px]"
              />
              <p className="text-xs lg:text-lg lg:mt-2">Mystery </p>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/images/comics.png"
                width={100}
                height={150}
                alt="itan phone"
                className="lg:w-[150px]"
              />
              <p className="text-xs lg:text-lg lg:mt-2">Comics </p>
            </div>
          </div>
        </div>
      </section>

      <div className=" sm:w-full flex justify-center">
        <section className="sm:flex justify-between sm:max-w-[1150px] md:space-x-10 sm:h-auto sm:mx-3">
          <div className="mx-4 flex justify-center">
            <Image
              src="/images/analysis.png"
              width={350}
              height={150}
              alt="analysis"
              className="sm:w-[600px] sm:h-auto"
            />
          </div>
          <div className="mt-8 sm:mt-0 mx-3 pb-10 sm:bg-gray-200 sm:rounded-md sm:w-[600px] sm:h-auto sm:pl-4 sm:pr-1 sm:pt-4 md:p-8 lg:p-12">
            <h3
              className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
            >
              Publish, monitor sales, and manage your earnings
            </h3>

            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl my-2 mb-3 md:mb-4 leading-relaxed text-gray-700">
              Own your publishing process with ITAN—customize your book content,
              look, and price.
            </p>

            <ul className="list-disc list-outside ml-5 space-y-2 md:space-y-3 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              <li className="mb-1 sm:mb-2">
                Publish as many titles as you desire.
              </li>
              <li>
                Maintain full control and ownership of your content, publish at
                your convenience and set your pricing.
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div className="flex justify-center sm:mt-14 mb-10 xl:mb-7">
        <Link
          href="/author/sign_up"
          className="flex justify-center items-center rounded-sm sm:rounded-md bg-[#E50913] hover:bg-[#c20810] transition-colors duration-300 px-4 py-2.5 h-[35px] sm:h-[40px] w-[140px] xl:h-[50px] xl:w-[170px] space-x-2 text-white cursor-pointer shadow-sm hover:shadow-md"
        >
          <p className="text-sm xl:text-base font-semibold">Get Started</p>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-3 sm:w-3.5 xl:w-4"
          />
        </Link>
      </div>
      <ScrollToTop />
    </div>
  );
};
export default Home;