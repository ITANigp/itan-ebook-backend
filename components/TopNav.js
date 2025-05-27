"use client";
import React, { useState, useEffect } from "react";
import LandingPgBtn from "./LandingPgBtn";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faFacebookF,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { usePathname } from "next/navigation";
import {
  faBars,
  faTimes,
  faInfoCircle,
  faBookOpen,
  faDollarSign,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";

library.add(
  faBars,
  faTimes,
  faInfoCircle,
  faBookOpen,
  faDollarSign,
  faQuestionCircle
);

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

const TopNav = ({ styles }) => {
  const [menu, setMenu] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  const toggleMenu = () => {
    if (!menu) {
      setMenu(true);
      setTimeout(() => setShowCloseIcon(true), 150);
    } else {
      setShowCloseIcon(false);
      setTimeout(() => setMenu(false), 50);
    }
  };

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menu]);

  const menuItems = [
    { title: "About Itan", href: "/", icon: faInfoCircle },
    { title: "Publish", href: "/publish", icon: faBookOpen },
    { title: "Monetize", href: "/monetize", icon: faDollarSign },
    { title: "Help", href: "/help", icon: faQuestionCircle },
  ];

  const pathname = usePathname();
  const homePath = pathname.endsWith("/");
  const publishPath = pathname.endsWith("/publish");
  const monetizePath = pathname.endsWith("/monetize");
  const helpPath = pathname.endsWith("/help");

  return (
    <div
      className={` ${styles} h-16 md:h-auto w-full bg-[#111928] items-center pt-[10px] md:px-5 md:pt-3`}
    >
      <div className="flex items-center">
        <div className="flex w-full md:justify-between">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              className="block md:hidden z-30 px-2"
              onClick={toggleMenu}
              aria-label={menu ? "Close menu" : "Open menu"}
            >
              <FontAwesomeIcon
                icon={showCloseIcon ? faTimes : faBars}
                style={{ color: "#FFFFFF" }}
                className="text-[21px] ml-2 md:hidden"
              />
            </button>
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={50}
                height={12}
                alt="itan logo"
                className="w-10 ml-4 hidden sm:block md:hidden"
              />
            </Link>
          </div>

          {/* Logo and Text - pushed to right on mobile */}
          <div className="flex items-center ml-auto md:ml-0 pb-3">
            <div className="hidden md:flex items-center">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  width={50}
                  height={12}
                  alt="itan logo"
                  className="md:w-12 md:ml-3 lg:-mb-3"
                />
              </Link>
              <p
                className={`${bricolage.className} hidden sm:flex text-gray-200 text-lg md:text-xl ml-1 lg:-mb-3 font-medium`}
              >
                Global Publishing
              </p>
            </div>
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={50}
                height={12}
                alt="itan logo"
                className="w-10 pt-4 -mt-1 mr-4 sm:hidden"
              />
            </Link>
          </div>

          {/* Slide Menu */}
          <AnimatePresence>
            {menu && (
              <>
                <div className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-gray-900 shadow-xl z-30 flex flex-col py-20 px-6">
                  <button
                    className="absolute top-4 right-4 text-gray-200 p-2"
                    onClick={toggleMenu}
                    aria-label="Close menu"
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-2xl hover:text-red-400 transition-colors"
                    />
                  </button>

                  <div className="mb-8">
                    <Image
                      src="/images/logo.png"
                      alt="logo"
                      width={40}
                      height={32}
                      priority={true}
                      className="w-16 h-auto -mt-[60px] -ml-2"
                    />
                  </div>

                  <nav className="flex flex-col space-y-6">
                    {menuItems.map((item, index) => (
                      <div key={index}>
                        <Link
                          href={item.href}
                          className="text-gray-200 text-xl font-medium hover:text-red-400 transition-colors flex items-center gap-3"
                          onClick={toggleMenu}
                        >
                          {item.title}
                        </Link>
                      </div>
                    ))}
                  </nav>

                  <div className="my-10 space-y-4">
                    <Link href="/author/sign_in">
                      <LandingPgBtn
                        variant="outlined"
                        className="w-full mb-2 py-3 text-base font-medium transition-all duration-300 hover:bg-opacity-10 hover:bg-white active:scale-98"
                        onClick={toggleMenu}
                      >
                        Sign In
                      </LandingPgBtn>
                    </Link>

                    <Link href="/author/sign_up">
                      <LandingPgBtn
                        variant="filled"
                        className="w-full py-3 text-base font-medium transition-all duration-300 hover:bg-red-600 active:scale-98"
                        onClick={toggleMenu}
                      >
                        Create Account
                      </LandingPgBtn>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start sm:ml-9 w-full text-white">
                    <div className="flex space-x-2">
                      <Link href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className="w-[15px] h-5 p-2 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] transition-colors"
                        />
                      </Link>
                      <Link
                        href="https://x.com/ItanGlobal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faXTwitter}
                          className="w-[15px] h-5 p-2 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] transition-colors"
                        />
                      </Link>
                      <Link
                        href="https://web.facebook.com/itanglobalpublishing/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faFacebookF}
                          className="w-[15px] h-5 p-2 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] transition-colors"
                        />
                      </Link>
                      <Link
                        href="https://www.instagram.com/itanglobalpublishing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className="w-[15px] h-3 p-2 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] hover:scale-110 transition-all duration-300"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="w-[320px] lg:w-[280px] hidden sm:flex justify-between mr-3 md:mr-3 py-3">
          <Link
            href="/author/sign_in"
            className="ml-6 bg-[#0c1320] text-white px-5 py-2 rounded-md border border-gray-600 hover:border-red-500 transition-colors text-sm font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/author/sign_up"
            className="bg-[#E50913] text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Horizontal divider line */}
      <div className="hidden md:block w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-2 mb-1"></div>

      <div className="hidden md:flex justify-between text-gray-200 -ml-7 mt-2">
        <ul className="flex space-x-6 h-9 text-center px-9">
          <Link
            href="/"
            className={`${homePath ? "border-b-2 border-b-red-600 text-red-400" : ""} hover:border-b-2 hover:border-b-red-600 hover:text-red-400 cursor-pointer px-3 py-1 transition-all duration-200 text-sm font-medium`}
          >
            About Itan
          </Link>
          <Link
            href="/publish"
            className={`${publishPath ? "border-b-2 border-b-red-600 text-red-400" : ""} hover:border-b-2 hover:border-b-red-600 hover:text-red-400 cursor-pointer px-3 py-1 transition-all duration-200 text-sm font-medium`}
          >
            Publish
          </Link>
          <Link
            href="/monetize"
            className={`${monetizePath ? "border-b-2 border-b-red-600 text-red-400" : ""} hover:border-b-2 hover:border-b-red-600 hover:text-red-400 cursor-pointer px-3 py-1 transition-all duration-200 text-sm font-medium`}
          >
            Monetize
          </Link>
          <Link
            href="/help"
            className={`${helpPath ? "border-b-2 border-b-red-600 text-red-400" : ""} hover:border-b-2 hover:border-b-red-600 hover:text-red-400 cursor-pointer px-3 py-1 transition-all duration-200 text-sm font-medium`}
          >
            Help
          </Link>
        </ul>
        {/* <div className="whitespace-nowrap -mr-4 w-72 flex items-center">
          <p className="text-xs text-gray-400 font-light">
            One Book, Multiple Formats, Endless Readers
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default TopNav;
