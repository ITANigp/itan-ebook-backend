import React from "react";

const Help = () => {
  return (
    <section className="px-4 py-10 large:py-4 xl:py-0 xl:px-8">
      <section className="large:py-4 xl:py-0 flex flex-col items-center text-center large:text-left xl:text-left xl:max-w-7xl xl:mx-auto">
        <div className="flex flex-col items-center large:flex-row large:items-center large:gap-6 w-full large:max-w-7xl mx-auto xl:flex-row xl:items-center xl:gap-12 xl:max-w-8xl">
          {/* Left Section: Text */}
          <div className="large:mt-6 xl:mt-5 max-w-2xl">
            <h2 className="xs:px-10 font-bold py-4 large:py-2 xl:py-2 text-3xl md:text-4xl large:text-6xl xl:text-7xl">
              Full support from Itan Global Publishing(IGP)
            </h2>
            <p className="large:mt-4 text-lg text-gray-700 px-2 large:text-2xl xl:text-3xl">
              Get all the help you need with Itan Global Publishing (IGP) and
              see the Frequently Asked Questions (FAQ).
            </p>
          </div>
          {/* Right Section: Image */}
          <figure className="mt-6 large:mt-0 w-full large:max-w-md xl:mt-0 xl:max-w-lg">
            <img
              src="/images/books-with-headphone.png"
              alt="ebooks"
              className="w-full h-auto object-cover"
            />
          </figure>
        </div>
        {/* ✅ Buttons (Mobile/Tablet: Below image, Large screens: Below text) */}
        <div className="mt-6 large:mt-4 flex flex-col large:flex-row xl:flex-row w-full max-w-xs gap-3 large:w-auto xl:self-start large:self-start">
          <button className="w-full py-3 large:p-6 text-nowrap text-2xl text-white bg-red-500 font-bold rounded-md">
            Join Itan
          </button>
          <button className="w-full py-3 large:p-6 text-nowrap text-2xl border border-red-400 text-red-500 font-bold rounded-md">
            Sign In
          </button>
        </div>
      </section>

      <article className="w-full mt-10 xl:max-w-7xl xl:mx-auto">
        <div className="rounded-lg overflow-hidden bg-[#FEE6E6] bg-opacity-30">
          <h3 className="text-2xl medium:text-3xl large:text-4xl xl:text-5xl font-semibold text-center large:text-left xl:text-left mb-6">
            Are you <span className="text-[#EF5353]">New?</span>
            Here are a few steps to get you started:
          </h3>

          <div>
            <h3>What is IGP</h3>
            <p>Know all about IGP service</p>
            <a href="#" />
          </div>
          <img />
        </div>
      </article>
    </section>
  );
};

export default Help;
