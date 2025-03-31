import React from "react";

const MainContent = () => {
  return (
    <>
      <section className="px-4 py-10 large:py-4 flex flex-col items-center text-center large:text-left">
        <div className="flex flex-col items-center large:flex-row large:items-center large:gap-6 w-full large:max-w-7xl mx-auto">
          {/* Left Section: Text */}
          <div className="large:mt-10 max-w-2xl">
            <h2 className="xs:px-10 font-bold py-4 large:py-2 text-3xl md:text-4xl large:text-6xl">
              Discover Global Publishing with ITAN
            </h2>
            <p className="large:mt-4 text-lg text-gray-700 px-2">
              Publish your manuscripts in multiple formats. Create ebooks and
              audiobooks to expand your reach and connect with new readers.
            </p>
          </div>
          {/* Right Section: Image */}
          <figure className="mt-6 large:mt-0 w-full large:max-w-md">
            <img
              src="/images/books-with-headphone.png"
              alt="ebooks"
              className="w-full h-auto object-cover"
            />
          </figure>
        </div>
        {/* ✅ Buttons (Mobile/Tablet: Below image, Large screens: Below text) */}
        <div className="mt-6 large:mt-4 flex flex-col large:flex-row w-full max-w-xs gap-3 large:w-auto large:self-start">
          <button className="w-full py-3 large:p-6 text-nowrap text-2xl text-white bg-red-500 font-bold rounded-md">
            Join Itan
          </button>
          <button className="w-full py-3 large:p-6 text-nowrap text-2xl text-red-500 border border-red-500 font-bold rounded-md">
            Sign In
          </button>
        </div>
      </section>

      <article className="w-full">
        <div className="relative h-[50vh] medium:h-72 large:h-80 xl:h-96 overflow-hidden rounded-lg bg-[url('/images/placeholder.png')] bg-cover bg-center">
          {/* Centered text with light background for readability */}
          <div className="flex items-center justify-center h-full">
            <p
              className="text-black text-center w-[90%] max-w-sm xs:max-w-md medium:max-w-lg large:max-w-xl xl:max-w-2xl 
        p-4 xs:p-5 medium:p-6 large:p-8 xl:p-10 
        font-medium text-lg xs:text-xl medium:text-2xl large:text-3xl xl:text-4xl 
        leading-relaxed bg-white bg-opacity-80 rounded-md"
            >
              ITAN makes self-publishing simple, allowing you to release books
              in different formats and engage new readers worldwide.
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

export default MainContent;
