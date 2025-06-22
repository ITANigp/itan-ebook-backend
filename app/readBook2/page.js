"use client";

import HTMLFlipBook from "react-pageflip";

export default function MyBook() {
  return (
    <div className="w-full h-full">
      <HTMLFlipBook
        width={800}
        height={600}
        size="stretch"
        minWidth={315}
        maxWidth={1920}
        minHeight={400}
        maxHeight={1080}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="w-full h-full mb-7 mt-20 mx-5" 
      >
        <div className="flex items-center justify-center h-full bg-white border border-gray-300 text-3xl font-bold">
          Cover Page
        </div>
        <div className="flex items-center justify-center h-full bg-yellow-100 border border-gray-300 text-3xl">
          Page 1
        </div>
        <div className="flex items-center justify-center h-full bg-blue-100 border border-gray-300 text-3xl">
          Page 2
        </div>
        <div className="flex items-center justify-center h-full bg-green-100 border border-gray-300 text-3xl">
          Page 3
        </div>
        <div className="flex items-center justify-center h-full bg-yellow-100 border border-gray-300 text-3xl">
          Page 4
        </div>
        <div className="flex items-center justify-center h-full bg-blue-100 border border-gray-300 text-3xl">
          Page 5
        </div>
        <div className="flex items-center justify-center h-full bg-green-100 border border-gray-300 text-3xl">
          Page 6
        </div>
        <div className="flex items-center justify-center h-full bg-yellow-100 border border-gray-300 text-3xl">
          Page 7
        </div>
        <div className="flex items-center justify-center h-full bg-blue-100 border border-gray-300 text-3xl">
          Page 8
        </div>
        <div className="flex items-center justify-center h-full bg-green-100 border border-gray-300 text-3xl">
          Page 9
        </div>
        <div className="flex items-center justify-center h-full bg-white border border-gray-300 text-3xl font-bold">
          Back Cover
        </div>
      </HTMLFlipBook>
    </div>
  );
}
