import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Search, User } from "lucide-react";

export default function Home() {
  const books = [
    {
      title: "Rise of the Jumbies",
      author: "Tracey Baptiste",
      price: "$40",
      image: "/books/jumbies.jpg",
    },
    {
      title: "Glory",
      author: "NoViolet Bulawayo",
      price: "$30",
      image: "/books/glory.jpg",
    },
    {
      title: "You made a Fool...",
      author: "Akwaeke Emezi",
      price: "$20",
      image: "/books/fool.jpg",
    },
    {
      title: "Gaslight",
      author: "Femi Kayode",
      price: "$20",
      image: "/books/gaslight.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
        <div className="text-xl font-bold text-red-600">ITAN</div>
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li className="text-red-600">Home</li>
          <li>Book Store</li>
          <li>Library</li>
          <li>Pricing</li>
        </ul>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for books..."
              className="pl-10 pr-4 py-1.5 border rounded-full text-sm"
            />
            <Search className="absolute top-1.5 left-3 h-4 w-4 text-gray-500" />
          </div>
          <User className="h-6 w-6 text-gray-700" />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full h-64 md:h-96 relative">
        <Image
          src="/hero/romance-couple.jpg"
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
                  src="/hero/romance-couple.jpg"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book, idx) => (
            <Card key={idx} className="relative">
              <Heart className="absolute top-2 right-2 text-gray-500 w-5 h-5 cursor-pointer" />
              <CardContent className="p-4">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={150}
                  height={200}
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
