"use client";

import React from "react";
import { usePathname } from "next/navigation";

const layout = ({ children }) => {
  const pathname = usePathname();
  const isPage1 = pathname.endsWith("/books/create/book-details");
  const isPage2 = pathname.endsWith("/books/create/book-content");
  const isPage3 = pathname.endsWith("/books/create/book-pricing");
  return (
    <div className="mx-2  md:ml-72 sm:mr-8  sm:mt-24">
      <h3 className="font-semibold text-lg mb-3">Add an Ebook</h3>

      <div className="sm:hidden relative">
        <p className="text-[#B6B6B6] w-full overflow-hidden">
          ----------------------------------------------------------------
        </p>
        <div className="flex justify-between w-72 absolute bottom-0">
          <p
            className={`h-6 w-6 rounded-full ${isPage2 || isPage3 ? "bg-[#E50913]" : "bg-[#B6B6B6]"} text-white flex items-center justify-center`}
          >
            1
          </p>
          <p className={`h-6 w-6 rounded-full ${isPage3 ? "bg-[#E50913]" : "bg-[#B6B6B6]"} text-white flex items-center justify-center`}>
            2
          </p>
          <p className="h-6 w-6 rounded-full bg-[#B6B6B6] text-white flex items-center justify-center">
            3
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="hidden sm:flex w-[800px] justify-between">
          <div
            className={`flex justify-between items-center h-16 w-56 pr-2 rounded-md ${isPage1 ? "shadow-lg bg-white" : ""} ${isPage2 || isPage3 ? "bg-gray-200" : ""}`}
          >
            <p
              className={`flex-1 text-center text-lg ${isPage1 ? "font-bold" : ""}`}
            >
              Book Details
            </p>
            <img
              src="/icons/check-mark.png"
              className={`w-5 h-5 ${isPage1 ? "hidden" : ""}`}
            />
          </div>
          <div
            className={`ml-2 flex justify-between items-center h-16 w-56 pr-2 rounded-md ${isPage2 ? "shadow-lg bg-white" : "bg-gray-200"}`}
          >
            <p
              className={`flex-1 text-center text-lg ${isPage2 ? "font-bold" : ""}`}
            >
              Book Content
            </p>
            <img
              src="/icons/check-mark.png"
              className={`w-5 h-5 ${isPage1 || isPage2 ? "hidden" : ""}`}
            />
          </div>
          <div
            className={`ml-2 flex justify-between items-center h-16 w-56 pr-2 rounded-md ${isPage3 ? "shadow-lg bg-white" : "bg-gray-200"}`}
          >
            <p
              className={`flex-1 text-center text-lg ${isPage3 ? "font-bold" : ""}`}
            >
              Book Pricing
            </p>
            {/* <img src="/icons/check-mark.png" className="w-5 h-5" /> */}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
