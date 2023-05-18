import "./Book.css";
import { Draggable } from "@hello-pangea/dnd";
import { isTight } from "../../utils/dragUtils";

function Book({ bookId, book, bookIndex }) {
  return (
    <Draggable key={bookId} draggableId={bookId} index={bookIndex}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={`book ${book.color} ${book.thickness} ${book.height} ${
              book.style
            } ${isTight(book)}`}
          >
            <div className="accent top"></div>
            <div className="spineText">
              <span key="title" className="title">
                {book.title}
              </span>
              <span key="author" className="author">
                {book.author}
              </span>
            </div>
            <div className="accent bottom"></div>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export { Book };
