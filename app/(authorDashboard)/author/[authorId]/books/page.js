"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import Link from "next/link";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    api
      .get("http://localhost:3000/api/v1/books/")
      .then((response) => {
        console.log("Fetch All Books: ", response.data);
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  };

  const handleDelete = async (bookId) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await api.delete(
        `http://localhost:3000/api/v1/books/${bookId}`
      );
      if (response.status === 200) {
        alert("Book deleted successfully.");
        setBooks(books.filter((book) => book.id !== bookId));
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

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
              <button
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewBooks;
