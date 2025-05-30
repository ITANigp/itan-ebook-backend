"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import AccordionFaq from "@/components/AccordionFaq";
import IgpModal from "@/components/IgpModal";
import FormatEbook from "@/components/FormatEbook";
import CreateEbook from "@/components/CreateEbook";
import Image from "next/image";
import React from "react";

// Import with SSR disabled to prevent document not found errors
const ModalPortal = dynamic(() => import("@/components/ModalPortal"), {
  ssr: false,
});

const Help = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="mb-10">
      <div className="mt-24 md:mt-28 md:flex md:justify-center overflow-hidden relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-70 -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400/20 to-transparent"></div>

        <div className="md:flex md:flex-row md:justify-between md:w-[1100px] px-4 md:px-6 py-4 md:py-8 rounded-lg">
          {/* Left content column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:ml-4 md:mt-6">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold md:ml-4 tracking-tight"
              style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
            >
              Get Full Support from <span className="">IGP</span>
            </h2>

            <p
              className="max-w-[300px] md:max-w-[500px] mx-4 text-sm md:text-base lg:text-lg mt-4 mb-6 text-gray-700 leading-relaxed"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              Find all the help you need with formatting your book, navigate to
              our publishing steps below and Frequently Asked Questions (FAQs)
            </p>

            <div className="md:ml-4 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <a
                href="mailto:support@itan.app"
                target="_blank"
                className="flex items-center justify-center bg-[#E50913] hover:bg-[#c20810] transition-colors duration-300 text-white font-semibold rounded py-2.5 px-5 min-w-[120px] text-xs md:text-sm"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right image column */}
          <div className="flex justify-center my-8 md:my-0 mx-2">
            <div className="relative transform transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute -inset-1 bg-gradient-to-tr from-red-200/20 to-gray-100/5 rounded-xl blur-sm opacity-70 -z-10"></div>
              <Image
                src="/images/help-hero.png"
                width={300}
                height={200}
                alt="get help"
                className="w-[280px] sm:w-[320px] md:w-[450px] h-auto drop-shadow-sm hover:drop-shadow-md transition-all duration-300 rounded-sm"
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>

      <article className="w-full px-4 xs:px-5 medium:px-6 large:px-8 xl:max-w-7xl xl:mx-auto">
        <div className="rounded-lg overflow-hidden bg-gray-200 bg-opacity-30 shadow-sm p-6 xs:p-7 medium:p-8 large:p-10 xl:p-12">
          <h3 className="text-xl xs:text-2xl medium:text-3xl large:text-4xl xl:text-5xl font-semibold text-center large:text-left xl:text-left mb-6 medium:mb-8 large:mb-10">
            Are you <span className="">New?</span>{" "}
            <span className="block xs:inline mt-2 xs:mt-0">
              Here are a few steps to get you started:
            </span>
          </h3>

          <div className="flex flex-col large:flex-row xl:flex-row items-center large:items-start xl:items-start justify-between gap-8 medium:gap-6">
            {/* Step 1 Card */}
            <div className="w-full large:w-1/3 xl:w-1/3 bg-white rounded-lg p-5 xs:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
              <h3 className="text-lg xs:text-xl medium:text-2xl large:text-2xl xl:text-2xl font-semibold mb-3 text-gray-800">
                What is IGP
              </h3>
              <p className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-lg text-gray-600 mb-4 flex-grow">
                Know all about IGP service and how it can help you publish your
                book.
              </p>
              <button
                onClick={() => openModal("igp")}
                className="inline-flex items-center text-[#1E8ABF] font-medium hover:text-[#44c6d7] transition-colors duration-200"
              >
                <span>Learn More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Arrow for desktop only - IMPROVED */}
            <div className="hidden large:flex xl:flex items-center justify-center large:w-16 xl:w-20 mx-0 large:mx-2 xl:mx-3">
              <div className="relative large:w-14 xl:w-16 large:h-10 xl:h-12 group">
                <Image
                  src="/images/right-arrow.png"
                  alt="Next step"
                  fill
                  sizes="(min-width: 900px) 56px, (min-width: 1280px) 64px"
                  className="object-contain transition-all duration-300 group-hover:scale-110"
                  priority={true}
                  quality={90}
                />
                {/* Decorative pulse circle */}
                <div className="absolute -inset-1 bg-pink-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="w-full large:w-1/3 xl:w-1/3 bg-white rounded-lg p-5 xs:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
              <h3 className="text-lg xs:text-xl medium:text-2xl large:text-2xl xl:text-2xl font-semibold mb-3 text-gray-800">
                Format Your Book
              </h3>
              <p className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-lg text-gray-600 mb-4 flex-grow">
                Format your manuscript and cover to create your book following
                our guidelines.
              </p>
              <button
                onClick={() => openModal("format")}
                className="inline-flex items-center text-[#1E8ABF] font-medium hover:text-[#44c6d7] transition-colors duration-200"
              >
                <span>Learn More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Arrow for desktop only - IMPROVED */}
            <div className="hidden large:flex xl:flex items-center justify-center large:w-16 xl:w-20 mx-0 large:mx-2 xl:mx-3">
              <div className="relative large:w-14 xl:w-16 large:h-10 xl:h-12 group">
                <Image
                  src="/images/right-arrow.png"
                  alt="Next step"
                  fill
                  sizes="(min-width: 900px) 56px, (min-width: 1280px) 64px"
                  className="object-contain transition-all duration-300 group-hover:scale-110"
                  priority={true}
                  quality={90}
                />
                {/* Decorative pulse circle */}
                <div className="absolute -inset-1 bg-pink-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="w-full large:w-1/3 xl:w-1/3 bg-white rounded-lg p-5 xs:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
              <h3 className="text-lg xs:text-xl medium:text-2xl large:text-2xl xl:text-2xl font-semibold mb-3 text-gray-800">
                Create Your Book
              </h3>
              <p className="text-sm xs:text-base medium:text-lg large:text-lg xl:text-lg text-gray-600 mb-4 flex-grow">
                Follow our step-by-step guide to publish your book with
                confidence.
              </p>
              <button
                onClick={() => openModal("createEbook")}
                className="inline-flex items-center text-[#1E8ABF] font-medium hover:text-[#44c6d7] transition-colors duration-200"
              >
                <span>Learn More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile-only arrows/step indicators */}
          <div className="flex large:hidden xl:hidden justify-center mt-4 space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#EF5353]"></div>
            <div className="w-2 h-2 rounded-full bg-[#EF5353] opacity-70"></div>
            <div className="w-2 h-2 rounded-full bg-[#EF5353] opacity-40"></div>
          </div>
        </div>
      </article>

      <AccordionFaq />

      {/* Use the new modal component */}
      <ModalPortal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent === "igp" && <IgpModal />}
        {modalContent === "format" && <FormatEbook />}
        {modalContent === "createEbook" && <CreateEbook />}
      </ModalPortal>
    </section>
  );
};

export default Help;
