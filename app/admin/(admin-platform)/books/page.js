"use client";

import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatDate from "@/utils/formatDate";
import { faSlidersH, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { api, getAllBooks } from "@/utils/auth/adminApi";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getAllBooks();
        setBooks(books || []);
        console.log("All books from Admin Panel:", books);
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    if (filter === "all") return true;
    return book.approval_status === filter;
  });

  const handleReject = async (bookId) => {
    try {
      const response = await api.patch(`/admin/books/${bookId}/reject`, {
        admin_feedback:
          "This book needs revisions on chapters 2-4. Content is inappropriate.",
      });
      console.log("Book is rejected: ", response.data);
    } catch (err) {
      console.log("Error rejecting the book: ", err);
    }
  };

  const handleApprove = async (bookId) => {
    try {
      const response = await api.patch(`/admin/books/${bookId}/approve`, {
        admin_feedback: "Congratulations, your book is approved",
      });
      console.log("Book is approved: ", response.data);
    } catch (err) {
      console.log("Error approving the book: ", err);
    }
  };

  if (loading) {
    return <p className="ml-3 mt-5">Loading books...</p>;
  }

  return (
    <div className="ml-3">
      <h2>Books</h2>
      <div className="grid gap-y-5 mb-5 xxs:grid-cols-2 xs:grid-cols-3 medium:grid-cols-3 sm:grid-cols-4 max-w-[600px] justify-between mt-3">
        <div className="flex flex-col w-[120px] h-[120px] justify-evenly pt-3 items-center border border-orange-200 rounded-md">
          <p className="text-sm">All Books</p>
          <p className="text-2xl font-bold">10,450</p>
        </div>

        <div className="flex flex-col w-[120px] h-[120px] justify-evenly pt-3 text-orange-300 items-center border border-orange-200 rounded-md">
          <p className="text-sm">Download Books</p>
          <p className="text-2xl font-bold">10,450</p>
        </div>

        <div className="flex flex-col w-[120px] h-[120px] justify-evenly pt-3 text-green-600 items-center border border-orange-200 rounded-md">
          <p className="text-sm">Bought Books</p>
          <p className="text-2xl font-bold">10,450</p>
        </div>

        <div className="flex flex-col w-[120px] h-[120px] justify-evenly pt-3 text-red-600 items-center border border-orange-200 rounded-md">
          <p className="text-sm">Rejected Books</p>
          <p className="text-2xl font-bold">10,450</p>
        </div>
      </div>

      <div className="overflow-x-auto w-full max-w-[850px] relative">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-700 hover:bg-slate-700 rounded-lg">
              <TableHead className="text-white">Book Name</TableHead>
              <TableHead className="text-white">Author</TableHead>
              <TableHead className="text-white">Book Types</TableHead>
              <TableHead className="text-white">Book Status</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white"></TableHead>
            </TableRow>

            <TableRow className="hover:bg-white">
              <TableHead>
                <button
                  onClick={() => setFilter("all")}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  All
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => setFilter("pending")}
                  className="px-4 py-2 bg-yellow-200 rounded"
                >
                  Pending
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => setFilter("rejected")}
                  className="px-4 py-2 bg-red-200 rounded"
                >
                  Rejected
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => setFilter("approved")}
                  className="px-4 py-2 bg-green-200 rounded"
                >
                  Approved
                </button>
              </TableHead>
              <TableHead />
              <TableHead>
                <FontAwesomeIcon
                  icon={faSlidersH}
                  className="text-slate-700 w-6 h-10 py-1 bg-slate-100 shadow-lg rounded-md cursor-pointer"
                />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/books/book-details/${book.id}`}>
                      <Image
                        src={book.cover_image_url}
                        width={70}
                        height={120}
                        alt="book cover"
                        className="w-24 h-auto"
                      />
                    </Link>
                    <p>{book.title}</p>
                  </TableCell>
                  <TableCell>
                    {book.first_name} {book.last_name}
                  </TableCell>
                  <TableCell>{book?.unique_book_id ? "Ebook" : ""}</TableCell>
                  <TableCell>{book.approval_status}</TableCell>
                  <TableCell>{book.date}</TableCell>
                  <TableCell>{formatDate(book.created_at)}</TableCell>
                  <TableCell className="flex flex-col">
                    <FontAwesomeIcon
                      icon={faEllipsisH}
                      className="cursor-pointer"
                    />
                    <button
                      onClick={() => handleReject(book.id)}
                      className="text-red-600 cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(book.id)}
                      className="text-green-600 cursor-pointer"
                    >
                      Accept
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No books found for "{filter}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Books;
