// This component inserts data into the book list detail

import "./Card.css";
import Star from "../../components/AddBook/Star";

function Card({ book }) {
  return (
    <div className="bookInfo">
      <div className="imageDiv">
        {book.image ? (
          <img
            src={book.image}
            className="bookImage"
            alt={`The cover for ${book.title}`}
          />
        ) : null}
      </div>

      <div className="notesDiv">
        <p className="font-normal dark:text-gray-400">{book.comment} </p>

        {book.rating > 0 ? (
          <div className="star-container">
            {book.rating >= 1 && <Star />} {book.rating >= 2 && <Star />}{" "}
            {book.rating >= 3 && <Star />} {book.rating >= 4 && <Star />}{" "}
            {book.rating >= 5 && <Star />}
          </div>
        ) : null}
        {book.description ? (
          <div className="description">{book.description}</div>
        ) : null}
      </div>
    </div>
  );
}

export { Card };
