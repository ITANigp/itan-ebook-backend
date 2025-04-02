import React from "react";

const Monetize = () => {
  return (
    <div className="px-4 py-10 large:py-4 xl:py-0 xl:px-8">
      <section className="large:py-4 xl:py-0 flex flex-col items-center text-center large:text-left xl:text-left xl:max-w-7xl xl:mx-auto">
        <div className="flex flex-col items-center large:flex-row large:items-center large:gap-6 w-full large:max-w-7xl mx-auto xl:flex-row xl:items-center xl:gap-12 xl:max-w-8xl">
          {/* Left Section: Text */}
          <div className="large:mt-6 xl:mt-5 max-w-2xl">
            <h2 className="xs:px-10 font-bold py-4 large:py-2 xl:py-2 text-3xl md:text-4xl large:text-6xl xl:text-7xl">
              Monetize With Itan Global Publishing(IGP)
            </h2>
            <p className="large:mt-4 text-lg text-gray-700 px-2 large:text-2xl xl:text-3xl">
              Itan Global Publishing provides free publishing and multiple
              royalty streams.
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
          <div className="flex flex-col large:flex-row xl:flex-row">
            {/* Left Side: Text and List */}
            <div className="w-full large:w-1/2 xl:w-1/2 p-6 medium:p-8 large:p-10 xl:p-12 flex items-center">
              <div className="w-full">
                <h3 className="text-2xl medium:text-3xl large:text-4xl xl:text-5xl font-semibold text-center large:text-left xl:text-left mb-6">
                  Maximize your <span className="text-[#EF5353]">Earning</span>{" "}
                  Through Multiple Revenue Sources
                </h3>
                <ul className="list-none space-y-4 medium:space-y-5 large:space-y-6">
                  <li className="flex items-start">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 mr-3 mt-2 medium:mt-3 large:w-5 large:h-5 xl:w-6 xl:h-6"
                    >
                      <rect width="12" height="12" fill="#D78585" />
                    </svg>
                    <span className="text-lg medium:text-xl large:text-2xl xl:text-3xl">
                      Earn up to 60% royalties on your ebooks
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 mr-3 mt-2 medium:mt-3 large:w-5 large:h-5 xl:w-6 xl:h-6"
                    >
                      <rect width="12" height="12" fill="#D78585" />
                    </svg>
                    <span className="text-lg medium:text-xl large:text-2xl xl:text-3xl">
                      Earn up to 65% royalties on your audio books
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 mr-3 mt-2 medium:mt-3 large:w-5 large:h-5 xl:w-6 xl:h-6"
                    >
                      <rect width="12" height="12" fill="#D78585" />
                    </svg>
                    <span className="text-lg medium:text-xl large:text-2xl xl:text-3xl">
                      Get paid for every page read with Itan Unbound
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="w-full large:w-1/2 xl:w-1/2 h-[40vh] medium:h-[45vh] large:h-auto xl:h-auto">
              <img
                src="/images/monetize.png"
                alt="monetize"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </article>

      <section className="my-16 flex flex-col large:flex-row xl:flex-row gap-6 xl:max-w-7xl xl:mx-auto">
        {/* Ebook Royalty Card */}
        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.02] mb-6 large:mb-0 xl:mb-0">
          <div className="p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 medium:w-28 medium:h-28 large:w-32 large:h-32 mb-4">
              <img
                src="/images/phone-book.png"
                alt="phone-book"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-lg medium:text-3xl large:text-3xl xl:text-4xl font-semibold text-gray-800 mb-2">
              Royalty for eBook Sale
            </p>
            <p className="text-[#EF5353] text-3xl medium:text-4xl large:text-5xl xl:text-6xl font-bold">
              70%
            </p>
          </div>
        </div>

        {/* Audiobook Royalty Card */}
        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.02]">
          <div className="p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 medium:w-28 medium:h-28 large:w-32 large:h-32 mb-4">
              <img
                src="/images/audio-book.png"
                alt="audio-book"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-lg medium:text-3xl large:text-3xl xl:text-4xl font-semibold text-gray-800 mb-2">
              Royalty for Audiobook Sale
            </p>
            <p className="text-[#EF5353] text-3xl medium:text-4xl large:text-5xl xl:text-6xl font-bold">
              65%
            </p>
          </div>
        </div>
      </section>

      <section className="my-16 xl:max-w-7xl xl:mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 medium:p-8 large:p-10 xl:p-12 flex flex-col large:flex-row xl:flex-row gap-8 large:gap-12 xl:gap-16">
          <div className="w-full large:w-1/2 xl:w-1/2">
            <h3 className="text-2xl medium:text-3xl large:text-4xl xl:text-5xl font-semibold text-center large:text-left xl:text-left mb-6">
              Get Paid for Every Page Read on{" "}
              <span className="text-[#EF5353]">ITAN Unbound</span>
            </h3>

            <p className="text-lg medium:text-xl large:text-2xl text-gray-700 mb-4">
              With ITAN Unbound's subscription program, your book reaches a
              wider audience of eager readers, expanding its reach beyond
              traditional sales.
            </p>

            <p className="text-lg medium:text-xl large:text-2xl text-gray-700">
              Your revenue share is based on the number of pages read by
              customers in the subscription program.
            </p>
          </div>

          <figure className="w-full large:w-1/2 xl:w-1/2 flex items-center justify-center">
            <img
              src="/images/graph.png"
              alt="ITAN Unbound revenue graph"
              className="w-full h-auto max-w-md mx-auto object-contain rounded-md"
            />
          </figure>
        </div>
      </section>
    </div>
  );
};

export default Monetize;
