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

const Readers = async () => {
  // const books = await getAllBooks();

  const readerList = [
    {
      accountName: "Mr. Oluyemi 01",
      email: "oluola96@gmail.com",
      phoneNumber: "09145673425",
      regNo: "Ebook",
      profilePicture: "/images/picture.png"
    },
    {
      accountName: "Mr. Oluyemi 02",
      email: "oluola96@gmail.com",
      phoneNumber: "09145673425",
      regNo: "Ebook",
      profilePicture: "/images/picture.png"
    },
    {
      accountName: "Mr. Oluyemi 03",
      email: "oluola96@gmail.com",
      phoneNumber: "09145673425",
      regNo: "Ebook",
      profilePicture: "/images/picture.png"
    },
    {
      accountName: "Mr. Oluyemi 04",
      email: "oluola96@gmail.com",
      phoneNumber: "09145673425",
      regNo: "Ebook",
      profilePicture: "/images/picture.png"
    },
    {
      accountName: "Mr. Oluyemi 05",
      email: "oluola96@gmail.com",
      phoneNumber: "09145673425",
      regNo: "Ebook",
      profilePicture: "/images/picture.png"
    },
    {
      accountName: "Mr. Oluyemi 06",
      email: "oluola96@gmail.com",
      phoneNumber: "09145673425",
      regNo: "Ebook",
      profilePicture: "/images/picture.png"
    },
    {
      accountName: "Mr. Oluyemi 07",
      email: "oluola96@gmail.com",
      phoneNumber: "09145673425",
      regNo: "Ebook",
      profilePicture: "/images/picture.png"
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
                <TableHead className="text-white">Account Name</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Phone Number</TableHead>
                <TableHead className="text-white">Registration Date</TableHead>
                <TableHead className="text-white"></TableHead>
              </TableRow>

              {/* Filter Icon Row */}
              <TableRow className="hover:bg-white">
                <TableHead />
                <TableHead />
                <TableHead />
                <TableHead />
                <TableHead className="align-middle">
                  <FontAwesomeIcon
                    icon={faSlidersH}
                    className="text-slate-700 w-6 h-10 py-1 bg-slate-100 shadow-lg rounded-md cursor-pointer"
                  />
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {readerList.map((reader) => (
                <TableRow key={reader.accountName}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Image
                      src={reader.profilePicture}
                      width={20}
                      height={20}
                      alt="reader cover"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="align-middle">{reader.accountName}</p>
                  </TableCell>
                  <TableCell className="align-middle">{reader.email}</TableCell>
                  <TableCell className="align-middle">
                    {reader.phoneNumber}
                  </TableCell>
                  <TableCell className="align-middle">{reader.regNo}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Readers;
