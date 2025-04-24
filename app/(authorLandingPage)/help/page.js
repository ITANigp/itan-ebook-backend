"use client";
import { useState } from "react";
import dynamic from "next/dynamic"; 
import HeroSection from "@/components/HeroSection";
import AccordionFaq from "@/components/AccordionFaq";
import IgpModal from "@/components/IgpModal";
import FormatEbook from "@/components/FormatEbook";
import CreateEbook from "@/components/CreateEbook";
import Image from "next/image";
import React from "react";

// Import with SSR disabled to prevent document not found errors
const ModalPortal = dynamic(() => import('@/components/ModalPortal'), { 
  ssr: false 
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
    <section className="">
      <HeroSection />

      <article className="w-full mt-10 px-4 xs:px-5 medium:px-6 large:px-8 xl:max-w-7xl xl:mx-auto">
        <div className="rounded-lg overflow-hidden shadow-sm p-6 xs:p-7 medium:p-8 large:p-10 xl:p-12">
          <h3 className="text-xl xs:text-2xl medium:text-3xl large:text-4xl xl:text-5xl font-semibold text-center large:text-left xl:text-left mb-6 medium:mb-8 large:mb-10">
            Are you <span className="text-[#EF5353]">New?</span>{" "}
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
                className="inline-flex items-center text-[#EF5353] font-medium hover:text-[#D64141] transition-colors duration-200"
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
                className="inline-flex items-center text-[#EF5353] font-medium hover:text-[#D64141] transition-colors duration-200"
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
                className="inline-flex items-center text-[#EF5353] font-medium hover:text-[#D64141] transition-colors duration-200"
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
