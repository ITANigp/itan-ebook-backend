"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"

import { api } from "@/utils/api"; // Ensure this imports your API client
import { storedAuthorInfo } from "@/utils/storedAuthorInfo";
import BookMenu from "@/components/BookMenu";

export default function AuthorBooks() {
  const [books, setBooks] = useState([]);
  const [isBookMenuOpen, setBookMenuOpen] = useState(false);
  const bookMenuRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  const { id: authorId } = storedAuthorInfo;

  if ( !authorId ) {
    alert("Sign in to continue!");
    router.push("/author/sign_in");
    
  }
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

   const handleEdit = (book) => {
     router.push(
       `/author/${authorId}/books/create/book-details?id=${book.id}`
     );
   };

   useEffect(() => {
     const handleClickOutside = (event) => {
       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
         setBookMenuOpen(false);
       }
     };

     if (isBookMenuOpen) {
       document.addEventListener("mousedown", handleClickOutside);
     } else {
       document.removeEventListener("mousedown", handleClickOutside);
     }

     return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [isBookMenuOpen]);

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <section className="sm:ml-72 sm:mr-8  sm:mt-24 mb-8">
      {/* {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="shadow-md p-4 bg-white rounded-lg flex flex-col items-center"
            >
              <Link
                href={`/author/${authorId}/books/${book.id}/ebook-preview`}
                className="w-full"
              >
                <img
                  className="h-60 object-cover w-full rounded-lg cursor-pointer"
                  src={book.cover_image_url || "/images/default-book.png"}
                  alt={book.title}
                />
              </Link>
              <h2 className="text-lg font-semibold mt-2">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <div className="flex justify-between items-center w-full mt-2">
                <p className="text-green-600 font-bold">${book?.ebook_price}</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
                <Link
                  href={`${book.ebook_file_url}`}
                  target="_blank"
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-300"
                >
                  Read
                </Link>
              </div>
              <button onClick={() => handleEdit(book)}>Edit</button>
            </li>
          ))}
        </ul>
      )} */}

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        books.map((book) => (
          <div
            key={book.id}
            className="flex rounded-lg justify-between mx-auto shadow-md"
          >
            <div className="flex items-center border-r border-r-gray-600 mb-2 mt-3 pr-9">
              <Link href={`/author/${authorId}/books/${book.id}/ebook-preview`}>
                <img
                  src={book.cover_image_url || "/images/book-shelf.png"}
                  alt={book.title}
                  className="w-36 h-44 ml-3 rounded-lg mr-2"
                />
              </Link>
              <div>
                <p className="font-semibold w-32">{book.title}</p>
                <p className="text-sm">By {book.author || "Oluyemi Paul"}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between my-3 ml-6">
              <div className="flex items-center">
                <p>
                  Book Status:{" "}
                  <span className="text-[#FF9A6C] font-semibold">
                    IN REVIEW
                  </span>
                </p>
                <img
                  src="/images/status.png"
                  alt="status"
                  className="w-3 h-3 ml-1"
                />
              </div>

              <p>
                Last Updated on <span>March 9, 2025</span>
              </p>
            </div>

            <div className="flex-1 relative">
              <BookMenu ref={bookMenuRef} className="hidden"/>

              <div className="absolute right-0 flex flex-col justify-between items-end h-full mr-3">
                <img
                  src="/images/book-menu.png"
                  alt="book menu"
                  className="h-1 w-5 mt-3"
                />
                <p className="mb-3">
                  Book Type: <span>Ebook</span>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
