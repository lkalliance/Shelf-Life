import "./Card.css";
import Star from "../../components/AddBook/Star";

function Card({ book }) {
  console.log(book);
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

        <div className="star-container">
          {book.rating >= 1 && <Star />} {book.rating >= 2 && <Star />}{" "}
          {book.rating >= 3 && <Star />} {book.rating >= 4 && <Star />}{" "}
          {book.rating >= 5 && <Star />}
        </div>
        {book.description ? (
          <div className="description">{book.description}</div>
        ) : null}
      </div>
    </div>
  );
}

export { Card };
