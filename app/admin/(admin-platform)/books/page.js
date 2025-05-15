// app/books/page.tsx (or wherever the route is)

import { getAllBooks } from "@/utils/db/admin/bookApi";

const Books = async () => {
  const books = await getAllBooks();

  return (
    <div>
      <h1>All Books</h1>
      <ul>
        {books?.data?.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
