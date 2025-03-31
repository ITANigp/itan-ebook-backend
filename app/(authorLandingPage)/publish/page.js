import Link from 'next/link';
import React from 'react'

const Publish = () => {
  return (
    <div>
      <section className="sm:flex sm:justify-between sm:mx-20 sm:mb-10">
        <div className="sm:mt-32">
          <h1 className="text-2xl sm:text-4xl font-semibold">
            Publish With Itan <br /> Global Publishing (IGP)
          </h1>
          <p className="my-2 w-80">
            With Itan Global Publishing (IGP), publish your books and reach
            millions of readers around the world
          </p>
          <div className="sm:mt-6 bg-amber-200">
            <Link
              href="/author/sign_in"
              className="h-9 sm:h-44 sm:w-80 bg-slate-500 border border-[#EF5353] text-[#EF5353] rounded-sm py-1 px-4 mr-2"
            >
              Sign In
            </Link>
            <Link
              href="/author/sign_up"
              className="h-5 bg-[#EF5353] text-white rounded-sm py-1 px-4"
            >
              Join Itan
            </Link>
          </div>
        </div>
        <img
          src="/images/books-with-headphone.png"
          alt="books with headphone"
          className="hidden sm:block w-[600px]"
        />
      </section>

      <section
        className="z-30 relative bg-cover bg-center bg-no-repeat h-[450px] sm:h-[350px] px-3 "
        style={{ backgroundImage: "url('/images/bg-img-publish.png')" }}
      >
        <h2 className="text-2xl font-bold mt-5 sm:pt-12 sm:text-4xl text-center">
          Start your <span className="text-[#EF5353] ">publishing</span> journey
          with two easy steps
        </h2>
        <ul className="list-item list-inside space-y-2 text-xl font-semibold text-left">
          <li className="mt-4 sm:text-3xl sm:ml-10">
            Step 1: Get your manuscript and cover ready
          </li>
        </ul>
        <p className="my-3 max-w-2xl sm:ml-20 ml-4 text-left text-xs sm:text-xl">
          Ensure your manuscript is properly formatted, including the cover
          page, front section, title page, and author biography.
        </p>
        <p className="mt-2 max-w-2xl text-left text-xs sm:ml-20 sm:text-base sm:italic">
          We recommend hiring a desktop publisher to format your book for
          publishing. Use Canva to create a stunning and eye-catching cover, or
          work with a graphic artist for a professionally designed cover.
        </p>
      </section>

      <section className="mx-3 mt-3 sm:pt-10 ">
        <h3 className="text-2xl font-semibold">
          Step 2: Publish in digital formats
        </h3>
        <p className="my-2 text-left">
          You can publish your book as an ebook, an audiobook, or both, and
          we’ll make the available in Itan Global Stores.
        </p>
        <div className="sm:flex sm:justify-between sm:pt-8 sm:mx-20">
          <ul className="list-disc list-inside ml-1 text-xl space-y-2 font-semibold text-left w-[500px]">
            <li>
              Input your book details, including the title and author, in the
              specified fields.
            </li>
            <li>Choose your book categories.</li>
            <li>Enter keywords and tags that best describes your book.</li>
            <li>Submit your prepared manuscript and cover and review</li>
            <li>Select your list prices for each book format.</li>
            <li>Hit the “Publish” button.</li>
          </ul>
          <img
            src="/images/digital-formats.png"
            alt="digital formats"
            className="hidden sm:block sm:w-[450px]"
          />
        </div>
      </section>

      <section className="mx-3 mt-10 bg-[#DADADA] sm:flex sm:justify-between sm:px-10 py-10">
        <img
          src="/images/exposure.png"
          alt="exposure"
          className="hidden sm:block w-[350px]"
        />
        <div className='w-[650px]'>
          <h2 className="text-2xl font-semibold">
            Enhance Your Book’s Exposure -{" "}
            <span className="text-[#EF5353]">Start Promoting</span>
          </h2>
          <p className="text-left font-semibold my-2">
            Congratulations on publishing your book! Next step: promote,
            promote, promote! Here are some suggestions:
          </p>
          <ul className="list-disc list-inside ml-1 space-y-2 sm:space-y-6 font-semibold text-left">
            <li>
              Leverage Social Media by talking about your book and sharing the
              links.
            </li>
            <li>Utilize paid ad where necessary.</li>
            <li>
              Submit to Book review sites. Itan Book review service is coming
              soon.
            </li>
            <li>
              Use SEO Strategies, keywords and tags; Optimize your book’s
              description, title, and keywords for search engines to improve
              visibilty and discoverability.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Publish;