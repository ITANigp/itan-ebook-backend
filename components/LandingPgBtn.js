"use client";
import React from "react";

const LandingPgBtn = ({
  children,
  variant = "outlined",
  className = "",
  ...props
}) => {
  const baseStyles = "px-16 py-4 text-xl font-bold rounded-md max-sm:w-full";
  const variants = {
    outlined: "text-white border border-red-500 border-solid",
    filled: "text-white bg-red-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default LandingPgBtn;
