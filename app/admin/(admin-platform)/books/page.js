import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { getAllBooks } from "@/utils/db/admin/bookApi";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const Books = async () => {
  // const books = await getAllBooks();

  const bookList = [
    {
      bookName: "Cyber Security 01",
      bookCover: "/images/books/book1.png",
      author: "Mr Oluyemi",
      bookType: "Ebook",
      bookStatus: "Live",
      date: "06 June, 2025",
    },
    {
      bookName: "Cyber Security 02",
      bookCover: "/images/books/book1.png",
      author: "Mr Oluyemi",
      bookType: "Ebook",
      bookStatus: "Live",
      date: "06 June, 2025",
    },
    {
      bookName: "Cyber Security 03",
      bookCover: "/images/books/book1.png",
      author: "Mr Oluyemi",
      bookType: "Ebook",
      bookStatus: "Live",
      date: "06 June, 2025",
    },
    {
      bookName: "Cyber Security 04",
      bookCover: "/images/books/book1.png",
      author: "Mr Oluyemi",
      bookType: "Ebook",
      bookStatus: "Live",
      date: "06 June, 2025",
    },
    {
      bookName: "Cyber Security 05",
      bookCover: "/images/books/book1.png",
      author: "Mr Oluyemi",
      bookType: "Ebook",
      bookStatus: "Live",
      date: "06 June, 2025",
    },
    {
      bookName: "Cyber Security 06",
      bookCover: "/images/books/book1.png",
      author: "Mr Oluyemi",
      bookType: "Ebook",
      bookStatus: "Live",
      date: "06 June, 2025",
    },
    {
      bookName: "Cyber Security 07",
      bookCover: "/images/books/book1.png",
      author: "Mr Oluyemi",
      bookType: "Ebook",
      bookStatus: "Live",
      date: "06 June, 2025",
    },
  ];

  return (
    <div className="ml-3">
      <h2>Books</h2>
      <div className="flex w-[600px] justify-between mt-3">
        <div className="flex flex-col w-[120px] h-[120px] justify-evenly pt-3 items-center border border-orange-200 rounded-md">
          <p className="text-sm">All Books</p>
          <p className="text-2xl font-bold">10,450</p>
          <p />
        </div>

        <div className="flex flex-col w-[120px] h-[120px] justify-evenly pt-3  text-orange-300 items-center border border-orange-200 rounded-md">
          <p className="text-sm">Download Books</p>
          <p className="text-2xl font-bold">10,450</p>
          <p />
        </div>

        <div className="flex flex-col w-[120px] h-[120px] justify-evenly pt-3 text-green-600 items-center border border-orange-200 rounded-md">
          <p className="text-sm">Bought Books</p>
          <p className="text-2xl font-bold">10,450</p>
          <p />
        </div>

        <div className="flex flex-col w-[120px] h-[120px] justify-evenly pt-3 text-red-600 items-center border border-orange-200 rounded-md">
          <p className="text-sm">Rejected Books</p>
          <p className="text-2xl font-bold">10,450</p>
          <p />
        </div>
      </div>
      {/* <ul>
        {books?.data?.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul> */}
      <div className="relative mt-5">
        <div className="relative">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-700 hover:bg-slate-700 rounded-lg">
                <TableHead className="text-white">
                  Book Name
                </TableHead>
                <TableHead className="text-white">Author</TableHead>
                <TableHead className="text-white">Book Types</TableHead>
                <TableHead className="text-white">Book Status</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white"></TableHead>
              </TableRow>

              <TableRow className="hover:bg-white">
                <TableHead />
                <TableHead />
                <TableHead />
                <TableHead />
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
              {bookList.map((book) => (
                <TableRow key={book.bookName}>
                  <TableCell className="font-medium">
                    <Image
                      src={book.bookCover}
                      width={70}
                      height={120}
                      alt="book cover"
                      className="w-24 h-auto"
                    />
                    <p>{book.bookName}</p>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.bookType}</TableCell>
                  <TableCell>{book.bookStatus}</TableCell>
                  <TableCell>{book.date}</TableCell>
                  <TableCell>
                    <FontAwesomeIcon
                      icon={faEllipsisH}
                      className="cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Books;
