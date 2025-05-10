"use client";
import React, { useState, useEffect } from "react";
import LandingPgBtn from "./LandingPgBtn";
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
  // ONLY ONE TopNav

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

  return (
    <div className="bg-slate-700 flex items-center fixed w-full top-0 left-0 z-50 h-16">
      {/* Mobile Menu Button */}
      <button
        className="block medium:hidden z-30 px-2"
        onClick={toggleMenu}
        aria-label={menu ? "Close menu" : "Open menu"}
      >
        <FontAwesomeIcon
          icon={showCloseIcon ? faTimes : faBars}
          style={{ color: "#FFFFFF" }}
          className="text-[21px] ml-2"
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
            className="lg:w-24 lg:-mb-3"
          />
        </Link>
        <p
          className={`${bricolage.className} text-white text-xl font-semibold -ml-2 leading-relaxed`}
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
                className="absolute top-4 right-4 text-white p-2"
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
                      className="text-white text-xl font-medium hover:text-red-400 transition-colors flex items-center gap-3"
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
  );
};

export default TopNav;
