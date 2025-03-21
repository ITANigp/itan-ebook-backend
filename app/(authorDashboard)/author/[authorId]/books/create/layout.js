"use client";

import React from "react";
import { usePathname } from "next/navigation";

const layout = ({ children }) => {
  const pathname = usePathname();
  const isPage1 = pathname.endsWith("/books/create/book-details");
  const isPage2 = pathname.endsWith("/books/create/book-content");
  const isPage3 = pathname.endsWith("/books/create/book-pricing");
  return (
    <div className="ml-72 mr-8  mt-24 ">
      <h3>Add Ebook</h3>

      <div className="w-full">
        <div className="flex w-[800px] justify-between">
          <div
            className={`flex justify-between items-center h-16 w-56 pr-2 rounded-md ${isPage1 ? "shadow-lg bg-white" : ""} ${isPage2 || isPage3 ? "bg-gray-200" : ""}`}
          >
            <p
              className={`flex-1 text-center text-lg ${isPage1 ? "font-bold" : ""}`}
            >
              Book Details
            </p>
                <img src="/icons/check-mark.png" className={`w-5 h-5 ${isPage1 ? "hidden" : ""}`} />
          </div>
          <div className="ml-2 flex justify-between items-center bg-gray-200 h-16 w-56 pr-2 rounded-md">
            <p className="flex-1 text-center text-lg">Book Content</p>
            <img src="/icons/check-mark.png" className="w-5 h-5" />
          </div>
          <div className="ml-2 flex justify-between items-center bg-gray-200 h-16 w-56 pr-2 rounded-md">
            <p className="flex-1 text-center text-lg">Book Pricing</p>
            <img src="/icons/check-mark.png" className="w-5 h-5" />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
