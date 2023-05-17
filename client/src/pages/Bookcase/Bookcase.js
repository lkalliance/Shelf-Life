import "./Bookcase.css";
import { Shelf } from "../../components";
import { useState } from "react";

import { fakedata, convert, noSpace } from "../../utils/dragUtils";
import { DragDropContext } from "@hello-pangea/dnd";

function Bookcase() {
  const [books, setBooks] = useState(fakedata);
  const [items, setItems] = useState(convert(fakedata));

  function handleDrop({ source, destination }) {
    // All the things we do when the book is dropped onto the stack

    // first, check to see if the there is even a destination
    if (!destination) return;

    // second, determine if there is room for the dropped book
    const { 1: fromStack, 2: fromShelf } = source.droppableId.split("-");
    const { 1: toStack, 2: toShelf } = destination.droppableId.split("-");

    console.log({ fromStack });
    console.log({ toStack });
    console.log({ fromShelf });
    console.log({ toShelf });
    if (!(toShelf === "unshelved" || fromShelf === toShelf)) {
      console.log("I'm checking!");
      if (
        noSpace(
          books.shelves[toShelf],
          fromShelf === "unshelved"
            ? books.unshelved[source.index]
            : books.shelves[fromShelf][fromStack][source.index]
        )
      )
        return;
    }

    // ok to drop it here, handle the drop
    const newBooks = { ...books };

    // create a copy of the source and destination stacks
    const bSourceStack =
      fromStack === "unshelved"
        ? [...books.unshelved]
        : [...books.shelves[fromShelf][fromStack]];
    const bDestStack =
      source.droppableId === destination.droppableId
        ? bSourceStack
        : toStack === "unshelved"
        ? [...books.unshelved]
        : [...books.shelves[toShelf][toStack]];

    // remove the book from the source...
    const [removedBook] = bSourceStack.splice(source.index, 1);
    // ...and add it to the specified place in the destination
    bDestStack.splice(destination.index, 0, removedBook);

    // place the edited stacks into the copy of the state, and set states
    fromShelf === "unshelved"
      ? (newBooks.unshelved = bSourceStack)
      : (newBooks.shelves[fromShelf][fromStack] = bSourceStack);
    toShelf === "unshelved"
      ? (newBooks.unshelved = bDestStack)
      : (newBooks.shelves[toShelf][toStack] = bDestStack);

    setBooks(newBooks);
    setItems(convert(newBooks));
  }

  return (
    <section id="bookcase">
      <DragDropContext onDragEnd={handleDrop}>
        <div id="shelves">
          {books.shelves.map((shelf, shelfIndex) => {
            return (
              <Shelf
                key={shelfIndex}
                shelfIndex={shelfIndex}
                books={books.shelves[shelfIndex]}
                items={items}
              />
            );
          })}
        </div>
        <Shelf
          key="unshelved"
          shelfIndex="unshelved"
          books={books.unshelved}
          items={items}
        />
      </DragDropContext>
    </section>
  );
}

export { Bookcase };
