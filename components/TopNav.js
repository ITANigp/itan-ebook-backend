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

library.add(
  faBars,
  faTimes,
  faInfoCircle,
  faBookOpen,
  faDollarSign,
  faQuestionCircle
);

const TopNav = ({ styles }) => {
  const [menu, setMenu] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  // Updated toggle function with better icon transition
  const toggleMenu = () => {
    if (!menu) {
      setMenu(true);
      // Delay changing the icon until menu is partially visible
      setTimeout(() => setShowCloseIcon(true), 150);
    } else {
      setShowCloseIcon(false);
      // Delay closing the menu until icon has started changing
      setTimeout(() => setMenu(false), 50);
    }
  };

  // Lock scrolling when menu is open
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

  // Menu animation variants
  const menuVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.2, 0.0, 0.0, 1.0],
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  // Menu item animation variants
  const itemVariants = {
    closed: {
      x: -20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const menuItems = [
    { title: "About Itan", href: "/", icon: faInfoCircle },
    { title: "Publish", href: "/publish", icon: faBookOpen },
    { title: "Monetize", href: "/monetize", icon: faDollarSign },
    { title: "Help", href: "/help", icon: faQuestionCircle },
  ];

  return (
    <>
      <nav
        className={`flex justify-between items-center bg-gray-900 h-auto p-4 medium:px-10 medium:py-4 xl:pl-10 xl:py-6 relative z-20 ${styles}`}
      >
        {/* Left section - force it to take most of the space on larger screens */}
        <div className="flex items-center justify-between w-full medium:w-auto medium:justify-start medium:gap-4 large:flex-grow large:mr-8 xl:flex-grow xl:mr-10">
          {/* Hamburger menu - mobile only */}
          <button
            className="block medium:hidden large:hidden xl:hidden z-30 p-1"
            onClick={toggleMenu}
            aria-label={menu ? "Close menu" : "Open menu"}
          >
            <FontAwesomeIcon
              icon={showCloseIcon ? faTimes : faBars}
              style={{ color: "#FFFFFF" }}
              className="text-2xl"
            />
          </button>

          {/* Logo container with heading as a group */}
          <div className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={30}
              height={20}
              priority={true}
              quality={85}
              className="w-14 h-10 medium:w-10 medium:h-8"
            />

            {/* Heading - directly after logo with proper spacing */}
            <h1 className="text-white hidden large:block large:ml-5 large:text-2xl xl:block xl:ml-6 xl:text-4xl xl:font-semibold">
              Global Publishing
            </h1>
          </div>
        </div>

        {/* Right section - with improved button sizing */}
        <nav className="flex gap-3 large:gap-4 xl:gap-5 large:flex-shrink-0 xl:flex-shrink-0">
          <Link href="/author/sign_in">
            <LandingPgBtn
              variant="outlined"
              className="hidden medium:block large:block xl:block medium:px-3 medium:py-2 medium:text-base large:px-5 large:py-3 xl:px-6 xl:py-4 large:text-lg xl:text-xl"
            >
              Sign In
            </LandingPgBtn>
          </Link>
          <Link href="/author/sign_up">
            <LandingPgBtn
              variant="filled"
              className="hidden medium:block large:block xl:block medium:px-3 medium:py-2 medium:text-base large:px-5 large:py-3 xl:px-6 xl:py-4 large:text-lg xl:text-xl"
            >
              Create Account
            </LandingPgBtn>
          </Link>
        </nav>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={toggleMenu}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-gray-900 shadow-xl z-30 flex flex-col py-20 px-6"
            >
              {/* Close button positioned at top-right */}
              <motion.button
                variants={itemVariants}
                className="absolute top-4 right-4 text-white p-2"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-2xl hover:text-red-400 transition-colors"
                />
              </motion.button>

              <div className="mb-8">
                <motion.div variants={itemVariants} className="mb-8">
                  <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={40}
                    height={32}
                    priority={true}
                    quality={85}
                    className="w-10 h-8"
                  />
                </motion.div>

                <nav className="flex flex-col space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
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
                    </motion.div>
                  ))}
                </nav>
              </div>

              <motion.div variants={itemVariants} className="mt-auto space-y-4">
                <Link href="/author/sign_in">
                  <LandingPgBtn
                    variant="outlined"
                    className="w-full py-3 text-base font-medium transition-all duration-300 hover:bg-opacity-10 hover:bg-white active:scale-98"
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
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNav;
