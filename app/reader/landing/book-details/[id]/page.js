"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import BuyButton from "@/components/reader/BuyButton";

export default function BookDetails() {
  const params = useParams();
  const bookId = params.id;

  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookId) {
      setLoading(false);
      return;
    }

    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/v1/books/${bookId}/storefront`
        );

        if (!response.ok) {
          if (response.status === 404) {
            setError("Book not found.");
          } else {
            setError(`Failed to fetch book details: ${response.statusText}`);
          }
          return;
        }

        const jsonResponse = await response.json();
        // Assuming the actual book data is within jsonResponse.data.attributes
        // And the unique_book_id is jsonResponse.data.id
        setBookData({
          ...jsonResponse.data.attributes,
          unique_book_id: jsonResponse.data.id, // Extract ID from data level
        });
        console.log("Fetched Book Data:", jsonResponse.data.attributes); // Log the attributes specifically
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return <div className="text-center py-20">Loading book details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">Error: {error}</div>;
  }

  if (!bookData) {
    return <div className="text-center py-20">No book data available.</div>;
  }

  // Destructure bookData for easier access, reflecting the 'attributes' structure
  const {
    title,
    description,
    ebook_price,
    cover_image_url,
    total_pages,
    categories, // This will now be null if the API sends it as such
    author, // This will be the author object { id, name }
    average_rating,
    reviews,
    reviews_count,
    ebook_file_url,
    unique_book_id, // This is now directly available from the state
  } = bookData;

  // Format author name (now from author.name)
  const authorName = author?.name?.trim() || "Unknown Author";

  // Display price in Nigerian Naira (₦) as per current location, or default to generic $
  // Assuming ebook_price is in the smallest currency unit (e.g., kobo for Naira, cents for Dollar)
  const displayPrice = ebook_price
    ? `₦${(ebook_price / 100).toFixed(2)}` // Divide by 100 to convert from kobo to Naira
    : "N/A";

  // Handle categories (if `categories` is null or not an array)
  const displayGenre =
    categories && Array.isArray(categories) && categories.length > 0
      ? categories[0].main // If categories is an array with items
      : "N/A";

  // Publication date: Your sample JSON doesn't include 'publication_date' but 'created_at'
  // If 'publication_date' is intended, ensure your API returns it.
  // For now, using a placeholder or created_at if it fits the purpose.
  // The sample JSON showed 'created_at'. If you want to use it:
  const displayPublicationDate = bookData.created_at
    ? new Date(bookData.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const displayLength = total_pages ? `${total_pages} Pages` : "N/A";
  const displaySize = "409.4 kb"; // Placeholder as discussed, ideally from API

  const displayRating =
    average_rating && average_rating > 0
      ? "★".repeat(Math.round(average_rating)) +
        "☆".repeat(5 - Math.round(average_rating))
      : "No ratings yet";

  return (
    <div className="space-y-10 px-6 py-10">
      {/* Book Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={cover_image_url || "/images/placeholder.png"}
          alt={title || "Book cover"}
          width={150}
          height={220}
          className="rounded object-cover"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-gray-700">{authorName}</p>

          <div className="text-red-600 text-lg">
            {displayRating} ({reviews_count || 0} Ratings)
          </div>

          <div className="flex gap-4 mt-4">
            <BuyButton
              bookId={unique_book_id || bookId}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Buy now ({displayPrice})
            </BuyButton>
            <Button variant="outline">Add to Wishlist</Button>
            {ebook_file_url && (
              <Button
                variant="secondary"
                onClick={() => window.open(ebook_file_url, "_blank")}
              >
                Read Sample
              </Button>
            )}
          </div>
        </div>
      </div>
      ---
      {/* Description */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Publisher’s Description</h3>
        <p className="text-gray-700 leading-relaxed ">
          {description || "No description available."}
        </p>
      </section>
      ---
      {/* Book Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center border-t border-b py-4">
        <div>
          <strong>GENRE</strong>
          <p>{displayGenre}</p>
        </div>
        <div>
          <strong>PUBLICATION DATE</strong>
          <p>{displayPublicationDate}</p>
        </div>
        <div>
          <strong>LANGUAGE</strong>
          <p>English</p> {/* Keep as is, or fetch from API if available */}
        </div>
        <div>
          <strong>LENGTH</strong>
          <p>{displayLength}</p>
        </div>
        <div>
          <strong>SIZE</strong>
          <p>{displaySize}</p> {/* Placeholder */}
        </div>
      </div>
      ---
      {/* Reviews */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        {reviews && reviews.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="min-w-[300px]">
                <CardContent className="p-4 space-y-2">
                  <p className="font-semibold">{review.title}</p>
                  <p className="text-sm text-gray-700">{review.content}</p>
                  <div className="text-red-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(review.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    {review.user_name || "Anonymous"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No customer reviews yet. Be the first to share your thoughts!
          </p>
        )}
      </section>
      ---
      {/* More Books by the same author */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          More Books by {authorName}
        </h3>
        {/* This section would require another API call to fetch books by this author */}
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(4)].map((_, i) => (
            <Image
              key={i}
              src="/rise-of-the-jumbies.jpg" // Placeholder for related books
              alt="More Book"
              width={100}
              height={150}
              className="rounded object-cover"
            />
          ))}
        </div>
        <p className="text-gray-600 mt-2">
          (This section currently shows placeholder images. Implement a separate
          API call to display actual books by this author.)
        </p>
      </section>
    </div>
  );
}
