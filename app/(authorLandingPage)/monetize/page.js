import React from "react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const Monetize = () => {
  return (
    <div className="bg-gray-50">
      <section className="flex flex-col items-center text-center pb-3">
        <h2
          className="text-2xl font-semibold"
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
        >
          Monetize with Itan <br /> Global Publishing (IGP)
        </h2>
        <p
          className="max-w-[300px] mx-4 text-sm mt-4 mb-2"
          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        >
          Itan Global Publishing provides free publishing and multiple royalty
          streams
        </p>

        <Image
          src="/images/monetize-hero.png"
          width={300}
          height={400}
          alt="monetize"
        />
      </section>

      <section className="bg-gray-200 py-6">
        <h3
          className="text-center font-semibold mb-2"
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
        >
          Maximize your Earnings Through Multiple Revenue Sources
        </h3>
        <ul className="mx-3">
          <li className="flex items-start">
            <svg
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[7px] h-[7px] fill-gray-600  mr-1 mt-[6px] "
            >
              <circle cx="7" cy="7" r="7" />
            </svg>

            <span className="text-sm">
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

            <span className="text-sm">
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

            <span className="text-sm">
              Get paid for every page read on Itan Unbound
            </span>
          </li>
        </ul>
      </section>

      <section className=" flex flex-col items-center mt-5 py-6 space-y-5 bg-gray-100">
        <div className="flex flex-col justify-center items-center mx-10 w-[260px] bg-white shadow-md rounded-sm h-[150px]">
          <p className="mb-5 text-[16px] font-semibold">
            Royalty for eBook sale{" "}
          </p>
          <p className="text-red-600 text-4xl font-bold">70%</p>
        </div>

        <div className="flex flex-col justify-center items-center mx-10 w-[260px] bg-white shadow-md rounded-sm h-[150px]">
          <p className="mb-5 text-[16px] font-semibold">
            Royalty for Audiobook sale
          </p>
          <p className="text-red-600 text-4xl font-bold">65%</p>
        </div>
      </section>

      <section className="mt-6 pb-7 mx-3">
        <h4 className="font-semibold mb-3">
          Get Paid for Every Page you Read on ITAN Unbound
        </h4>
        <Image
          src="/images/woman.png"
          width={300}
          height={250}
          alt="read book"
          className=" mb-3"
        />
        <p className="text-sm">
          With ITAN Unbound’s subscription program, your book reaches a wider
          audience of eager readers, expanding its reach beyond traditional
          sales.
        </p>
        <p className="mt-2 text-sm">
          Your revenue share is based on the number of pages read by customers
          in the subscription program.
        </p>
      </section>
    </div>
  );
};

export default Monetize;
