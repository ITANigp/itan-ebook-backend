"use client";
import { useState } from "react";
import dynamic from "next/dynamic"; 
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import AccordionFaq from "@/components/AccordionFaq";
import IgpModal from "@/components/IgpModal";
import FormatEbook from "@/components/FormatEbook";
import CreateEbook from "@/components/CreateEbook";
import React from "react";
import Link from "next/link";

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
    <section className="md:pt-32 bg-gray-50 w-full">
      <div className="md:flex md:justify-center">
        <div className="md:flex md:flex-row md:justify-between md:w-[1100px]">
          <div className="flex flex-col  items-center md:items-start text-center md:text-left md:ml-4 md:mt-10">
            <h2
              className="text-2xl md:text-3xl font-semibold md:ml-4"
              style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
            >
              Get Full Support from IGP
            </h2>
            <p
              className="max-w-[300px] md:max-w-[500px] mx-4 text-sm md:text-base mt-3 mb-2"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              Find all the help you need with formatting your book, navigate to
              our publishing steps below and Frequently Asked Questions (FAQs)
            </p>
            <div className="flex justify-center md:ml-4 items-center rounded-sm bg-[#E50913] px-2 h-50 w-[100px] pt-[5px] pb-[6px] space-x-2 text-white ">
              <a
                href="mailto:oluola96@gmail.com"
                className="text-[10px] md:text-sm font-semibold"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="flex justify-center my-5 mx-2">
            <Image
              src="/images/help-hero.png"
              width={300}
              height={200}
              alt="get help"
              className="md:w-[450px]"
            />
          </div>
        </div>
      </div>

      <article className="w-full mt-24 mx-2 md:flex md:justify-center ">
        <div className="md:w-[900px]">
          <div className="w-full flex justify-between items-center">
            <div className="w-full">
              <h3 className="text-sm md:text-base font-semibold  text-gray-800">
                What is IGP
              </h3>
              <p className="text-xs md:text-base  text-gray-600 mb-2">
                Know all about IGP Service
              </p>
              <button
                onClick={() => openModal("igp")}
                className="text-[#EF5353] text-sm md:text-base font-medium cursor-pointer"
              >
                Learn More
              </button>
            </div>

            <Image
              src="/images/right-arrow.png"
              alt="Next Step"
              width={15}
              height={10}
              className="mr-6"
            />

            <div className="w-full relative">
              <div className="w-full mb-3 absolute -top-10 left-0">
                <h3 className="text-sm font-semibold text-gray-800 md:text-lg">
                  New Author? Follow these steps
                </h3>
              </div>
              <h3 className="text-sm md:text-base font-semibold text-gray-800">
                Format Your Book
              </h3>
              <p className="text-xs md:text-base text-gray-600">
                Format your manuscript and cover to create your book
              </p>
              <button
                onClick={() => openModal("format")}
                className="text-[#EF5353] text-sm md:text-base font-medium cursor-pointer"
              >
                Learn More
              </button>
            </div>

            <Image
              src="/images/right-arrow.png"
              alt="Next step"
              width={15}
              height={10}
              className="mr-5"
            />

            <div className="w-full">
              <h3 className="text-sm md:text-base font-semibold ">
                Create Your Book
              </h3>
              <p className="text-xs md:text-base text-gray-600">
                Follow our publishing process one step at a time.
              </p>
              <button
                onClick={() => openModal("createEbook")}
                className="text-[#EF5353] text-sm md:text-base font-medium cursor-pointer"
              >
                Learn More
              </button>
            </div>
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
