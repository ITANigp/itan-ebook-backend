"use client";

import { useState, useRef, useEffect } from "react";

export default function AgeSelectionPage() {
  const [age, setAge] = useState(20);
  const minAge = 5;
  const maxAge = 60;
  const touchStartY = useRef(null);

  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      setAge((prev) => Math.max(minAge, prev - 1));
    } else {
      setAge((prev) => Math.min(maxAge, prev + 1));
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaY) > 20) {
      if (deltaY > 0) {
        setAge((prev) => Math.min(maxAge, prev + 1));
      } else {
        setAge((prev) => Math.max(minAge, prev - 1));
      }
    }

    touchStartY.current = null;
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left Section */}
      <div className="relative hidden md:block">
        <img
          src="/itan-image.jpg"
          alt="Reading Woman"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 p-10 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Discover worlds within pages with ITAN
          </h1>
          <p className="text-sm max-w-md">
            Whether you’re searching for inspiration, escape, or knowledge—we’ve
            got the perfect story waiting for you.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center px-6 py-12 relative">
        <div className="absolute top-4 left-4 text-xl cursor-pointer">←</div>
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center gap-10 mb-6">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step === 2 ? "bg-red-600" : step < 2 ? "bg-red-600" : "bg-gray-300"}`}
              >
                {step}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-1">How Old are You?</h2>
          <p className="text-sm text-gray-500 mb-6">
            To Tailor our Recommendations, Kindly Share Your Age
          </p>

          <div
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative h-40 overflow-hidden text-xl font-semibold text-gray-500 cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2 transition-all duration-300 ease-in-out">
              {[...Array(maxAge - minAge + 1)].map((_, i) => {
                const value = minAge + i;
                const isSelected = value === age;
                return (
                  <div
                    key={value}
                    className={`transition-all ${isSelected ? "text-red-600 text-3xl font-bold underline" : ""}`}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          </div>

          <button className="mt-10 w-full bg-red-600 text-white py-2 rounded-md">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
