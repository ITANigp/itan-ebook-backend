import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faFacebookF,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = ({ styles }) => {
  const pathname = usePathname();

  const authorPages =
    pathname.startsWith("/author") || pathname.startsWith("/dashboard");

  return (
    <footer className={`${styles} mt-6 medium:mt-8 large:mt-10 xl:mt-0`}>
      <section className="relative z-30 h-[150px] xs:h-[170px] medium:h-[200px] large:h-[220px] xl:h-[250px] flex flex-col items-center justify-center text-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/footer-bg-img.jpeg')" }}
        ></div>

        {/* Full-screen backdrop to reduce image sharpness */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 w-full px-4 text-white mb-2 medium:mb-3">
          <h2 className="mx-auto text-center text-base xs:text-lg medium:text-xl large:text-2xl xl:text-3xl font-semibold">
            Stay In The Know
          </h2>
          <p className="mx-auto text-center text-xs xs:text-sm medium:text-base mt-1 large:text-xl xl:text-xl">
            Subscribe to our newsletter and receive IGP updates and special
            offers
          </p>
        </div>

        <div className="relative z-10 flex justify-center w-[90%] xs:w-[85%] medium:w-[70%] large:w-[60%] xl:w-[50%] p-1 bg-white backdrop-blur-md rounded-md">
          <input
            type="email"
            placeholder="Enter email address"
            className="w-10 flex-1 border-0 outline-none ring-0 focus:ring-0 text-xs xs:text-sm medium:text-base px-2"
          />
          <button className="text-white bg-[#EF5353] px-3 xs:px-4 medium:px-6 py-1.5 medium:py-2 text-xs xs:text-sm medium:text-base rounded-md cursor-pointer">
            Subscribe
          </button>
        </div>
      </section>

      <section className="bg-[#111928]">
        <div className="mx-4 xs:mx-5 medium:mx-10 large:mx-16 xl:mx-20 pt-6 medium:pt-8">
          <Link href="/">
            <img
              src="/images/logo.svg"
              alt="logo"
              className="h-6 w-9 xs:h-7 xs:w-10 medium:h-8 medium:w-12"
            />
          </Link>
        </div>

        {/* This entire section is hidden on mobile, visible only on large/xl screens */}
        <div className="hidden large:block xl:block text-white">
          <div className="flex flex-col medium:flex-col">
            {/* Main footer content section */}
            <div className="grid grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-4 mx-16 xl:mx-20 mt-6 large:mt-6 xl:mt-8">
              {/* About Itan paragraph */}
              <div className="col-span-1">
                <p className="text-base xl:text-lg max-w-[320px] xl:max-w-[380px] leading-relaxed">
                  Itan is a revolutionary publishing platform designed
                  specifically for writers like you. Seamlessly publish your
                  work to a global audience, retaining creative control and
                  ownership every step of the way.
                </p>
              </div>

              {/* Menu section */}
              <div className="col-span-1">
                <h3 className="text-xl xl:text-2xl font-semibold mb-4">Menu</h3>
                <p className="mb-2 xl:mb-3 text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                  Sign In
                </p>
                <p className="mb-2 xl:mb-3 text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                  Sign Up
                </p>
                <p className="mb-2 xl:mb-3 text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                  Services
                </p>
                <p className="mb-2 xl:mb-3 text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                  Help center
                </p>
                <p className="mb-2 xl:mb-3 text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                  Testimonial
                </p>
              </div>

              {/* Resources section */}
              <div className="col-span-1">
                <h3 className="text-xl xl:text-2xl font-semibold mb-4">
                  Resources
                </h3>
                <p className="mb-2 xl:mb-3 text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                  New update
                </p>
                <p className="mb-2 xl:mb-3 text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                  Documentation
                </p>
                <p className="mb-2 xl:mb-3 text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                  Blog
                </p>
              </div>

              {/* About section */}
              <div className="col-span-1">
                <h3 className="text-xl xl:text-2xl font-semibold mb-4">
                  About
                </h3>
                <p className="mb-2 xl:mb-3 text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                  Find out more
                </p>               
              </div>

              {/* Blog section */}
              <div className="col-span-1">
                <h3 className="text-xl xl:text-2xl font-semibold mb-4">
                  Blog
                </h3>
                <p className="mb-2 xl:mb-3 text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                  Contact
                </p>                
              </div>
            </div>

            {/* Social media icons */}
            <div className="mx-16 xl:mx-20 mt-8 xl:mt-10">
              <div className="flex justify-between w-52 xl:w-60">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="w-5 h-7 xl:w-6 xl:h-8 p-2.5 xl:p-3 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] hover:scale-110 transition-all duration-300"
                  />
                </Link>
                <Link
                  href="https://x.com/ItanGlobal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    className="w-5 h-7 xl:w-6 xl:h-8 p-2.5 xl:p-3 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] hover:scale-110 transition-all duration-300"
                  />
                </Link>
                <Link
                  href="https://web.facebook.com/itanglobalpublishing/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="w-5 h-7 xl:w-6 xl:h-8 p-2.5 xl:p-3 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] hover:scale-110 transition-all duration-300"
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/itanglobalpublishing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="w-5 h-7 xl:w-6 xl:h-8 p-2.5 xl:p-3 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] hover:scale-110 transition-all duration-300"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile version - only visible on small and medium screens */}
        <div className="large:hidden xl:hidden text-white flex flex-col-reverse medium:flex-col">
          {/* Main footer mobile content - simplified for smaller screens */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mx-4 xs:mx-5 medium:mx-10 mt-6 medium:mt-3 medium:grid-cols-3">
            {/* Resources */}
            <div className="col-span-1">
              <h3 className="text-base xs:text-lg font-semibold mb-2">
                Resources
              </h3>
              <p className="mb-1 text-sm medium:text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                New update
              </p>
              <p className="mb-1 text-sm medium:text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                Documentation
              </p>
              <p className="mb-1 text-sm medium:text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                Blog
              </p>
            </div>

            {/* About */}
            <div className="col-span-1">
              <h3 className="text-base xs:text-lg font-semibold mb-2">About</h3>
              <p className="mb-1 text-sm medium:text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                Contact
              </p>
              <p className="mb-1 text-sm medium:text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                About
              </p>
            </div>

            {/* Contact - only on medium screens */}
            <div className="hidden medium:block col-span-1">
              <h3 className="text-base xs:text-lg font-semibold mb-2">
                Blog
              </h3>
              <p className="mb-1 text-sm medium:text-base hover:text-[#EF5353] cursor-pointer transition-colors duration-200">
                Content policy
              </p>              
            </div>
          </div>

          {/* Social media icons - mobile version */}
          <div className="mx-4 xs:mx-5 medium:mx-10 mt-8 medium:mt-6">
            <div className="flex justify-between w-36 xs:w-40 medium:w-44">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="w-3 h-5 xs:w-4 xs:h-6 p-2 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] hover:scale-110 transition-all duration-300"
                />
              </Link>
              <Link
                href="https://x.com/ItanGlobal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="w-3 h-5 xs:w-4 xs:h-6 p-2 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] hover:scale-110 transition-all duration-300"
                />
              </Link>
              <Link
                href="https://web.facebook.com/itanglobalpublishing/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="w-3 h-5 xs:w-4 xs:h-6 p-2 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] hover:scale-110 transition-all duration-300"
                />
              </Link>
              <Link
                href="https://www.instagram.com/itanglobalpublishing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="w-3 h-5 xs:w-4 xs:h-6 p-2 rounded-full border-2 border-[#EF5353] hover:bg-[#EF5353] hover:scale-110 transition-all duration-300"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Terms and Policy */}
        <div className="text-white flex flex-wrap items-center mx-4 xs:mx-5 medium:mx-10 large:mx-16 xl:mx-20 mt-6 medium:mt-8 text-xs xs:text-sm medium:text-base">
          <Link
            className="mr-4 hover:text-[#EF5353] cursor-pointer"
            href="/terms&conditions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms & Conditions
          </Link>
          <Link
            className="hover:text-[#EF5353] cursor-pointer"
            href="/privacy-policies"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </Link>
        </div>
        {/* Separator line */}
        <div className="mx-4 xs:mx-5 medium:mx-10 large:mx-16 xl:mx-20 mt-4 medium:mt-5 large:mt-6">
          <span className="block h-[2px] w-full bg-[#EF5353]/30"></span>
        </div>
        {/* Copyright */}
        <div className="text-white flex items-center mx-4 xs:mx-5 medium:mx-10 large:mx-16 xl:mx-20 mt-3 pb-6 medium:pb-8 large:pb-10 text-xs xs:text-sm medium:text-base">
          <img
            src="/images/copy-right.png"
            alt="copy right"
            className="h-3 w-3 xs:h-4 xs:w-4 mr-2"
          />
          <p>Copyright 2025 itan. All Rights Reserved.</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

