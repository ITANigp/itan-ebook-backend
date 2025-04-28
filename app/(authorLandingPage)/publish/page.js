import React from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const Publish = () => {
  return (
    <div>
      <HeroSection />

      <FadeIn delay={0.1} direction="fade" distance={0} duration={1.0}>
        <article className="w-full mt-10 px-4 medium:px-6 large:px-0 xl:max-w-7xl xl:mx-auto">
          <div className="rounded-lg overflow-hidden bg-opacity-30 shadow-sm">
            <div className="flex flex-col large:flex-row xl:flex-row large:items-stretch xl:items-stretch">
              <div className="w-full large:w-1/2 xl:w-1/2 p-6 medium:p-8 large:p-10 xl:p-12 flex items-center">
                <div className="w-full">
                  <FadeIn
                    delay={0.2}
                    direction="up"
                    distance={20}
                    duration={0.9}
                  >
                    <h3 className="text-2xl medium:text-3xl large:text-4xl xl:text-5xl font-semibold text-center large:text-left xl:text-left mb-6 large:mb-8 xl:mb-10 large:leading-tight xl:leading-tight">
                      Start your publishing journey with two easy steps
                    </h3>
                  </FadeIn>

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
                          <rect width="12" height="12" fill="#D78585" />
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
                      <p className="text-sm medium:text-base large:text-base xl:text-lg text-gray-700 ml-0 large:ml-8 xl:ml-9 large:pr-4 xl:pr-10">
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
              <div className="hidden large:flex xl:flex w-1/2 bg-gradient-to-tr from-[#FEE6E6] to-[#FFF4F4] items-center justify-center p-10 xl:p-12">
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
                        fill="#EF5353"
                      />
                      <path
                        d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"
                        fill="#EF5353"
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
            <h3 className="text-xl xs:text-2xl medium:text-2xl large:text-3xl xl:text-4xl font-semibold">
              Step 2: Publish in digital formats
            </h3>
          </FadeIn>

          <FadeIn delay={0.2} direction="fade" distance={0} duration={0.9}>
            <p className="my-3 xs:my-4 medium:my-5 text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl text-gray-700">
              You can self-publish your book as an ebook, an audiobook, or both,
              and we'll make them available in Itan Global Stores.
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
                      <rect width="12" height="12" fill="#D78585" />
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
                      <rect width="12" height="12" fill="#D78585" />
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
                      <rect width="12" height="12" fill="#D78585" />
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
                      <rect width="12" height="12" fill="#D78585" />
                    </svg>
                    <span className="font-medium">
                      Submit your prepared manuscript and cover and review.
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
                      <rect width="12" height="12" fill="#D78585" />
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
                      <rect width="12" height="12" fill="#D78585" />
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
                src="/images/yaga.png"
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
              <h2 className="text-xl xs:text-2xl medium:text-2xl large:text-3xl xl:text-4xl font-semibold mb-3 xs:mb-4 medium:mb-5 large:mb-6">
                Step 3: Promote Your Books - Make Them Visible
              </h2>
            </FadeIn>

            <FadeIn delay={0.2} direction="fade" distance={0} duration={0.9}>
              <p className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium mb-4 xs:mb-5 medium:mb-6 large:mb-7">
                Congratulations on publishing your book! Next step: promote,
                promote, promote! Here are some suggestions:
              </p>
            </FadeIn>

            <ul className="space-y-3 xs:space-y-4 medium:space-y-5 large:space-y-4 xl:space-y-5">
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
                    <rect width="12" height="12" fill="#D78585" />
                  </svg>
                  <span className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium">
                    Promote your books by leveraging Social Media.
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
                    <rect width="12" height="12" fill="#D78585" />
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
                    <rect width="12" height="12" fill="#D78585" />
                  </svg>
                  <span className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium">
                    Submit to book review sites.
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
                    <rect width="12" height="12" fill="#D78585" />
                  </svg>
                  <span className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-xl font-medium">
                    Want more readers to find your book? Use SEO Techniques-
                    Tweak your descriptions, keywords and tags to show up in
                    search results.
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
