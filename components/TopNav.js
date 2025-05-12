"use client";
import React, { useState, useEffect } from "react";
import LandingPgBtn from "./LandingPgBtn";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const pathname = usePathname()
  const homePath = pathname.endsWith("/")
  const publishPath = pathname.endsWith("/publish")
  const monetizePath = pathname.endsWith("/monetize")
  const helpPath = pathname.endsWith("/help")

  return (
    <div
      className={` ${styles} top-0 left-0 z-50 h-16 md:h-auto fixed w-full bg-[#111928] md:px-5`}
    >
      <div className="flex items-center ">
        <div className="flex w-full md:justify-between pr-5">
          {/* Mobile Menu Button */}
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

          {/* Logo and Text */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/images/logo3.png"
                width={70}
                height={20}
                alt="itan logo"
                className=" md:w-24 md:-mb-1 lg:-mb-3"
              />
            </Link>
            <p
              className={`${bricolage.className} text-gray-200 text-2xl  md:text-[35px] font-semibold -ml-2 md:-ml-3  lg:-mb-3 `}
            >
              Global Publishing
            </p>
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
                      src="/images/logo.svg"
                      alt="logo"
                      width={40}
                      height={32}
                      priority={true}
                      quality={85}
                      className="w-10 h-8"
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
                          <FontAwesomeIcon
                            icon={item.icon}
                            className="text-red-400 w-5 h-5"
                          />
                          {item.title}
                        </Link>
                      </div>
                    ))}
                  </nav>

                  <div className="mt-auto space-y-4">
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
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="w-[280px] hidden sm:flex justify-between mr-3 md:mr-10">
          <div>
            {" "}
            <Link
              href="/author/sign_in"
              className="bg-[#0c1320] text-gray-200 px-6 py-1 w-24 pb-2 border border-red-600 border-b-gray-400 rounded-md"
            >
              Sign In
            </Link>
          </div>
          <div>
            <Link
              href="/author/sign_in"
              className="bg-[#E50913] text-gray-200 px-6 py-1 w-24 pb-2 border border-red-600 border-b-gray-400 rounded-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className=" hidden md:flex justify-between text-gray-200 -ml-6">
        <ul className="flex space-x-4 h-9 text-center px-9">
          <Link
            href="/"
            className={` ${homePath ? "border-b-2 border-b-red-600" : ""} hover:border-b-2 hover:border-b-red-600 cursor-pointer px-2`}
          >
            About Itan
          </Link>
          <Link
            href="/publish"
            className={` ${publishPath ? "border-b-2 border-b-red-600" : ""} hover:border-b-2 hover:border-b-red-600 cursor-pointer px-2`}
          >
            Publish
          </Link>
          <Link
            href="/monetize"
            className={` ${monetizePath ? "border-b-2 border-b-red-600" : ""} hover:border-b-2 hover:border-b-red-600 cursor-pointer px-2`}
          >
            Monetize
          </Link>
          <Link
            href="/help"
            className={` ${helpPath ? "border-b-2 border-b-red-600" : ""} hover:border-b-2 hover:border-b-red-600 cursor-pointer px-2`}
          >
            Help
          </Link>
        </ul>
        <p className="text-xs mr-7">
          One Book Multiple Formats, Endless Readers
        </p>
      </div>
    </div>
  );
};

export default TopNav;
