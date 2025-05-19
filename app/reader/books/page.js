"use client";

import { useEffect, useState } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/books`
        );
        const data = await res.json();
        console.log("Fetched data:", data);
        setBooks(data.books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]); // fallback
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Readers, Welcome to Itan Books</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <h1>No Approved books yet</h1>
      )}
    </div>
  );
};

export default Books;
