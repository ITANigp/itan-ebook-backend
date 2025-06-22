"use client";

import {useState} from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, } from "lucide-react";

export default function Home({ readerToken, bookId }) {
  const [authUrl, setAuthUrl] = useState("");

  const handlePurchase = async () => {
    try {
      const res = await createPurchase(readerToken, bookId);
      setAuthUrl(res.authorization_url);
      window.location.href = res.authorization_url; // redirect to Paystack
    } catch (err) {
      console.error("Purchase failed:", err);
    }
  };

  const books = [
    {
      title: "Rise of the Jumbies",
      author: "Tracey Baptiste",
      price: "$40",
      image: "/images/books/book1.png",
    },
    {
      title: "Glory",
      author: "NoViolet Bulawayo",
      price: "$30",
      image: "/images/books/book2.png",
    },
    {
      title: "You made a Fool...",
      author: "Akwaeke Emezi",
      price: "$20",
      image: "/images/books/book3.png",
    },
    {
      title: "Gaslight",
      author: "Femi Kayode",
      price: "$20",
      image: "/images/books/book4.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="w-full h-64 md:h-96 relative">
        <Image
          src="/images/readers/home-hero.png"
          alt="Hero"
          fill
          className="object-cover"
        />
      </div>

      {/* Genres */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="relative h-40 rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  src="/images/readers/home-hero.png"
                  alt="Romance Genre"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    Romance
                  </span>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Popular Trending */}
      <section className="px-6 pb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Popular Trending</h2>
          <a href="#" className="text-sm text-red-500">
            See more →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
          {books.map((book, idx) => (
            <Card key={idx} className="relative w-[200px]">
              <Heart className="absolute top-2 right-2 text-gray-500 w-6 h-6 cursor-pointer bg-slate-100 rounded-full p-1" />
              <CardContent className="py-2">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={150}
                  height={250}
                  className="mx-auto mb-3"
                />
                <h3 className="font-bold text-sm text-center">{book.title}</h3>
                <p className="text-xs text-center text-gray-500">
                  By: {book.author}
                </p>
                <div className="text-center text-green-600 font-semibold mt-2">
                  {book.price}
                </div>
                <div className="flex justify-center mt-2">
                  <Button size="sm">Buy now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
