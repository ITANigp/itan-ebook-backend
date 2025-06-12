import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle } from "lucide-react";

const books = [
  {
    title: "Rise of the Jumbies",
    author: "Tracey Baptiste",
    cover: "/images/books/book4.png",
    price: 27,
    isVideo: false,
  },
  {
    title: "Glory",
    author: "NoViolet Bulawayo",
    cover: "/images/books/book4.png",
    price: 27,
    isVideo: false,
  },
  {
    title: "You made a Fool...",
    author: "Akwaeke Emezi",
    cover: "/images/books/book4.png",
    price: 27,
    isVideo: true,
  },
  {
    title: "Gaslight",
    author: "Femi Kayode",
    cover: "/images/books/book4.png",
    price: 25,
    isVideo: false,
  },
  {
    title: "Death of the Author",
    author: "Nnedi Okorafor",
    cover: "/images/books/book4.png",
    price: 27,
    isVideo: false,
  },
  {
    title: "The Lazarus Effect",
    author: "H.J. Golakai",
    cover: "/images/books/book4.png",
    price: 27,
    isVideo: false,
  },
  {
    title: "In Bed With Her Guy",
    author: "Yinka Akiran",
    cover: "/images/books/book4.png",
    price: 20,
    isVideo: false,
  },
  {
    title: "Really good, actually",
    author: "Monica Heisey",
    cover: "/images/books/book4.png",
    price: 27,
    isVideo: true,
  },
];

export default function Library() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Library</h1>
      <div className="flex gap-4 mb-6">
        {["All", "Wishlist", "Ebook", "Audiobooks", "Finished Books"].map(
          (tab, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-md shadow ${
                i === 0 ? "bg-red-600 text-white" : "bg-white text-black"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <Card key={index} className="relative">
            <div className="absolute top-2 right-2 text-red-500">
              <Heart size={18} fill="white" />
            </div>
            <div className="relative">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-60 object-cover rounded-t-xl"
              />
              {book.isVideo && (
                <PlayCircle
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full"
                  size={40}
                />
              )}
            </div>
            <CardContent className="p-4">
              <h2 className="text-sm font-semibold leading-tight">
                {book.title}
              </h2>
              <p className="text-xs text-gray-500 mb-2">By: {book.author}</p>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-500">
                    ★
                  </span>
                ))}
              </div>
              {book.price && (
                <div className="mt-3">
                  <div className="text-sm font-semibold text-red-600 mb-1">
                    ${book.price}
                  </div>
                  <Button className="w-full">Buy now</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
