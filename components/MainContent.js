import React from "react";

const MainContent = () => {
  return (
    <section className="px-4 py-10">
      <section className="large:py-4 flex flex-col items-center text-center large:text-left">
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

      <article>
        <h2 className="text-center text-2xl font-bold">
          Let the World <span className="text-[#EF5353]">Read and Listen</span>{" "}
          to your Unique Story
        </h2>
        <h2 className="font-semibold text-2xl mt-6">
          Make your book the next bestseller
        </h2>
        <p className="mt-6 text-gray-600">
          Publish in diverse formats to make your content easily accessible and
          enjoyable for all readers.
        </p>
        <ul>
          <li className="flex flex-col mt-6">
            <div className="flex items-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 mr-3"
              >
                <rect width="12" height="12" fill="#D78585" />
              </svg>
              <h2 className="font-semibold text-2xl">Ebook</h2>
            </div>
            <p className="text-gray-600 ml-[19px]">
              Upload your manuscript and distribute your eBook on ITAN.
            </p>
          </li>
          <li className="flex flex-col mt-6">
            <div className="flex items-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 mr-3"
              >
                <rect width="12" height="12" fill="#D78585" />
              </svg>
              <h2 className="font-semibold text-2xl">Audio Books</h2>
            </div>
            <p className="text-gray-600 ml-[19px]">
              Publish your audiobooks and connect with readers in exciting ways.
            </p>
          </li>
        </ul>
        <figure className="m-4">
          <img src="/images/books.png" alt="books" />
        </figure>
        <h3 className="text-center text-2xl font-bold">
          Increase your <span className="text-[#EF5353]">Earnings</span> with
          ITAN – Monetize your Works
        </h3>
        <p className="font-semibold text-2xl mt-6">Control your earnings</p>
        <ul className="flex flex-col gap-4 mt-6">
          <li className="flex items-start gap-2">
            <img
              src="/images/cash-hand.png"
              alt="cash hand"
              className="mt-0.5"
            />
            <div>
              <h3 className="font-semibold text-xl">
                Earn up to 70% on eBooks
              </h3>
              <p className="text-gray-600 mt-1">
                Earn up to 70% royalty on all ebooks sold through ITAN
              </p>
            </div>
          </li>

          <li className="flex items-start gap-2">
            <img
              src="/images/cash-hand.png"
              alt="cash hand"
              className="mt-0.5"
            />
            <div>
              <h3 className="font-semibold text-xl">
                Earn up to 65% on audio books
              </h3>
              <p className="text-gray-600 mt-1">
                Earn up to 60% royalty on audiobooks and hardcover books sold
                through ITAN
              </p>
            </div>
          </li>

          <li className="flex items-start gap-2">
            <img src="/images/hand-2-hand.png" alt="hand" className="mt-0.5" />
            <div>
              <h3 className="font-semibold text-xl">
                Payment of earnings into your local account
              </h3>
              <p className="text-gray-600 mt-1">
                Control your earnings and get paid into any bank account of your
                choosing
              </p>
            </div>
          </li>
        </ul>
      </article>

      <figure className="mt-8">
        <img src="/images/image-one.png" />
      </figure>

      <div>
        <div>
          <p className="text-center text-xl font-semibold mt-6">
            Publish a variety of <span className="text-[#EF5353]">Genres</span>
          </p>

          <div className="grid grid-cols-2 xs:grid-cols-2 medium:grid-cols-3 large:grid-cols-4 xl:grid-cols-6 gap-6 p-4">
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

      <article>
        <h3 className="text-2xl font-bold">
          Publish, Monitor Sales, and Manage Your Earnings
        </h3>
        <p className="text-gray-700 py-2">
          Own your publishing process with ITAN—customize your book’s content,
          look, and price.
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
            <span className="text-xl font-semibold">
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
            <span className="text-xl font-semibold">
              Maintain full control and ownership of your content, publish at
              your convenience and set your pricing.
            </span>
          </li>
        </ul>
        <button className="px-4 py-2 my-6 text-xl text-white bg-red-500 rounded-md">
          Get started
        </button>
        <img src="/images/laptop.png" alt="" />
      </article>
    </section>
  );
};
export default MainContent;
