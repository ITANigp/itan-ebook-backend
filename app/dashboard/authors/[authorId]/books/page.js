import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";


const ViewBooks = () => {
   const [books, setBooks] = useState([]);
   const [loading, setLoading] = useState(true);

    useEffect(() => {
      api
        .get("http://localhost:3000/api/v1/books/")
        .then((response) => {
          setBooks(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
          setLoading(false);
        });
    }, []);
    
    if (loading) return <p>Loading books...</p>;
  return (
    <div className="ml-72 mr-8  mt-20">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold">My Book Shelf</h2>
        <img
          src="/images/filter.png"
          className="h-8 cursor-pointer shadow-lg bg-white p-1"
        />
      </div>
      <ul className="mb-10 grid grid-cols-2 gap-2">  
            {books.map((book) => (
                <li key={book.id} className="relative shadow-md p-2 bg-white flex w-full">
          {book.book_cover && (<div>
            <img
              className="h-60"
              src="/images/books/book2.png"
              alt="book name"
            />
          </div>
)}
          <div className="w-2/3 mx-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{book.title}</h3>
              <img
                src="/images/share.png"
                className="w-6 p-1 rounded-sm cursor-pointer hover:bg-gray-200"
              />
            </div>
            <p className="text-sm text-gray-800">Type: Audiobook</p>
            <p className="text-xs mt-2">
              {book.description}
            </p>
            <div className=" mt-6 absolute bottom-2">
              <div className="flex justify-between items-center space-x-36">
                <button className="text-white bg-[#E50913] hover:bg-[#ce0812] focus:ring-4 focus:outline-none focus:ring-[#e44e56] font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center">
                  Open Book
                </button>
                <p className="font-bold text-lg float-right">&#36;30</p>
              </div>
            </div>
          </div>
        </li>
          ))}
          </ul>
        


        <div className="relative shadow-md p-2 bg-white flex w-full">
          <div>
            <img
              className="h-60"
              src="/images/books/book1.png"
              alt="book name"
            />
          </div>
          <div className="w-2/3 mx-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">The Psychology of Money</h3>
              <img
                src="/images/share.png"
                className="w-6 p-1 rounded-sm cursor-pointer hover:bg-gray-200"
              />
            </div>
            <p className="text-sm text-gray-800">Type: E-Book</p>
            <p className="text-xs mt-2">
              The Psychology of Money explores how our relationship with
              money—our beliefs, biases, and habits—often matters more than our
              financial knowledge. This book offers timeless lessons on wealth,
              greed, and happiness, showing you how to build a better financial
              future by understanding your own mind. It's not about getting rich
              quick
            </p>

            <div className=" mt-6 absolute bottom-2">
              <div className="flex justify-between items-end space-x-36">
                <button className="text-white bg-[#E50913] hover:bg-[#ce0812] focus:ring-4 focus:outline-none focus:ring-[#e44e56] font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center">
                  Open Book
                </button>
                <p className="font-bold text-lg float-right">&#36;35</p>
              </div>
            </div>
          </div>
        </div>


        
        <div className="relative shadow-md p-2 bg-white flex w-full">
          <div>
            <img
              className="h-60"
              src="/images/books/book3.png"
              alt="book name"
            />
          </div>

          <div className="w-2/3 mx-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">The Deathless Girls</h3>
              <img
                src="/images/share.png"
                className="w-6 p-1 rounded-sm cursor-pointer hover:bg-gray-200"
              />
            </div>
            <p className="text-sm text-gray-800">Type: Audiobook</p>
            <p className="text-xs mt-2">
              The Psychology of Money explores how our relationship with
              money—our beliefs, biases, and habits—often matters more than our
              financial knowledge. This book offers timeless lessons on wealth,
              greed, and happiness, showing you how to build a better financial
              future by understanding your own mind. It's not about getting rich
              quick
            </p>
            <div className=" mt-6 absolute bottom-2">
              <div className="flex justify-between items-center space-x-36">
                <button className="text-white bg-[#E50913] hover:bg-[#ce0812] focus:ring-4 focus:outline-none focus:ring-[#e44e56] font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center">
                  Open Book
                </button>
                <p className="font-bold text-lg float-right">&#36;30</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative shadow-md p-2 bg-white flex w-full">
          <div>
            <img
              className="h-60"
              src="/images/books/book4.png"
              alt="book name"
            />
          </div>

          <div className="w-2/3 mx-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Black Girls, Call Home</h3>
              <img
                src="/images/share.png"
                className="w-6 p-1 rounded-sm cursor-pointer hover:bg-gray-200"
              />
            </div>
            <p className="text-sm text-gray-800">Type: E-Book</p>
            <p className="text-xs mt-2">
              The Psychology of Money explores how our relationship with
              money—our beliefs, biases, and habits—often matters more than our
              financial knowledge. This book offers timeless lessons on wealth,
              greed, and happiness, showing you how to build a better financial
              future by understanding your own mind. It's not about getting rich
              quick
            </p>

            <div className=" mt-6 absolute bottom-2">
              <div className="flex justify-between items-center space-x-36">
                <button className="text-white bg-[#E50913] hover:bg-[#ce0812] focus:ring-4 focus:outline-none focus:ring-[#e44e56] font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center">
                  Open Book
                </button>
                <p className="font-bold text-lg float-right ">&#36;40</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative shadow-md p-2 bg-white flex w-full">
          <div>
            <img
              className="h-60"
              src="/images/books/book5.png"
              alt="book name"
            />
          </div>

          <div className="w-2/3 mx-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Woven in Moonlight</h3>
              <img
                src="/images/share.png"
                className="w-6 p-1 rounded-sm cursor-pointer hover:bg-gray-200"
              />
            </div>
            <p className="text-sm text-gray-800">Type: E-Book</p>
            <p className="text-xs mt-2">
              The Psychology of Money explores how our relationship with
              money—our beliefs, biases, and habits—often matters more than our
              financial knowledge. This book offers timeless lessons on wealth,
              greed, and happiness, showing you how to build a better financial
              future by understanding your own mind. It's not about getting rich
              quick
            </p>

            <div className=" mt-6 absolute bottom-2">
              <div className="flex justify-between items-center space-x-36">
                <button className="text-white bg-[#E50913] hover:bg-[#ce0812] focus:ring-4 focus:outline-none focus:ring-[#e44e56] font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center">
                  Open Book
                </button>
                <p className="font-bold text-lg float-right">&#36;45</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative shadow-md p-2 pb-0 bg-white flex w-full">
          <div>
            <img
              className="h-60"
              src="/images/books/book6.png"
              alt="book name"
            />
          </div>

          <div className="w-2/3 mx-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">
                Circles (The Song of Achil...)
              </h3>
              <img
                src="/images/share.png"
                className="w-6 p-1 rounded-sm cursor-pointer hover:bg-gray-200"
              />
            </div>
            <p className="text-sm text-gray-800">Type: Audiobook</p>
            <p className="text-xs mt-2">
              The Psychology of Money explores how our relationship with
              money—our beliefs, biases, and habits—often matters more than our
              financial knowledge. This book offers timeless lessons on wealth,
              greed, and happiness, showing you how to build a better financial
              future by understanding your own mind. It's not about getting rich
              quick
            </p>

            <div className=" mt-6 absolute bottom-2">
              <div className="flex justify-between items-center space-x-36">
                <button className="text-white bg-[#E50913] hover:bg-[#ce0812] focus:ring-4 focus:outline-none focus:ring-[#e44e56] font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center">
                  Open Book
                </button>
                <p className="font-bold text-lg float-right">&#36;60</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
