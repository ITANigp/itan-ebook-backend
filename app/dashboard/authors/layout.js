"use client";

import { useRef } from "react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import { signOutAuthor } from "@/utils/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {

  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

   const handleSignOut = async () => {
     try {
       await signOutAuthor();
       alert("Logged out successfully!");
       // You can also redirect the user to the login page after logout
       window.location.href = "/"; // Adjust the URL as needed
     } catch (error) {
       alert("Failed to log out. Please try again.");
     }
   };

  return (
        <>
          <div className="flex items-center justify-between fixed top-0 left-0 w-full  py-2 shadow-md z-10 bg-white">
            <div></div>
            <div className="flex space-x-8 mr-8">
              <div
                className="flex items-center bg-[#F1F1F1] px-3 py-2 rounded-md cursor-pointer h-12"
                onClick={handleFocus}
              >
                <img
                  src="/images/search.png"
                  alt="Search Icon"
                  className="w-7 cursor-pointer"
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search"
                  className="outline-none border-none focus:ring-0 bg-[#F1F1F1] ml-2 w-full"
                />
              </div>

              <img src="/images/picture.png" className="w-12" />
            </div>
          </div>
          <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-4 py-4 overflow-y-auto bg-gray-900 dark:bg-gray-800">
              <Link href="/">
                <img src="/images/logo.png" className="w-16 mb-6 ml-3" />
              </Link>
              <ul className="space-y-2 font-medium">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-[#C5C5C5] rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <img src="/images/chart-pie.png" className="w-7" />
                    <span className="ml-2 text-[#E50913]">Overview</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard/authors/4b0f4db7-aebf-4ba2-b5a8-10eb6ff93832/books/create/book-details"
                    className="flex items-center p-2 text-[#C5C5C5] rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <img src="/images/upload_icon.png" className="w-7" />
                    <span className="ml-2 text-[#C5C5C5]">Make an Upload</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <img src="/images/clipboard.png" className="w-7" />
                    <span className="ml-2 text-[#C5C5C5]">Book Shelf</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <img src="/images/cart.png" className="w-7" />
                    <span className="ml-2 text-[#C5C5C5]">Sales</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <img src="/images/help.png" className="w-7" />
                    <span className="ml-2 text-[#C5C5C5]">Help</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <img src="/images/profile.png " className="w-7" />
                    <span className="ml-2 text-[#C5C5C5]">Profile</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <img src="/images/logout.png " className="w-7" />
                    <span
                      className="ml-2 text-[#C5C5C5]"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          {children}
        </>
  );
}
