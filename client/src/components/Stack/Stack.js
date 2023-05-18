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
                key={book.id}
                book={book}
                bookIndex={index}
                bookId={bookItems[index].id}
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
