// This component renders a stack

import "./Stack.css";
import { Droppable } from "@hello-pangea/dnd";
import { Book } from "../../components";

function Stack({ position, books, shelf, bookItems, clearHandler }) {
  return (
    <Droppable
      droppableId={`shelf-${position}-${shelf}`}
      direction="horizontal"
    >
      {(provided, snapshot) => (
        <ul
          className={`stack ${position}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
          onDoubleClick={clearHandler}
        >
          {books.map((book, index) => {
            return (
              <Book
                key={book.bookId}
                book={book}
                bookIndex={index}
                bookId={book.bookId}
                stack={`shelf-${position}-${shelf}`}
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
