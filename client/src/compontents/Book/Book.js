import "./Book.css";
import { Draggable } from "@hello-pangea/dnd";

function Book({ bookId, book, bookIndex }) {
  return (
    <Draggable key={bookId} draggableId={bookId} index={bookIndex}>
      {(provided) => (
        <li
          className={`book ${book.color} ${book.thickness} ${book.height}${
            book.paperback ? " paperback" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span key="title" className="title">
            {book.title}
          </span>
          <span key="author" className="author">
            {book.author}
          </span>
        </li>
      )}
    </Draggable>
  );
}

export { Book };
