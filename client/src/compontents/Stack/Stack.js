import "./Stack.css";
import { Droppable } from "@hello-pangea/dnd";
import { Book } from "../../compontents";

function Stack({ position, books, items, shelf, bookItems }) {
  return (
    <Droppable
      droppableId={`shelf-${position}-${shelf}`}
      direction="horizontal"
    >
      {(provided, snapshot) => (
        <ul
          className={`stack ${position}`}
          ref={provided.innerRef}
          style={{
            opacity: snapshot.isDraggingOver ? "0.5" : "1",
          }}
          {...provided.droppableProps}
        >
          {books.map((book, bookIndex) => {
            return (
              <Book
                key={book.id}
                book={book}
                bookIndex={bookIndex}
                bookId={bookItems[bookIndex].id}
              />
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export { Stack };
