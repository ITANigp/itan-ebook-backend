"use client";
import React from "react";
import LandingPgBtn from "./LandingPgBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faBars);

const TopNav = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-900 h-auto p-4 medium:px-10 medium:py-4 xl:px-16 xl:py-6">
      <div className="flex gap-2 items-center">
        <div className="block medium:hidden large:hidden xl:hidden">
          <FontAwesomeIcon icon={faBars} style={{ color: "#FFFFFF" }} />
        </div>
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-14 h-10 medium:w-10 medium:h-8"
        />
        <h1 className="text-white hidden large:hidden xl:block xl:text-4xl xl:font-semibold">
          Global Publishing
        </h1>
      </div>

      <nav className="flex gap-2.5">
        <LandingPgBtn
          variant="outlined"
          className="hidden medium:block large:block xl:block medium:px-3 medium:py-2 medium:text-base large:px-4 large:py-3 xl:px-5 xl:py-4"
        >
          Sign In
        </LandingPgBtn>
        <LandingPgBtn
          variant="filled"
          className="px-2 medium:px-3 medium:py-2 medium:text-base large:px-4 large:py-3 xl:px-5 xl:py-4"
        >
          Join Itan
        </LandingPgBtn>
      </nav>
    </nav>
  );
};

export default TopNav;
