import "./Bookcase.css";
import { Shelf } from "../../compontents";
import { useState } from "react";

import { fakedata, control } from "../../utils/dragUtils";
import { DragDropContext } from "@hello-pangea/dnd";

function Bookcase() {
  const [books, setBooks] = useState(fakedata);
  const [items, setItems] = useState(control);

  function onDragEnd({ source, destination }) {
    const newItems = { ...items };
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

    const iSourceStack = [...items[source.droppableId]];
    const iDestStack =
      source.droppableId === destination.droppableId
        ? iSourceStack
        : [...items[destination.droppableId]];

    const [removedItem] = iSourceStack.splice(source.index, 1);
    const [removedBook] = bSourceStack.splice(source.index, 1);

    iDestStack.splice(destination.index, 0, removedItem);
    bDestStack.splice(destination.index, 0, removedBook);

    newItems[source.droppableId] = iSourceStack;
    newBooks.shelves[sourceShelfNum][sourceStackId] = bSourceStack;
    newItems[destination.droppableId] = iDestStack;
    newBooks.shelves[destShelfNum][destStackId] = bDestStack;

    setItems(newItems);
    setBooks(newBooks);
  }

  return (
    <section id="bookcase">
      <DragDropContext onDragEnd={onDragEnd}>
        {books.shelves.map((shelf, shelfIndex) => {
          // const leftItem = items[`shelf-left-${shelfIndex}`];
          // const rightItem = items[`shelf-right-${shelfIndex}`];
          // const centerItem = items[`shelf-center-${shelfIndex}`];
          return (
            <Shelf
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
