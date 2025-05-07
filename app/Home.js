"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import ScrollToTop from "@/components/ScrollToTop";

// export const metadata = {
//   title: "ITAN | Self-publish Books & Audiobooks",
//   description: "ITAN makes self-publishing simple and accessible.",
// };

const Home = () => {
  return (
    <div className="bg-gray-100 text-black font-sans container">
      <section className="flex flex-col items-center text-center">
        <h2
          className="text-3xl font-semibold"
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
        >
          Discover Global <br /> Publishing with ITAN
        </h2>
        <p
          className="max-w-[300px] mx-4 text-sm mt-4 mb-2"
          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        >
          Publish your manuscripts in multiple formats. Create ebooks and
          audiobooks to expand your reach and connect with new readers.
        </p>
        <div className="flex justify-center items-center rounded-sm bg-[#E50913] px-3 h-50 w-[100px] pt-[5px] pb-[6px] space-x-2 text-white ">
          <p className="text-[10px] font-semibold">Get Started</p>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-3 font-extralight"
          />
        </div>
      </section>
      <div className="flex justify-center px-2">
        <Image
          src="/images/book-show.png"
          alt="books show"
          width={450}
          height={350}
        />
      </div>
      <section className="relative bg-slate-200 shadow-md pt-6 pb-5 mx-4 rounded-md">
        <Image
          src="/images/global-map.png"
          width={70}
          height={100}
          className="absolute -left-1 top-2"
          alt="globe"
        />
        <p
          className="max-w-[300px] ml-12 text-center"
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
        >
          ITAN Makes Self-Publishing Simple, Allowing You To Release Books In
          Different Formats And Engage New Readers Worldwide.
        </p>
      </section>
      <div className=" bg-[#111928] mt-12 pt-6 pb-8">
        <div className="flex flex-col items-center">
          <Image
            src="/images/phone-book.png"
            width={300}
            height={450}
            className=" mb-5"
            alt="phone and books"
          />
        </div>
        <div className="text-gray-100 mx-3 max-w-[300px]">
          <h3 className="font-semibold">
            Let the world read and listen to your unique story
          </h3>
          <h4 className="text-sm my-3">Make your book the next bestseller</h4>
          <p className="text-xs pb-7">
            Publish in diverse formats to make your content easily accessible
            and enjoyable for all readers.
          </p>
        </div>
        <ul className="list-disc list-inside mx-3 text-gray-100">
          <li className="text-xs">
            <span className="text-base font-semibold">Ebook</span> <br />
            Upload your manuscript and distribute your eBook on ITAN.
          </li>
          <li className="text-xs">
            <span className="text-base font-semibold">Audio Books</span> <br />
            Publish your audiobooks and connect with readers in exciting ways.
          </li>
        </ul>
      </div>
      <section className="mt-10">
        <div className="py-10 bg-red-100 rounded-md px-6 mx-6">
          <h3 className="mb-2 font-bold text-sm text-gray-800">
            Earn More– Monetize your Works
          </h3>
          <div className="flex items-start mb-2">
            <Image
              src="/images/save-money.png"
              width={15}
              height={10}
              alt="earn money"
              className="pt-1 mr-1"
            />
            <div>
              <h4 className="font-semibold text-xs">
                Earn Up To 70% On Ebooks
              </h4>
              <p className="text-[10px]">
                Earn up to 70% royalty on all ebooks sold through ITAN
              </p>
            </div>
          </div>

          <div className="flex items-start mb-2">
            <Image
              src="/images/save-money.png"
              width={15}
              height={10}
              alt="earn money"
              className="pt-1 mr-1"
            />
            <div>
              <h4 className="font-semibold text-xs">
                Earn Up To 65% On Audiobooks
              </h4>
              <p className="text-[10px]">
                Earn up to 60% royalty on audiobooks and hardcover books sold
                through ITAN
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Image
              src="/images/save-money.png"
              width={15}
              height={10}
              alt="earn money"
              className="pt-1 mr-1"
            />
            <div>
              <h4 className="font-semibold text-xs">
                Royalty Payment Into Your Local Account
              </h4>
              <p className="text-[10px]">
                Control your earnings and get paid into any bank account of your
                choosing
              </p>
            </div>
          </div>
        </div>
        <div className="bg-red-100 flex justify-center rounded-md pt-10 mx-6 mt-4">
          <Image
            src="/images/earn-money.png"
            width={300}
            height={450}
            alt="earn money"
          />
        </div>
      </section>

      <section className="flex justify-center bg-[#111928] pr-4 my-10">
        <Image
          src="/images/itan-phone.png"
          width={160}
          height={300}
          alt="itan phone"
        />
        <div className="text-white pt-6">
          <h3 className="font-bold">
            Building global bridges through the power of storytelling.
          </h3>
          <p className="text-[10px] my-3">
            From text to audio, engage all audiences
          </p>
          <Image
            src="/images/congratulation-meg.png"
            width={150}
            height={100}
            alt="itan phone"
            className="ml-9"
          />
        </div>
      </section>

      <section className="pb-10">
        <h3
          className="text-center mb-2 font-bold"
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
        >
          Publish a variety of Genres
        </h3>
        <div
          className="grid grid-cols-3 gap-y-5"
          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        >
          <div className="flex flex-col items-center">
            <Image
              src="/images/lit-and-fiction.png"
              width={100}
              height={150}
              alt="itan phone"
              className=""
            />
            <p className="text-xs">Literature & Fiction </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/images/horror.png"
              width={100}
              height={150}
              alt="itan phone"
              className=""
            />
            <p className="text-xs">Horror </p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/teen-and-young.png"
              width={100}
              height={150}
              alt="itan phone"
              className=""
            />
            <p className="text-xs">Teen & Young Adult </p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/romance.png"
              width={100}
              height={150}
              alt="itan phone"
              className=""
            />
            <p className="text-xs">Romance </p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/mystery.png"
              width={100}
              height={150}
              alt="itan phone"
              className=""
            />
            <p className="text-xs">Mystery </p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/comics.png"
              width={100}
              height={150}
              alt="itan phone"
              className=""
            />
            <p className="text-xs">Comics </p>
          </div>
        </div>
      </section>

      <div className="mx-4 flex justify-center">
        <Image
          src="/images/analysis.png"
          width={350}
          height={150}
          alt="analysis"
          className=""
        />
      </div>
      <div className="mt-8 mx-3 pb-10">
        <h3
          className="font-bold text-xl"
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
        >
          Publish, monitor sales, and manage your earnings
        </h3>
        <p className="text-sm my-2">
          Own your publishing process with ITAN—customize your book content,
          look, and price.
        </p>
        <ul className="list-disc list-inside text-xs">
          <li>Publish as many titles as you desire.</li>
          <li>
            Maintain full control and ownership ofyour content, publish at your
            convenience and set your pricing.
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center items-center rounded-sm bg-[#E50913] px-3 h-50 pt-[5px] pb-[6px] space-x-2 text-white ">
          <p className="text-[10px] font-semibold">Get Started</p>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-3 font-extralight"
          />
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};
export default Home;