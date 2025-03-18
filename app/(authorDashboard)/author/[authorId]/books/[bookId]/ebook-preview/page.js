import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BookPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api
        .get(`http://localhost:3000/api/v1/books/${id}`)
        .then((response) => {
          setBook(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching book:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-600">Author: {book.author}</p>
      {book.book_cover && (
        <img
          className="h-60 object-cover rounded-lg mt-4"
          src={book.book_cover}
          alt={book.title}
        />
      )}
      <p className="mt-4">{book.description}</p>
    </div>
  );
};

export default BookPage;
