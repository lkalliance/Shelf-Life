import "./Card.css";

function Card({ book }) {
  return (
    <div
      key={book.bookId}
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      {book.image ? (
        <img src={book.image} alt={`The cover for ${book.title}`} />
      ) : null}
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {book.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {book.authors.join(", ")}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {book.rating === 1 ? `${book.rating} star` : `${book.rating} stars`}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {book.comment}{" "}
      </p>
    </div>
  );
}

export { Card };
