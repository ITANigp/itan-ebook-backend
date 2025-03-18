"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import Link from "next/link";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("http://localhost:3000/api/v1/books/")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Books</h1>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="shadow-md p-4 bg-white rounded-lg flex flex-col items-center"
            >
              <Link href={`/books/${book.id}/ebook-preview`} className="w-full">
                <img
                  className="h-60 object-cover w-full rounded-lg cursor-pointer"
                  src={book.book_cover || "/images/default-book.png"}
                  alt={book.title}
                />
              </Link>
              <h2 className="text-lg font-semibold mt-2">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <div className="flex justify-between items-center w-full mt-2">
                <p className="text-green-600 font-bold">${book.price}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Buy Now
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewBooks;
