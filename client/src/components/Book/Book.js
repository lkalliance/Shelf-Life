import "./Book.css";
import { Draggable } from "@hello-pangea/dnd";
import { isTight, abbreviateTitle } from "../../utils/dragUtils";

function Book({ bookId, book, bookIndex }) {
  const textStyle = isTight(book);
  return (
    <Draggable key={bookId} draggableId={bookId} index={bookIndex}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={`book ${book.color} ${book.thickness} ${book.height} ${book.style} ${textStyle}`}
            id={bookId}
            onClick={() => {
              alert(book.title);
            }}
          >
            <div className="accent top"></div>
            <div className="spineText">
              <span key="title" className="title">
                {textStyle === "tightest"
                  ? abbreviateTitle(book.title)
                  : book.title}
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
