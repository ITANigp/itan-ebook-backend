import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import FadeIn from "@/components/FadeIn";

const Monetize = () => {
  return (
    <div className="bg-gray-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700">
        {/* Background decorative elements - pattern removed */}
        {/* Red accent line removed */}

        <div className="container mx-auto px-4 py-10 sm:py-12 md:py-16 lg:py-20">
          <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-between">
            {/* Image column */}
            <div className="w-full md:w-1/2 lg:w-5/12 flex justify-center md:justify-end relative">
              {/* Square image container - add rounded-full class to make it circular instead */}
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] aspect-square rounded-xl overflow-hidden transform transition-transform duration-700 hover:scale-[1.02]">
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-slate-500/10 to-slate-400/5 rounded-xl blur opacity-30 -z-10"></div>

                {/* Image with fill to properly fill the container */}
                <div className="w-full h-full relative">
                  <Image
                    src="/images/monetize-hero.png"
                    fill
                    alt="Monetize your books with ITAN"
                    className="object-cover object-center relative z-10"
                    priority={true}
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 380px"
                  />
                </div>

                {/* Add shadow effect */}
                <div className="absolute inset-0 shadow-lg z-10 pointer-events-none"></div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-12 w-24 h-24 bg-gradient-to-bl from-slate-400/10 to-transparent rounded-full blur-md"></div>
            </div>

            {/* Content column */}
            <div className="w-full md:w-1/2 lg:w-7/12 mt-8 md:mt-0 text-center md:text-left">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4 md:mb-6 px-2 md:px-0"
                style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
              >
                Monetize your digital books with{" "}
                <span className="text-red-500">ITAN</span> global publishing
              </h1>

              <p
                className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mx-auto md:mx-0 mb-8 md:mb-10 px-4 md:px-0"
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              >
                ITAN provides authors with free publishing and multiple royalty
                streams.
              </p>

              <Link
                href="/author/sign_in"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#E50913] hover:bg-red-700 text-white font-medium rounded-md transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <span className="mr-2">Get Started for Free</span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        {/* Background with gradient overlay - pattern removed */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-gray-200"></div>
        {/* Red accent line removed */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
              style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
            >
              Maximize Your Earnings Through{" "}
              <span className="text-[#E50913]">Multiple Revenue Sources</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              ITAN offers industry-leading royalty rates and multiple income
              streams for authors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {/* Cards remain unchanged */}
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-5px] overflow-hidden group">
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#E50913]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  Ebook Royalties
                </h3>
                <p className="text-gray-700 mb-4">
                  <span className="text-[#E50913] font-bold text-xl sm:text-2xl">
                    60%
                  </span>{" "}
                  royalties on all your ebook sales
                </p>
                <div className="w-full h-1 bg-gradient-to-r from-red-500/30 to-transparent rounded-full"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-5px] overflow-hidden group">
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#E50913]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 01.343-7.415m-2.728 9.9a9 9 0 010-12.728"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  Audiobook Royalties
                </h3>
                <p className="text-gray-700 mb-4">
                  <span className="text-[#E50913] font-bold text-xl sm:text-2xl">
                    65%
                  </span>{" "}
                  royalties on all your audiobook sales
                </p>
                <div className="w-full h-1 bg-gradient-to-r from-red-500/30 to-transparent rounded-full"></div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-5px] overflow-hidden group">
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#E50913]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  Pages Read Revenue
                </h3>
                <p className="text-gray-700 mb-4">
                  Get paid for every page read through ITAN Unbound subscription
                </p>
                <div className="w-full h-1 bg-gradient-to-r from-red-500/30 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Monetize;
