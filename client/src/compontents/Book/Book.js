import "./Book.css";
import { Draggable } from "@hello-pangea/dnd";

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
            className={`book ${book.color} ${book.thickness} ${book.height}${
              book.paperback === "leather"
                ? " leather"
                : book.paperback
                ? " paperback"
                : ""
            }${
              book.thickness === "thin" ||
              (book.height !== "tall" && book.title.length > 15)
                ? " tight"
                : ""
            }`}
          >
            {book.paperback === "leather" ? (
              <div className="accent top"></div>
            ) : (
              ""
            )}
            <div class="spineText">
              <span key="title" className="title">
                {book.title}
              </span>
              <span key="author" className="author">
                {book.author}
              </span>
            </div>
            {book.paperback === "leather" ? (
              <div className="accent bottom"></div>
            ) : (
              ""
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
}

export { Book };
