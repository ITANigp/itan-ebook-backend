"use client";

import { api } from "@/utils/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BookPage = () => {
  const { bookId } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookId) {
      api
        .get(`/books/${bookId}`)
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
    <div className="container mx-auto p-4 ml-72 mr-8  mt-24 ">
      <h1>
        {book.cover_image_url && (
          <img
            className="h-60 w-64 object-cover rounded-lg mt-4"
            src={book?.cover_image_url}
            alt={book.title}
          />
        )}
        Title: <span className="font-bold">{book?.title}</span>
      </h1>
      <p className="text-gray-600">Ebook Price: {book?.ebook_price}</p>
      <p className="text-gray-600">ISBN: {book?.book_isbn}</p>
      <p className="mt-4">
        Description: {book?.description || "No description available."}
      </p>
      {console.log(book.ebook_file_url)}
      <Link
        href={`${book.ebook_file_url}`}
        target="_blank"
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-300"
      >
        Read
      </Link>
    </div>
  );
};

export default BookPage;
