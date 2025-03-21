"use client";

import { api } from "@/utils/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BookPage = () => {
  const { bookId } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookId) {
      api
        .get(`http://localhost:3000/api/v1/books/${bookId}`)
        .then((response) => {
          setBook(response.data.data);
          console.log("Single Book: ", response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching book:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [bookId]);

  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-600">Author: {book.author || "Unknown Author"}</p>
      {book.book_cover && (
        <img
          className="h-60 object-cover rounded-lg mt-4"
          src={book.book_cover}
          alt={book.title}
        />
      )}
      <p className="mt-4">{book.description || "No description available."}</p>
    </div>
  );
};

export default BookPage;
