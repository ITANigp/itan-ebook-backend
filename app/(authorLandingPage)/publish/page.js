import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const Publish = () => {
  return (
    <div className="md:w-full">
      <section className="relative md:pt-24  h-[270px] md:h-[600px] from-[#111928] to-[#0841AC] bg-gradient-from-tl bg-gradient-to-br">
        <h2
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
          className="text-white text-[18px] font-semibold ml-3 pt-7 md:pt-16 md:mt-p md:text-3xl md:ml-8"
        >
          Start your publishing <br /> journey in three easy steps
        </h2>
        <p className="text-xs text-white ml-3 mt-3 mb-2 md:text-xl md:ml-8">
          Dream it. Write it. Publish it. Let’s go.
        </p>
        <div className="flex justify-center items-center rounded-sm bg-[#E50913] py-[8px] w-[150px] md:h-10 md:w-44 md:rounded-lg ml-3 space-x-1 text-white md:ml-8 cursor-pointer">
          <p className="text-xs font-semibold md:font-normal md:text-sm">
            Get Started for Free
          </p>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-3 font-extralight md:w-6"
          />
        </div>
        <Image
          src="/images/publish-hero.png"
          width={150}
          height={250}
          alt="publish"
          className="absolute right-0 bottom-0 md:w-[350px]"
        />
      </section>
      <article className="w-full mt-5 px-2 md:pl-8 md:pt-8 md:w-[1000px]">
        <div className="w-full flex items-center">
          <div className="w-full">
            <div className="list-none space-y-4">
              <h3 className="font-semibold md:text-xl">
                Step 1: Get your manuscript and cover ready
              </h3>

              <div className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 mr-1 mt-[6px] "
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="text-sm md:text-base">
                  Ensure your manuscript is properly formatted, including the
                  cover page, front section, title page and author biography.
                </span>
              </div>
              <p className="text-sm  text-black italic">
                We recommend hiring a desktop publisher to format your book for
                publishing. Use Canva to create a stunning and eye-catching
                cover, or work with a graphic artist for a professionally
                designed cover.
              </p>
            </div>
          </div>
        </div>
      </article>

      <section className="w-full mt-10 px-4 md:pl-8 md:w-[1100px]">
        <div className="bg-white">
          <h3 className="font-semibold md:text-xl">
            Step 2: Publish in digital formats
          </h3>

          <p className="my-3 medium:my-5 text-sm text-gray-700 md:text-base">
            You can self-publish your book as an ebook, an audiobook, or both,
            and we'll make them available in Itan Global Stores.
          </p>

          <div className="mt-5 flex flex-col md:flex-row md:justify-between md:w-[1100px]">
            {/* List container with responsive sizing and custom SVG markers */}
            <ul className="space-y-3 text-xs">
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] md:w-[11px] md:h-[10px] fill-gray-600 mr-1 mt-[4px] md:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="md:text-base">
                  Input your book details, including the title and author, in
                  the specified fields.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 mr-1 mt-[4px] md:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="md:text-base">
                  Choose your book categories.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 mr-1 mt-[4px] md:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="md:text-base">
                  Enter keywords and tags that best describe your book.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 mr-1 mt-[4px] md:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="md:text-base">
                  Submit your prepared manuscript and cover and review.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 mr-1 mt-[4px] md:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="md:text-base">
                  Select your list prices for each book format.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 mr-1 mt-[4px] md:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="md:text-base">Hit the "Publish" button.</span>
              </li>
            </ul>
            <div className="flex justify-center w-full mt-6 md:justify-end">
              <Image
                src="/images/heist-books.png"
                width={400}
                height={350}
                alt="books sample"
                className=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mt-6 px-4 xs:px-5 medium:px-6 large:px-8 xl:max-w-7xl xl:mx-auto">
        <div className="bg-[#E7E7E7] rounded-lg overflow-hidden shadow-sm flex flex-col-reverse large:flex-row xl:flex-row items-center large:items-stretch xl:items-stretch p-5 xs:p-6 medium:p-8 large:p-10">
          {/* Image - kept exactly as is with no animation */}
          <div className="w-full mb-4 mt-5 flex justify-center items-center medium:hidden md:justify-start">
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
          <div className="w-full md:mt-10">
            <h2 className="font-semibold mb-3 md:text-xl">
              Step 3: Promote Your Books - Make Them Visible
            </h2>
            <p className="text-sm md:text-base md:mb-2">
              Congratulations on publishing your book! Next step: promote,
              promote, promote! Here are some suggestions:
            </p>

            <ul className="space-y-3 text-xs">
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 mr-1 mt-[4px] md:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="text-sm md:text-base">
                  Promote your books by leveraging Social Media.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 mr-1 mt-[4px] md:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="text-sm md:text-base">
                  Utilize paid ads where necessary.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] fill-gray-600 mr-1 mt-[4px] md:mt-2"
                >
                  <circle cx="7" cy="7" r="7" />
                </svg>

                <span className="text-sm md:text-base">
                  Submit to book review sites.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[7px] h-[7px] md:w-[13px] md:h-[13px] fill-gray-600 mr-1 mt-[4px] md:mt-1"
                >
                  <circle cx="9" cy="9" r="9" />
                </svg>

                <span className="text-sm md:text-base">
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
