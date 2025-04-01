import React from "react";

const AboutUs = () => {
  return (
    <section className="px-4 py-10 large:py-4 xl:py-0 xl:px-8">
      <section className="large:py-4 xl:py-0 flex flex-col items-center text-center large:text-left xl:text-left xl:max-w-7xl xl:mx-auto">
        <div className="flex flex-col items-center large:flex-row large:items-center large:gap-6 w-full large:max-w-7xl mx-auto xl:flex-row xl:items-center xl:gap-12 xl:max-w-8xl">
          {/* Left Section: Text */}
          <div className="large:mt-6 xl:mt-5 max-w-2xl">
            <h2 className="xs:px-10 font-bold py-4 large:py-2 xl:py-2 text-3xl md:text-4xl large:text-6xl xl:text-7xl">
              Discover Global Publishing with ITAN
            </h2>
            <p className="large:mt-4 text-lg text-gray-700 px-2 large:text-2xl xl:text-3xl">
              Publish your manuscripts in multiple formats. Create ebooks and
              audiobooks to expand your reach and connect with new readers.
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
        <div className="relative h-[50vh] medium:h-72 large:h-80 xl:h-96 overflow-hidden rounded-lg bg-[url('/images/placeholder.png')] bg-cover bg-center">
          {/* Dark overlay to make background more visible */}
          <div className="absolute inset-0 bg-[#FEE6E6] bg-opacity-40"></div>

          {/* Centered text with light background for readability */}
          <div className="flex items-center justify-center h-full relative z-10">
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

      <article className="m-6 xl:max-w-7xl xl:mx-auto">
        <div className="large:flex xl:flex large:items-center xl:items-center large:gap-12 xl:gap-16 large:p-8 xl:p-10">
          <figure className="mx-auto w-full max-w-xs large:max-w-sm xl:max-w-md large:w-1/2 xl:w-1/2 flex items-center justify-center">
            <img
              src="/images/books.png"
              alt="books"
              className="w-full h-auto object-contain"
            />
          </figure>

          <div className="medium:w-full large:w-2/3 xl:w-2/3 large:pt-0 xl:pt-0">
            <h2 className="text-center medium:text-start large:text-start xl:text-start text-2xl font-bold large:text-4xl xl:text-5xl mt-6 large:mt-0 xl:mt-0">
              Let the World{" "}
              <span className="text-[#EF5353]">Read and Listen</span> to your
              Unique Story
            </h2>

            <h2 className="font-semibold text-2xl mt-6 medium:px-4 large:px-0 large:text-3xl xl:text-4xl xl:mt-8">
              Make your book the next bestseller
            </h2>

            <p className="mt-6 text-gray-600 medium:px-4 large:px-0 large:text-2xl xl:text-3xl">
              Publish in diverse formats to make your content easily accessible
              and enjoyable for all readers.
            </p>

            <ul className="large:px-0 mt-8">
              <li className="flex flex-col mt-6 medium:px-4 large:px-0">
                <div className="flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mr-3 large:w-5 large:h-5 xl:w-6 xl:h-6"
                  >
                    <rect width="12" height="12" fill="#D78585" />
                  </svg>
                  <h2 className="font-semibold text-2xl xl:text-3xl">Ebook</h2>
                </div>
                <p className="text-gray-600 ml-[24px] large:ml-[28px] xl:ml-[32px] large:text-2xl xl:text-3xl">
                  Upload your manuscript and distribute your eBook on ITAN.
                </p>
              </li>

              <li className="flex flex-col mt-6 medium:px-4 large:px-0 large:text-2xl">
                <div className="flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mr-3 large:w-5 large:h-5 xl:w-6 xl:h-6"
                  >
                    <rect width="12" height="12" fill="#D78585" />
                  </svg>
                  <h2 className="font-semibold text-2xl xl:text-3xl">
                    Audio Books
                  </h2>
                </div>
                <p className="text-gray-600 ml-[24px] large:ml-[28px] xl:ml-[32px] xl:text-3xl">
                  Publish your audiobooks and connect with readers in exciting
                  ways.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#E7E7E7] mt-8 p-4 large:p-8 xl:p-10 large:mt-12 xl:mt-16 rounded-lg">
          <h3 className="text-2xl font-bold large:text-3xl xl:text-4xl">
            Increase your <span className="text-[#EF5353]">Earnings</span> with
            ITAN – Monetize your Works
          </h3>

          <p className="font-semibold text-2xl mt-6 medium:px-4 large:px-0 xl:text-3xl">
            Control your earnings
          </p>

          <div className="large:flex xl:flex large:items-center xl:items-center large:justify-between xl:justify-between large:mt-8 xl:mt-10">
            <ul className="flex flex-col gap-6 mt-6 medium:px-4 large:px-0 xl:mb-0 large:w-3/5 xl:w-3/5">
              <li className="flex items-start gap-4">
                <img
                  src="/images/cash-hand.png"
                  alt="cash hand"
                  className="mt-1 w-6 h-6 large:w-8 large:h-8 xl:w-10 xl:h-10"
                />
                <div>
                  <h3 className="font-semibold text-xl large:text-2xl xl:text-3xl">
                    Earn up to 70% on eBooks
                  </h3>
                  <p className="text-gray-600 mt-2 large:text-xl xl:text-2xl">
                    Earn up to 70% royalty on all ebooks sold through ITAN
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <img
                  src="/images/cash-hand.png"
                  alt="cash hand"
                  className="mt-1 w-6 h-6 large:w-8 large:h-8 xl:w-10 xl:h-10"
                />
                <div>
                  <h3 className="font-semibold text-xl large:text-2xl xl:text-3xl">
                    Earn up to 65% on audio books
                  </h3>
                  <p className="text-gray-600 mt-2 large:text-xl xl:text-2xl">
                    Earn up to 60% royalty on audiobooks and hardcover books
                    sold through ITAN
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <img
                  src="/images/hand-2-hand.png"
                  alt="hand"
                  className="mt-1 w-6 h-6 large:w-8 large:h-8 xl:w-10 xl:h-10"
                />
                <div>
                  <h3 className="font-semibold text-xl large:text-2xl xl:text-3xl">
                    Payment of earnings into your local account
                  </h3>
                  <p className="text-gray-600 mt-2 large:text-xl xl:text-2xl">
                    Control your earnings and get paid into any bank account of
                    your choosing
                  </p>
                </div>
              </li>
            </ul>

            <figure className="xs:flex xs:items-center justify-center large:block mt-8 medium:hidden large:w-2/5 xl:w-2/5">
              <img
                src="/images/image-one.png"
                alt="ITAN publishing"
                className="large:w-full large:h-auto xl:w-full xl:h-auto max-w-sm large:max-w-md xl:max-w-lg mx-auto"
              />
            </figure>
          </div>
        </div>
      </article>

      <div className="xl:max-w-7xl xl:mx-auto">
        <div>
          <p className="mb-8 text-center text-2xl font-semibold mt-6 medium:text-3xl medium:mt-10 large:text-3xl xl:text-4xl">
            Publish a variety of <span className="text-[#EF5353]">Genres</span>
          </p>

          <div className="grid grid-cols-2 xs:grid-cols-2 medium:grid-cols-3 large:grid-cols-6 xl:grid-cols-6 gap-6 medium:gap-4 large:gap-[3px] xl:gap-[3px] p-4 bg-[#FEE6E6]">
            <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
              <div className="w-full aspect-square flex items-center justify-center mb-3">
                <img
                  src="/images/comics.png"
                  alt="comics"
                  className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                />
              </div>
              <p className="text-base font-medium">Literature & fiction</p>
            </div>

            <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
              <div className="w-full aspect-square flex items-center justify-center mb-3">
                <img
                  src="/images/horror.png"
                  alt="horror"
                  className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                />
              </div>
              <p className="text-base font-medium">Horror</p>
            </div>

            <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
              <div className="w-full aspect-square flex items-center justify-center mb-3">
                <img
                  src="/images/literature.png"
                  alt="literature"
                  className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                />
              </div>
              <p className="text-base font-medium">Teen & Young Adult</p>
            </div>

            <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
              <div className="w-full aspect-square flex items-center justify-center mb-3">
                <img
                  src="/images/mystery.png"
                  alt="mystery"
                  className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                />
              </div>
              <p className="text-base font-medium">Romance</p>
            </div>

            <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
              <div className="w-full aspect-square flex items-center justify-center mb-3">
                <img
                  src="/images/romance.png"
                  alt="romance"
                  className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                />
              </div>
              <p className="text-base font-medium">Mystery</p>
            </div>

            <div className="flex flex-col items-center text-center p-2 hover:scale-105 transition-transform duration-300">
              <div className="w-full aspect-square flex items-center justify-center mb-3">
                <img
                  src="/images/teen-adult.png"
                  alt="teen-adult"
                  className="w-40 h-40 xs:w-44 xs:h-44 medium:w-48 medium:h-48 large:w-52 large:h-52 xl:w-56 xl:h-56 object-contain"
                />
              </div>
              <p className="text-base font-medium">Comics</p>
            </div>
          </div>
        </div>
      </div>

      <article className="medium:mt-10 medium:px-4 large:mt-10 large:flex large:gap-6 large:px-6 xl:mt-4 xl:flex xl:justify-between xl:max-w-7xl xl:mx-auto">
        <figure className="mt-8 medium:hidden large:block xl:block">
          <img
            src="/images/laptop.png"
            alt=""
            className="large:w-64 large:h-64"
          />
        </figure>

        <div className="mt-10 xl:text-2xl xl:ml-10">
          <h3 className="text-2xl font-bold">
            Publish, Monitor Sales, and Manage Your Earnings
          </h3>
          <p className="text-gray-700 py-2">
            Own your publishing process with ITAN. Customize your book’s
            content, look, and price.
          </p>
          <ul className="space-y-3 mt-4">
            <li className="flex items-start">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 mr-3 mt-1.5"
              >
                <rect width="12" height="12" fill="#D78585" />
              </svg>
              <span className="text-xl font-semibold xl:text-2xl">
                Publish as many titles as you desire.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 mr-3 mt-1.5"
              >
                <rect width="12" height="12" fill="#D78585" />
              </svg>
              <span className="text-xl large:pr-12 large:text-wrap font-semibold xl:text-2xl">
                Maintain full control and ownership of your content, publish at
                your convenience and set your pricing.
              </span>
            </li>
          </ul>
          <button className="px-4 py-2 my-6 text-xl text-white bg-red-500 rounded-md xl:px-6 xl:py-4">
            Get started
          </button>
        </div>
      </article>
    </section>
  );
};
export default AboutUs;
