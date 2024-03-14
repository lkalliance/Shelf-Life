// This component renders a stack

import "./Stack.css";
import { Droppable } from "@hello-pangea/dnd";
import { Book } from "../../components";

function Stack({
  uCase,
  uBooks,
  uSetCase,
  uSetBooks,
  uSetItems,
  position,
  books,
  shelf,
  clearHandler,
  uYear,
  removing,
  otherUser,
  tilting,
  showingModal,
  setShowingModal,
}) {
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
                key={`${book.bookId}${book.audio ? "-aud" : ""}`}
                uCase={uCase}
                uBooks={uBooks}
                uSetCase={uSetCase}
                uSetBooks={uSetBooks}
                uSetItems={uSetItems}
                book={book}
                bookIndex={index}
                bookId={`${book.bookId}${book.audio && "-aud"}`}
                shelf={shelf}
                stack={`shelf-${position}-${shelf}`}
                otherUser={otherUser}
                uYear={uYear}
                removing={removing}
                position={position}
                showingModal={showingModal}
                setShowingModal={setShowingModal}
                tilting={
                  tilting &&
                  ((position === "left" && index === books.length - 1) ||
                    (position === "right" && index === 0))
                }
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
