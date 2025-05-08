import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const Publish = () => {
  return (
    <div>
      <section className="relative h-[270px] from-[#111928] to-[#0841AC] bg-gradient-from-tl bg-gradient-to-br">
        <h2
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
          className="text-white text-[18px] font-semibold ml-3 pt-7"
        >
          Start your publishing <br /> journey in three easy steps
        </h2>
        <p className="text-xs text-white ml-3 mt-3 mb-2">
          Dream it. Write it. Publish it. Let’s go.
        </p>
        <div className="flex justify-center items-center rounded-sm bg-[#E50913] py-[8px] h-50 w-[150px] ml-3 space-x-1 text-white ">
          <p className="text-xs font-semibold">Get Started for Free</p>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-3 font-extralight"
          />
        </div>
        <Image
          src="/images/publish-hero.png"
          width={150}
          height={250}
          alt="publish"
          className="absolute right-0 bottom-0 "
        />
      </section>
      <article className="w-full mt-5 px-2 medium:px-6 large:px-0 xl:max-w-7xl xl:mx-auto">
        <div className="rounded-lg overflow-hidden bg-opacity-30 shadow-sm">
          <div className="flex flex-col large:flex-row xl:flex-row large:items-stretch xl:items-stretch">
            <div className="w-full large:w-1/2 xl:w-1/2 p-2 medium:p-8 large:p-10 xl:p-12 flex items-center">
              <div className="w-full">
                <h3 className="text-2xl medium:text-3xl large:text-4xl xl:text-5xl font-semibold text-center large:text-left xl:text-left mb-6 large:mb-8 xl:mb-10 large:leading-tight xl:leading-tight"></h3>

                <div className="list-none space-y-4">
                  <h3 className="font-semibold">
                    Step 1: Get your manuscript and cover ready
                  </h3>

                  <div className="flex items-start">
                    <svg
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[7px] h-[7px] fill-gray-600 flex-shrink-0 mr-1 mt-[6px] medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                    >
                      <circle cx="7" cy="7" r="7" />
                    </svg>

                    <span className="text-sm medium:text-xl large:text-2xl xl:text-2xl large:leading-snug xl:leading-snug">
                      Ensure your manuscript is properly formatted, including
                      the cover page, front section, title page and author
                      biography.
                    </span>
                  </div>
                  <p className="text-sm medium:text-base large:text-base xl:text-lg text-gray-700 ml-0 large:ml-8 xl:ml-9 large:pr-4 xl:pr-10">
                    We recommend hiring a desktop publisher to format your book
                    for publishing. Use Canva to create a stunning and
                    eye-catching cover, or work with a graphic artist for a
                    professionally designed cover.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="w-full mt-10 px-4 xs:px-5 medium:px-6 large:px-8 xl:max-w-7xl xl:mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-5 xs:p-6 medium:p-8 large:p-10">
          <h3 className="font-semibold">Step 2: Publish in digital formats</h3>

          <p className="my-3 medium:my-5 text-sm text-gray-700">
            You can self-publish your book as an ebook, an audiobook, or both,
            and we'll make them available in Itan Global Stores.
          </p>

          <div className="mt-5 flex flex-col">
            {/* List container with responsive sizing and custom SVG markers */}
            <div className="w-full large:w-1/2 xl:w-1/2">
              <ul className="space-y-3 text-xs">
                <li className="flex items-start">
                  <svg
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[7px] h-[7px] fill-gray-600 flex-shrink-0 mr-1 mt-[4px] medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                  >
                    <circle cx="7" cy="7" r="7" />
                  </svg>

                  <span className="font-medium">
                    Input your book details, including the title and author, in
                    the specified fields.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[7px] h-[7px] fill-gray-600 flex-shrink-0 mr-1 mt-[4px] medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                  >
                    <circle cx="7" cy="7" r="7" />
                  </svg>

                  <span className="font-medium">
                    Choose your book categories.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[7px] h-[7px] fill-gray-600 flex-shrink-0 mr-1 mt-[4px] medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                  >
                    <circle cx="7" cy="7" r="7" />
                  </svg>

                  <span className="font-medium">
                    Enter keywords and tags that best describe your book.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[7px] h-[7px] fill-gray-600 flex-shrink-0 mr-1 mt-[4px] medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                  >
                    <circle cx="7" cy="7" r="7" />
                  </svg>

                  <span className="font-medium">
                    Submit your prepared manuscript and cover and review.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[7px] h-[7px] fill-gray-600 flex-shrink-0 mr-1 mt-[4px] medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                  >
                    <circle cx="7" cy="7" r="7" />
                  </svg>

                  <span className="font-medium">
                    Select your list prices for each book format.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[7px] h-[7px] fill-gray-600 flex-shrink-0 mr-1 mt-[4px] medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                  >
                    <circle cx="7" cy="7" r="7" />
                  </svg>

                  <span className="font-medium">Hit the "Publish" button.</span>
                </li>
              </ul>
              <div className="flex justify-center w-full mt-6">
                <Image
                  src="/images/heist-books.png"
                  width={400}
                  height={350}
                  alt="books sample"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mt-6 px-4 xs:px-5 medium:px-6 large:px-8 xl:max-w-7xl xl:mx-auto">
        <div className="bg-[#E7E7E7] rounded-lg overflow-hidden shadow-sm flex flex-col-reverse large:flex-row xl:flex-row items-center large:items-stretch xl:items-stretch p-5 xs:p-6 medium:p-8 large:p-10">
          {/* Image - kept exactly as is with no animation */}
          <div className="w-full mb-4 mt-5 flex justify-center items-center medium:hidden">
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
            <h2 className="font-semibold mb-3">
              Step 3: Promote Your Books - Make Them Visible
            </h2>
            <p className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium mb-4 xs:mb-5 medium:mb-6 large:mb-7">
              Congratulations on publishing your book! Next step: promote,
              promote, promote! Here are some suggestions:
            </p>

            <ul className="space-y-3 text-xs">
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 flex-shrink-0 mr-1 mt-[6px] medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium">
                  Promote your books by leveraging Social Media.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 flex-shrink-0 mr-1 mt-[6px] medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium">
                  Utilize paid ads where necessary.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 flex-shrink-0 mr-1 mt-[6px] medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium">
                  Submit to book review sites.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 flex-shrink-0 mr-1 mt-[6px] medium:mt-2 large:w-5 large:h-5 xl:w-6 xl:h-6 large:mt-1.5 xl:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium">
                  Want more readers to find your book? Use SEO Techniques- Tweak
                  your descriptions, keywords and tags to show up in search
                  results.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Publish;
