import "./Book.css";
import { Draggable } from "@hello-pangea/dnd";

function Book({ bookItem, book, bookIndex }) {
  return (
    <Draggable key={bookItem.id} draggableId={bookItem.id} index={bookIndex}>
      {(provided) => (
        <li
          className={`book ${book.color}`}
          key={book.id}
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
