"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api"; // Ensure this imports your API client

export default function AuthorBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("http://localhost:3000/api/v1/books/")
      .then((response) => {
        console.log("Fetch All Books: ", response.data);
        if (Array.isArray(response.data.data)) {
          setBooks(response.data.data); // ✅ Correct way to access books
        } else {
          console.error("Unexpected API response format", response.data);
          setBooks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setBooks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (bookId) => {
    api
      .delete(`/api/v1/books/${bookId}`)
      .then((response) => {
        if (response.status === 200) {
          alert("Book deleted successfully!");
          // Update the state to remove the deleted book
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book.id !== bookId)
          );
        }
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          alert("You are not authorized to delete this book.");
        } else {
          console.error("Error deleting book:", error);
          alert("An error occurred while deleting the book. Please try again.");
        }
      });
  };

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="shadow-md p-4 bg-white rounded-lg flex flex-col items-center"
            >
              <Link href={`/author/1/books/${book.id}/ebook-preview`} className="w-full">
                <img
                  className="h-60 object-cover w-full rounded-lg cursor-pointer"
                  src={book.cover_image_url || "/images/default-book.png"}
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
}
