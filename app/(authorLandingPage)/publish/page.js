import React from "react";
// import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

const Publish = () => {
  return (
    <div className="pb-10">
      <FadeIn delay={0.1} direction="fade" distance={0} duration={1.0}>
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#111928] to-[#0841AC] rounded-b-lg">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-15">
            <div className="absolute top-[10%] right-[10%] w-24 h-24 xs:w-32 xs:h-32 medium:w-48 medium:h-48 opacity-40 animate-float-slow">
              <svg
                viewBox="0 0 24 24"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
              </svg>
            </div>
            <div className="absolute bottom-[20%] left-[15%] w-20 h-20 xs:w-24 xs:h-24 medium:w-32 medium:h-32 opacity-30 rotate-[-15deg] animate-float">
              <svg
                viewBox="0 0 24 24"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM5 19V5H19V19H5Z" />
                <path d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" />
              </svg>
            </div>
            <div className="absolute top-[40%] left-[5%] w-16 h-16 xs:w-20 xs:h-20 medium:w-28 medium:h-28 opacity-20 rotate-12 animate-float-slow">
              <svg
                viewBox="0 0 24 24"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16h-4.2l-2.8 2.8-2.8-2.8H5V4h14v14z" />
                <path d="M12 5.5L9 9h6z" />
                <path d="M9 13h6v2H9z" />
              </svg>
            </div>
          </div>

          {/* Subtle glow effects */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#2563EB] rounded-full filter blur-[100px] opacity-20 -z-10"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#E50913] rounded-full filter blur-[100px] opacity-10 -z-10"></div>

          {/* Main content container with better padding for all screens */}
          <div className="relative w-full px-5 xs:px-6 medium:px-8 large:px-10 xl:max-w-6xl xl:mx-auto pt-16 mt-10 medium:mt-14 large:mt-16 xl:mt-18 xs:pt-20 medium:pt-24 large:pt-28 xl:pt-32 pb-20 xs:pb-24 medium:pb-28 large:pb-32 xl:pb-36 z-10">
            {/* Centered content for all screen sizes */}
            <div className="w-full max-w-3xl mx-auto text-center">
              <FadeIn delay={0.3} direction="up" distance={15} duration={0.8}>
                <h1 className="font-normal text-2xl xs:text-3xl medium:text-4xl large:text-5xl xl:text-6xl text-white leading-[1.4] xs:leading-[1.3] medium:leading-[1.2] large:leading-[1.2] tracking-tight">
                  <div className="flex flex-col xs:flex-col medium:flex-row medium:flex-wrap medium:gap-1.5">
                    {/* First line with underline */}
                    <div className="relative inline-self-start mb-2 xs:mb-2 medium:mb-0">
                      <span className="relative z-10 whitespace-normal">
                        Start your publishing journey
                      </span>
                      <span className="absolute -bottom-[2px] xs:-bottom-[3px] medium:-bottom-[4px] large:-bottom-[5px] xl:-bottom-[6px] left-0 w-full h-[2px] xs:h-[3px] medium:h-[4px] large:h-[5px] xl:h-[6px] bg-[#E50913] opacity-80 rounded-full"></span>
                    </div>

                    {/* Second line */}
                    <span className="inline-self-start medium:self-auto">
                      in three easy steps
                    </span>
                  </div>
                </h1>

                {/* Visual representation of "three steps" */}
                <div className="flex items-center justify-center gap-3 xs:gap-4 medium:gap-5 mt-6 xs:mt-7 medium:mt-8 large:mt-10">
                  <div className="w-16 xs:w-20 medium:w-24 large:w-28 h-1 xs:h-1.5 medium:h-2 bg-[#E50913] rounded-full opacity-90"></div>
                  <div className="w-16 xs:w-20 medium:w-24 large:w-28 h-1 xs:h-1.5 medium:h-2 bg-white rounded-full opacity-60"></div>
                  <div className="w-16 xs:w-20 medium:w-24 large:w-28 h-1 xs:h-1.5 medium:h-2 bg-white rounded-full opacity-30"></div>
                </div>

                <p className="mt-6 xs:mt-7 medium:mt-8 large:mt-9 xl:mt-10 text-base xs:text-lg medium:text-xl large:text-2xl xl:text-2xl text-white/90 font-light mx-auto">
                  Bring your stories to life and reach readers worldwide through
                  our streamlined publishing platform.
                </p>

                <div className="mt-8 xs:mt-9 medium:mt-10 large:mt-12 xl:mt-14 flex flex-wrap justify-center gap-4 xs:gap-5">
                  <Link
                    href="/author/sign_in"
                    className="flex items-center justify-center space-x-2 bg-[#E50913] hover:bg-[#c20810] transition-colors duration-300 text-white rounded-md px-6 xs:px-7 medium:px-8 py-3 xs:py-3.5 medium:py-4 shadow-lg"
                  >
                    <span className="font-medium text-sm xs:text-base medium:text-lg large:text-lg xl:text-lg">
                      Start Publishing
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="w-3.5 h-3.5 xs:w-4 xs:h-4 medium:w-5 medium:h-5"
                    />
                  </Link>
                  <Link
                    href="/help"
                    className="flex items-center justify-center space-x-2 bg-transparent border-2 border-white/30 hover:border-white/50 transition-colors duration-300 text-white rounded-md px-6 xs:px-7 medium:px-8 py-3 xs:py-3.5 medium:py-4"
                  >
                    <span className="font-medium text-sm xs:text-base medium:text-lg">
                      Learn More
                    </span>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Wave shape bottom transition */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 120"
              className="w-full"
            >
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,58.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              ></path>
            </svg>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.1} direction="fade" distance={0} duration={1.0}>
        <article className="w-full mt-10 px-4 medium:px-6 large:px-0 xl:max-w-7xl xl:mx-auto">
          <div className="rounded-lg overflow-hidden bg-[#E7E7E7] bg-opacity-30 shadow-sm">
            <div className="flex flex-col large:flex-row xl:flex-row large:items-stretch xl:items-stretch">
              <div className="w-full large:w-1/2 xl:w-1/2 p-6 medium:p-8 large:p-10 xl:p-12 flex items-center">
                <div className="w-full">
                  <div className="list-none space-y-4 medium:space-y-5 large:space-y-6 xl:space-y-8">
                    <FadeIn
                      delay={0.3}
                      direction="up"
                      distance={15}
                      duration={0.8}
                    >
                      <h3 className="text-xl xs:text-2xl medium:text-2xl large:text-3xl xl:text-4xl font-semibold">
                        Step 1: Get your manuscript and cover ready
                      </h3>
                    </FadeIn>

                    <FadeIn
                      delay={0.4}
                      direction="left"
                      distance={20}
                      duration={0.9}
                    >
                      <div className="flex items-start">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-shrink-0 mr-3 mt-2 medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                        >
                          <rect width="12" height="12" fill="#000000" />
                        </svg>
                        <span className="text-lg medium:text-xl large:text-2xl xl:text-2xl large:leading-snug xl:leading-snug">
                          Ensure your manuscript is properly formatted,
                          including the cover page, front section, title page
                          and author biography.
                        </span>
                      </div>
                    </FadeIn>

                    <FadeIn
                      delay={0.5}
                      direction="up"
                      distance={10}
                      duration={0.8}
                    >
                      <p className="italic text-sm medium:text-base large:text-base xl:text-lg text-gray-700 ml-0 large:ml-8 xl:ml-9 large:pr-4 xl:pr-10">
                        We recommend hiring a desktop publisher to format your
                        book for publishing. Use Canva to create a stunning and
                        eye-catching cover, or work with a graphic artist for a
                        professionally designed cover.
                      </p>
                    </FadeIn>
                  </div>
                </div>
              </div>

              {/* Add a placeholder for the right side on large/xl screens */}
              <div className="hidden large:flex xl:flex w-1/2 bg-gradient-to-tr from-[#E7E7E7] to-[#E7E7E7] items-center justify-center p-10 xl:p-12">
                <FadeIn
                  delay={0.4}
                  direction="right"
                  distance={25}
                  duration={1.0}
                >
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 xl:w-20 xl:h-20 mx-auto mb-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM5 19V5H19V19H5Z"
                        fill="#E50913"
                      />
                      <path
                        d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"
                        fill="#E50913"
                      />
                    </svg>
                    <h4 className="text-xl xl:text-2xl font-semibold text-gray-800 mb-3">
                      Publishing Made Simple
                    </h4>
                    <p className="text-base xl:text-lg text-gray-600 max-w-sm mx-auto">
                      Our streamlined process makes it easy to bring your book
                      to life.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </article>
      </FadeIn>
      <section className="w-full mt-10 px-4 xs:px-5 medium:px-6 large:px-8 xl:max-w-7xl xl:mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-5 xs:p-6 medium:p-8 large:p-10">
          <FadeIn delay={0.1} direction="up" distance={15} duration={0.8}>
            <h3 className="text-xl xs:text-2xl medium:text-2xl large:text-3xl xl:text-4xl font-semibold mb-4 xs:mb-5 medium:mb-6 large:mb-6 xl:w-full xl:text-left xl:pr-0">
              Step 2 : Publish in Multiple Formats
            </h3>
          </FadeIn>

          <FadeIn delay={0.2} direction="fade" distance={0} duration={0.9}>
            <p className="my-3 xs:my-4 medium:my-5 text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl text-gray-700">
              You can publish your book as an ebook, an audiobook, or both, and
              we'll make them available in Itan Global Stores.
            </p>
          </FadeIn>

          <div className="mt-5 xs:mt-6 medium:mt-8 large:mt-10 flex flex-col large:flex-row xl:flex-row gap-6 medium:gap-8 large:gap-10">
            {/* List container with responsive sizing and custom SVG markers */}
            <div className="w-full large:w-1/2 xl:w-1/2">
              <ul className="space-y-3 xs:space-y-4 medium:space-y-5 large:space-y-4 xl:space-y-5 text-base xs:text-lg medium:text-xl large:text-xl xl:text-xl">
                <FadeIn
                  delay={0.3}
                  direction="left"
                  distance={20}
                  duration={0.7}
                >
                  <li className="flex items-start">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 mr-3 mt-1.5 medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1 xl:mt-1.5"
                    >
                      <rect width="12" height="12" fill="#000000" />
                    </svg>
                    <span className="font-medium">
                      Input your book details, including the title and author,
                      in the specified fields.
                    </span>
                  </li>
                </FadeIn>

                <FadeIn
                  delay={0.4}
                  direction="left"
                  distance={20}
                  duration={0.7}
                >
                  <li className="flex items-start">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 mr-3 mt-1.5 medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1 xl:mt-1.5"
                    >
                      <rect width="12" height="12" fill="#000000" />
                    </svg>
                    <span className="font-medium">
                      Choose your book categories.
                    </span>
                  </li>
                </FadeIn>

                <FadeIn
                  delay={0.5}
                  direction="left"
                  distance={20}
                  duration={0.7}
                >
                  <li className="flex items-start">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 mr-3 mt-1.5 medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1 xl:mt-1.5"
                    >
                      <rect width="12" height="12" fill="#000000" />
                    </svg>
                    <span className="font-medium">
                      Enter keywords and tags that best describe your book.
                    </span>
                  </li>
                </FadeIn>

                <FadeIn
                  delay={0.6}
                  direction="left"
                  distance={20}
                  duration={0.7}
                >
                  <li className="flex items-start">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 mr-3 mt-1.5 medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1 xl:mt-1.5"
                    >
                      <rect width="12" height="12" fill="#000000" />
                    </svg>
                    <span className="font-medium">
                      Submit your prepared manuscript, cover and review.
                    </span>
                  </li>
                </FadeIn>

                <FadeIn
                  delay={0.7}
                  direction="left"
                  distance={20}
                  duration={0.7}
                >
                  <li className="flex items-start">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 mr-3 mt-1.5 medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1 xl:mt-1.5"
                    >
                      <rect width="12" height="12" fill="#000000" />
                    </svg>
                    <span className="font-medium">
                      Select your list prices for each book format.
                    </span>
                  </li>
                </FadeIn>

                <FadeIn
                  delay={0.8}
                  direction="left"
                  distance={20}
                  duration={0.7}
                >
                  <li className="flex items-start">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 mr-3 mt-1.5 medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1 xl:mt-1.5"
                    >
                      <rect width="12" height="12" fill="#000000" />
                    </svg>
                    <span className="font-medium">
                      Hit the "Publish" button.
                    </span>
                  </li>
                </FadeIn>
              </ul>
            </div>

            {/* Image - kept exactly as is, no animation added */}
            <figure className="hidden large:flex xl:flex w-full large:w-1/2 xl:w-1/2 justify-center items-center">
              <Image
                src="/images/digital-formats.png"
                alt="Digital publishing formats"
                width={584}
                height={434}
                priority={true}
                quality={85}
                className="w-full large:w-[90%] xl:w-[85%] max-w-md large:max-w-lg xl:max-w-xl rounded-lg shadow-sm"
              />
            </figure>
          </div>
        </div>
      </section>
      <section className="w-full mt-10 px-4 xs:px-5 medium:px-6 large:px-8 xl:max-w-7xl xl:mx-auto">
        <div className="bg-[#E7E7E7] rounded-lg overflow-hidden shadow-sm flex flex-col large:flex-row xl:flex-row items-center large:items-stretch xl:items-stretch p-5 xs:p-6 medium:p-8 large:p-10">
          {/* Image - kept exactly as is with no animation */}
          <div className="w-full mb-6 large:mb-0 xl:mb-0 large:w-2/5 xl:w-2/5 flex justify-center items-center medium:hidden">
            <Image
              src="/images/exposure.png"
              alt="Book exposure and promotion"
              width={564}
              height={608}
              priority={true}
              quality={85}
              className="w-[85%] xs:w-[75%] large:w-full xl:w-[90%] max-w-xs large:max-w-sm xl:max-w-md rounded-lg shadow-sm"
            />
          </div>

          {/* Content with animations */}
          <div className="w-full large:w-3/5 xl:w-3/5 large:pl-8 xl:pl-10">
            <FadeIn delay={0.1} direction="up" distance={15} duration={0.8}>
              <h3 className="text-xl xs:text-2xl medium:text-2xl large:text-3xl xl:text-4xl font-semibold mb-4 xs:mb-5 medium:mb-6 large:mb-6">
                Step 3: Promote your books - Make them visible
              </h3>
            </FadeIn>

            <FadeIn delay={0.2} direction="fade" distance={0} duration={0.9}>
              <p className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium mb-4 xs:mb-5 medium:mb-6 large:mb-7">
                Congratulations on publishing your book! Next step: promote,
                promote, promote! Here are some suggestions:
              </p>
            </FadeIn>

            <ul className="space-y-3 xs:space-y-4 medium:space-y-5 large:space-y-4 xl:space-y-5 text-base xs:text-lg medium:text-xl large:text-xl xl:text-xl">
              <FadeIn delay={0.3} direction="left" distance={20} duration={0.7}>
                <li className="flex items-start">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mr-3 mt-1.5 xs:mt-1.5 medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1 xl:mt-1.5"
                  >
                    <rect width="12" height="12" fill="#000000" />
                  </svg>
                  <span className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium">
                    Leverage Social Media by talking about your book and sharing
                    the links.
                  </span>
                </li>
              </FadeIn>

              <FadeIn delay={0.4} direction="left" distance={20} duration={0.7}>
                <li className="flex items-start">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mr-3 mt-1.5 xs:mt-1.5 medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1 xl:mt-1.5"
                  >
                    <rect width="12" height="12" fill="#000000" />
                  </svg>
                  <span className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium">
                    Utilize paid ads where necessary.
                  </span>
                </li>
              </FadeIn>

              <FadeIn delay={0.5} direction="left" distance={20} duration={0.7}>
                <li className="flex items-start">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mr-3 mt-1.5 xs:mt-1.5 medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1 xl:mt-1.5"
                  >
                    <rect width="12" height="12" fill="#000000" />
                  </svg>
                  <span className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium">
                    Submit to Book review sites. Itan Book review service is
                    coming soon.
                  </span>
                </li>
              </FadeIn>

              <FadeIn delay={0.6} direction="left" distance={20} duration={0.7}>
                <li className="flex items-start">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mr-3 mt-1.5 xs:mt-1.5 medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1 xl:mt-1.5"
                  >
                    <rect width="12" height="12" fill="#000000" />
                  </svg>
                  <span className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium">
                    Use SEO Strategies, keywords and tags; Optimize your book's
                    description, title, and keywords for search engines to
                    improve visibility and discoverability.
                  </span>
                </li>
              </FadeIn>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Publish;
