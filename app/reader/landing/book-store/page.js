"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook, // Romance fallback
  faBookOpen, // Children Books
  faTheaterMasks, // Literature & Fiction
  faStar, // Comics, Manga
  faFingerprint, // Mystery
  faBible, // Religion & Spirituality
  faWandMagicSparkles, // Speculative
} from "@fortawesome/free-solid-svg-icons";
import StarRating from "../../(components)/StarRating"; // Assuming StarRating exists

import { getAllBook } from "@/utils/bookApi";

export default function Home() {
  const [categorizedBooks, setCategorizedBooks] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBook();
        if (response && response.data) {
          const booksData = response.data;
          const newCategorizedBooks = {};

          booksData.forEach((bookWrapper) => {
            // Access the attributes object
            const book = bookWrapper.attributes;
            const bookId = bookWrapper.id; // The unique ID is at the top level of the wrapper object

            if (book && book.categories && book.categories.length > 0) {
              const mainCategory = book.categories[0].main;
              if (mainCategory) {
                if (!newCategorizedBooks[mainCategory]) {
                  newCategorizedBooks[mainCategory] = [];
                }

                // Handle author name: check if book.author exists and if name is not an empty string
                const authorName =
                  book.author &&
                  book.author.name &&
                  book.author.name.trim() !== ""
                    ? book.author.name
                    : "Unknown Author";

                newCategorizedBooks[mainCategory].push({
                  id: bookId, // Use the ID from the wrapper object
                  title: book.title,
                  author: authorName, // Use the determined author name
                  price: book.ebook_price ? `$${book.ebook_price}` : "N/A",
                  image: book.cover_image_url || "/images/placeholder.png",
                  rating: book.average_rating || 0, // Provide a default if no rating
                });
              }
            }
          });
          setCategorizedBooks(newCategorizedBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const genres = [
    { genreName: "Romance", icon: faBook },
    { genreName: "Children Books", icon: faBookOpen },
    { genreName: "Literature & Fiction", icon: faTheaterMasks },
    { genreName: "Comics, Manga & Graphic Novels", icon: faStar },
    { genreName: "Mystery, Thriller & Suspense", icon: faFingerprint },
    { genreName: "Religion & Spirituality", icon: faBible },
    { genreName: "Speculative", icon: faWandMagicSparkles },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="text-red-600 text-xl font-bold">ITAN</div>

        <nav className="flex space-x-6 items-center">
          <Link href="#" className="text-gray-700 hover:text-black font-medium">
            Home
          </Link>
          <Link href="#" className="text-gray-700 hover:text-black font-medium">
            Library
          </Link>
          <input
            type="text"
            placeholder="Search for books using: ISBN, Keywords, Tags......"
            className="px-4 py-2 rounded-md border border-gray-300 text-sm w-96"
          />
          <button className="px-4 py-2 text-gray-700 hover:text-black font-medium">
            Sign In
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Sign Up
          </button>
        </nav>
      </header>

      <section className="relative h-[700px] flex flex-col-reverse lg:flex-row items-center justify-between px-10 lg:px-20 py-20 bg-slate-300">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold leading-snug">
            Get lost in tales only African writers can tell
          </h1>
          <p className="mt-6 text-lg text-gray-700">
            With voices that echo, characters that breathe, and plots that pull
            you in.
          </p>
          <button className="mt-8 px-6 py-3 bg-red-600 text-white text-lg rounded-md hover:bg-red-700">
            Explore our Book Store
            <span className="ml-2">▼</span>
          </button>
        </div>

        <div className="mb-10 lg:mb-0 absolute bottom-0 right-0">
          <Image
            src="/images/readers/landing/reader-landing-page.png" // Replace with actual path to image
            alt="Happy man reading a tablet"
            width={650}
            height={650}
            className="rounded-lg"
          />
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8">Explore our Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <div
              key={genre.genreName}
              className="flex flex-col justify-center border border-red-200 p-4 rounded-md text-center hover:shadow-md cursor-pointer "
            >
              <div className="flex justify-center items-center space-x-2 text-xl font-medium text-gray-700">
                <FontAwesomeIcon
                  icon={genre.icon}
                  size="2x"
                  className="text-gray-600 "
                />
                <p>{genre.genreName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamically render sections for each category with books */}
      {genres.map((genre, index) => {
        const booksForGenre = categorizedBooks[genre.genreName] || [];
        if (booksForGenre.length === 0) {
          return null; // Don't render section if no books in this category
        }

        const sectionBgColor = index % 2 === 0 ? "bg-blue-50" : "bg-pink-100"; // Alternate background colors

        return (
          <section
            key={genre.genreName}
            className={`${sectionBgColor} px-6 py-16`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{genre.genreName}</h2>
              <Link href="#" className="text-red-600 text-sm font-medium">
                See more →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {booksForGenre.map((book) => (
                <div
                  key={book.id} // Use book.id as key
                  className="bg-white rounded-md shadow hover:shadow-lg p-4"
                >
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={200}
                    height={300}
                    className="mb-4 mx-auto"
                  />
                  {/* Render StarRating only if rating is available and greater than 0 */}
                  {book.rating > 0 && <StarRating rating={book.rating} />}
                  <h3 className="font-semibold text-md mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
                  <p className="text-red-600 font-bold">{book.price}</p>
                  <Link
                    href={`/reader/landing/book-details/${book.id}`} // Ensure this matches your BookDetails page path
                    className="block text-sm text-red-600 mt-2 hover:underline"
                  >
                    View details
                  </Link>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <div className="text-center cursor-pointer bg-[#E50913] text-white py-2">
        <p>Back to top</p>
      </div>
    </main>
  );
}
