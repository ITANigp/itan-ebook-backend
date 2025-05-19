"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { api } from "@/utils/auth/authorApi";
import { storedAuthorInfo } from "@/utils/storedAuthorInfo";
import BookMenu from "@/components/BookMenu";
import DeleteModal from "@/components/DeleteModal";
import toast from "react-hot-toast";

export default function AuthorBooks() {
  const [books, setBooks] = useState([]);
  const [deleteBook, setDeleteBook] = useState(false);
  const [openMenuForBookId, setOpenMenuForBookId] = useState(null);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const bookMenuRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { id: authorId } = storedAuthorInfo;

  if (!authorId) {
    alert("Sign in to continue!");
    router.push("/author/sign_in");
  }

  useEffect(() => {
    api
      .get("/books/my_books")
      .then((response) => {
        console.log("Fetch All Books: ", response.data);
        if (Array.isArray(response.data.data)) {
          setBooks(response.data.data);
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
      .delete(`/books/${bookId}`)
      .then((response) => {
        if (response.status === 200) {
          setDeleteBook(false);
          toast.success("Book deleted successfully!");

          setBooks((prevBooks) =>
            prevBooks.filter((book) => book.id !== bookId)
          );
        }
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          toast.success("You are not authorized to delete this book.");
        } else {
          console.error("Error deleting book:", error);
          alert("An error occurred while deleting the book. Please try again.");
        }
      });
  };

  const handleEdit = (book) => {
    router.push(`/author/${authorId}/books/create/book-details?id=${book.id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bookMenuRef.current && !bookMenuRef.current.contains(event.target)) {
        setOpenMenuForBookId(null);
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <section className="lg:ml-72 sm:mr-8 sm:mt-24 mb-8 lg:container lg:mx-auto">
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        books.map((book) => (
          <div
            key={book.id}
            className="sm:flex rounded-lg sm:justify-between mx-auto shadow-md relative"
          >
            <div className="flex justify-between my-3 ml-6 sm:hidden">
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

              <div className="sm:absolute right-0 sm:flex sm:flex-col justify-between items-end h-full mr-3">
                <img
                  src="/images/book-menu.png"
                  alt="book menu"
                  className="h-1 w-5 mt-3 cursor-pointer"
                  onClick={() => {
                    setOpenMenuForBookId(
                      openMenuForBookId === book.id ? null : book.id
                    );
                    setOpenMenu(true);
                  }}
                />
                {openMenuForBookId === book.id && isOpenMenu && (
                  <BookMenu
                    ref={bookMenuRef}
                    book={book}
                    onHandleEdit={(book) => {
                      handleEdit(book);
                      setOpenMenu(false);
                    }}
                    onHandleSetDeleteModalOpen={() => {
                      setDeleteBook(true);
                      setOpenMenu(false);
                    }}
                    onCloseMenu={() => setOpenMenu(false)}
                  />
                )}
                {openMenuForBookId === book.id && deleteBook && (
                  <DeleteModal
                    onHandleSetDeleteModalClose={() => setDeleteBook(false)}
                    onHandleDeleteBook={() => handleDelete(book.id)}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col items-center sm:border-r border-r-gray-600 mb-2 mt-3 pr-9 mx-auto ">
              <Link href={`/author/${authorId}/books/${book.id}/ebook-preview`}>
                <img
                  src={book.cover_image_url || "/images/book-shelf.png"}
                  alt={book.title}
                  className="w-36 h-44 ml-3 rounded-lg mr-2"
                />
              </Link>
              <div className="text-center sm:text-left">
                <p className="font-semibold w-32">{book.title}</p>
                <p className="text-sm">By {book.author || "Oluyemi Paul"}</p>
              </div>
            </div>

            <div className="border-b border-b-gray-600 h-1 w-full mx-12 sm:hidden" />

            <div className="hidden sm:flex flex-col  justify-between my-3 ml-6">
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

            <p className="sm:hidden text-center">
              Last Updated on <span>March 9, 2025</span>
            </p>

            <div className="flex  justify-between w-full sm:hidden">
              <p />
              <p className="mb-3 mr-3">
                Book Type: <span>Ebook</span>
              </p>
            </div>

            <div className="sm:flex-1 sm:relative hidden sm:block">
              <div className="sm:absolute right-0 sm:flex sm:flex-col justify-between items-end h-full mr-3">
                <img
                  src="/images/book-menu.png"
                  alt="book menu"
                  className="h-1 w-5 mt-3 cursor-pointer"
                  onClick={() => {
                    setOpenMenuForBookId(
                      openMenuForBookId === book.id ? null : book.id
                    );
                    setOpenMenu(true);
                  }}
                />
                {openMenuForBookId === book.id && isOpenMenu && (
                  <BookMenu
                    ref={bookMenuRef}
                    book={book}
                    onHandleEdit={(book) => {
                      handleEdit(book);
                      setOpenMenu(false);
                    }}
                    onHandleSetDeleteModalOpen={() => {
                      setDeleteBook(true);
                      setOpenMenu(false);
                    }}
                    onCloseMenu={() => setOpenMenu(false)}
                  />
                )}
                {openMenuForBookId === book.id && deleteBook && (
                  <DeleteModal
                    onHandleSetDeleteModalClose={() => setDeleteBook(false)}
                    onHandleDeleteBook={() => handleDelete(book.id)}
                  />
                )}
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
