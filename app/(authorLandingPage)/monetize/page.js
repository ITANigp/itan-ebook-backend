import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import FadeIn from "@/components/FadeIn";

const Monetize = () => {
  return (
    <div className="bg-gray-50">
      <section className="flex flex-col items-center text-center  md:flex-row-reverse md:justify-end md:pt-44 bg-slate-700">
        <div className=" md:relative md:pb-14 md:w-[500px] text-white md:text-left md:ml-40 ">
          <h2
            className="text-2xl font-semibold"
            style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
          >
            Monetize with Itan <br /> Global Publishing (IGP)
          </h2>
          <p
            className="max-w-[300px] md:max-w-[480px] mx-4 text-sm md:mt-4 md:ml-0 mb-2"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            Itan Global Publishing provides free publishing and multiple royalty
            streams
          </p>

          <div className="flex justify-center mb-5 md:mb-0">
            <div className="flex md:hidden justify-center items-center rounded-sm bg-[#E50913] py-[8px] w-[150px] ml-3 space-x-1 text-white cursor-pointer">
              <p className="text-xs font-semibold md:font-normal md:text-sm">
                Get Started for Free
              </p>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="w-3 font-extralight md:w-6"
              />
            </div>
          </div>

          <div className="hidden absolute bottom-0 right-0 md:flex justify-center items-center rounded-sm bg-[#E50913] py-[8px] w-[150px] md:h-10 md:w-44 md:rounded-lg ml-3 md:ml-0 space-x-1 text-white cursor-pointer">
            <p className="text-xs font-semibold md:font-normal md:text-sm">
              Get Started for Free
            </p>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="w-3 font-extralight md:w-6"
            />
          </div>
        </div>

        <Image
          src="/images/monetize-hero.png"
          width={300}
          height={400}
          alt="monetize"
          className="md:w-[450px] -ml-7 md:ml-0"
        />
      </section>

      <section className="bg-gray-200 py-6 md:pb-24">
        <h3
          className="text-center font-semibold mb-2 md:text-2xl"
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
        >
          Maximize your Earnings Through Multiple Revenue Sources
        </h3>
        <ul className="mx-3 md:flex  md:flex-col md:items-center ">
          <li className="flex items-start">
            <svg
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[7px] h-[7px] fill-gray-600  mr-1 mt-[6px] "
            >
              <circle cx="7" cy="7" r="7" />
            </svg>

            <span className="text-sm md:text-xl">
              Earn up to 60% royalties on your Ebooks
            </span>
          </li>

          <li className="flex items-start">
            <svg
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[7px] h-[7px] fill-gray-600 mr-1 mt-[6px] "
            >
              <circle cx="7" cy="7" r="7" />
            </svg>

            <span className="text-sm md:text-xl">
              Earn up to 65% royalties on your Audiobooks
            </span>
          </li>
          <li className="flex items-start">
            <svg
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[7px] h-[7px] fill-gray-600 mr-1 mt-[6px] "
            >
              <circle cx="7" cy="7" r="7" />
            </svg>

            <span className="text-sm md:text-xl">
              Get paid for every page read on Itan Unbound
            </span>
          </li>
        </ul>
      </section>

      <section className=" flex flex-col items-center md:flex-row md:justify-center mt-5 py-6 space-y-5 md:space-y-0 bg-gray-100">
        <div className="flex flex-col justify-center items-center mx-10 w-[260px] md:w-[350px] bg-white shadow-md rounded-sm h-[150px] md:h-[200px]">
          <p className="mb-5 text-[16px] font-semibold md:text-[20px]">
            Royalty for eBook sale{" "}
          </p>
          <p className="text-red-600 text-4xl md:text-5xl font-bold">70%</p>
        </div>

        <div className="flex flex-col justify-center items-center mx-10 w-[260px] md:w-[350px] bg-white shadow-md rounded-sm h-[150px] md:h-[200px]">
          <p className="mb-5 text-[16px] md:text-[20px] font-semibold">
            Royalty for Audiobook sale
          </p>
          <p className="text-red-600 text-4xl  md:text-5xl font-bold">65%</p>
        </div>
      </section>

      <section className="mt-6 pb-7 mx-3">
        <div className="md:flex md:max-w-[1100px] justify-between">
          <div className="md:max-w-[500px] md:ml-8 md:pt-8">
            <h4 className="font-semibold mb-3 md:text-xl">
              Get Paid for Every Page you Read on ITAN Unbound
            </h4>
            <p className="text-sm md:text-base">
              With ITAN Unbound’s subscription program, your book reaches a
              wider audience of eager readers, expanding its reach beyond
              traditional sales.
            </p>
            <p className="mt-2 text-sm md:text-base">
              Your revenue share is based on the number of pages read by
              customers in the subscription program.
            </p>
          </div>
          <Image
            src="/images/woman.png"
            width={300}
            height={250}
            alt="read book"
            className=" mb-3 md:w-[400px]"
          />
        </div>
      </section>
    </div>
  );
};

export default Monetize;
