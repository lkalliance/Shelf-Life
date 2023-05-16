import "./Bookcase.css";
import { Shelf } from "../../compontents";
import { useState } from "react";

import {
  fakedata,
  convert,
  calculateUsed,
  thicknesses,
} from "../../utils/dragUtils";
import { DragDropContext } from "@hello-pangea/dnd";

function Bookcase() {
  const [books, setBooks] = useState(fakedata);
  const [items, setItems] = useState(convert(fakedata));

  function onDragEnd({ source, destination }) {
    // all the things we do when the book is dropped onto the stack

    // first, check to see if the there is even a destination
    if (!destination) return;

    // now, determine if there is room for the dropped book
    const { 1: fromStack, 2: fromShelf } = source.droppableId.split("-");
    const { 2: toShelf } = destination.droppableId.split("-");

    if (!(fromShelf === toShelf)) {
      const shelfUsed = calculateUsed(books.shelves[toShelf]);
      const thisWidth =
        thicknesses[
          books.shelves[fromShelf][fromStack][source.index].thickness
        ];
      // if there is not enough room for the book, return
      if (shelfUsed + thisWidth > 300) return;
    }

    const newBooks = { ...books };

    // determine source and destination shelf, stack
    const { 1: sourceStackId, 2: sourceShelfNum } =
      source.droppableId.split("-");
    const { 1: destStackId, 2: destShelfNum } =
      destination.droppableId.split("-");

    const bSourceStack = [...books.shelves[sourceShelfNum][sourceStackId]];
    const bDestStack =
      source.droppableId === destination.droppableId
        ? bSourceStack
        : [...books.shelves[destShelfNum][destStackId]];

    const [removedBook] = bSourceStack.splice(source.index, 1);
    bDestStack.splice(destination.index, 0, removedBook);

    newBooks.shelves[sourceShelfNum][sourceStackId] = bSourceStack;
    newBooks.shelves[destShelfNum][destStackId] = bDestStack;

    setBooks(newBooks);
    setItems(convert(newBooks));
  }

  return (
    <section id="bookcase">
      <DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>
    </section>
  );
}

export { Bookcase };
