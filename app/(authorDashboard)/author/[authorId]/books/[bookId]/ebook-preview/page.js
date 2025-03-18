import Link from "next/link";
import axios from "axios";

export async function getServerSideProps() {
  try {
    const res = await axios.get("http://localhost:3000/api/v1/books");
    return { props: { books: res.data } };
  } catch (error) {
    console.error("Error fetching books:", error);
    return { props: { books: [] } };
  }
}

const BooksList = ({ books }) => {
  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link href={`/book/${book.id}`}>
              <a>{book.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
