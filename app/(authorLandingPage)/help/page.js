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
    <section className="container">
      <section className="flex flex-col items-center text-center">
        <h2
          className="text-2xl font-semibold"
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
        >
          Get Full Support from IGP
        </h2>
        <p
          className="max-w-[300px] mx-4 text-sm mt-3 mb-2"
          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        >
          Find all the help you need with formatting your book, navigate to our
          publishing steps below and Frequently Asked Questions (FAQs)
        </p>
        <div className="flex justify-center items-center rounded-sm bg-[#E50913] px-2 h-50 w-[100px] pt-[5px] pb-[6px] space-x-2 text-white ">
          <a href="mailto:oluola96@gmail.com"
             className="text-[10px] font-semibold">Contact Us</a>
        </div>
      </section>

      <div className="flex justify-center my-5 mx-2">
        <Image
          src="/images/help-hero.png"
          width={300}
          height={200}
          alt="get help"
        />
      </div>

      <article className="w-full mt-10 mx-2">
        <h3 className="text-sm font-semibold text-center  mb-6">
          New Author? Follow These Steps
        </h3>

        <div className="w-full flex justify-between mb-3">
          <h3 className="text-sm font-semibold  text-gray-800">What is IGP</h3>
          <h3 className="text-sm font-semibold text-gray-800">
            Format Your Book
          </h3>
          <h3 className="text-sm font-semibold text-gray-800">
            Create Your Book
          </h3>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="w-full">
            <p className="text-xs  text-gray-600 mb-2">
              Know all about IGP Service
            </p>
            <button
              onClick={() => openModal("igp")}
              className="text-[#EF5353] text-sm font-medium cursor-pointer"
            >
              Learn More
            </button>
          </div>

          <Image
            src="/images/right-arrow.png"
            alt="Next step"
            width={15}
            height={10}
            className="mr-2"
          />

          <div className="w-full">
            <p className="text-xs  text-gray-600">
              Format your manuscript and cover to create your book
            </p>
            <button
              onClick={() => openModal("format")}
              className="text-[#EF5353] text-sm font-medium cursor-pointer"
            >
              Learn More
            </button>
          </div>

          <Image
            src="/images/right-arrow.png"
            alt="Next step"
            width={15}
            height={10}
            className="mr-2"
          />

          <div className="w-full">
            <p className="text-xs  text-gray-600">
              Follow our publishing process one step at a time.
            </p>
            <button
              onClick={() => openModal("createEbook")}
              className="text-[#EF5353] text-sm font-medium cursor-pointer"
            >
              Learn More
            </button>
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
