import "./Bookcase.css";
import { useState } from "react";

import { SampleDrag, fakedata, control } from "../../utils/dragUtils";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function Bookcase() {
  const [books, setBooks] = useState(fakedata);
  const [items, setItems] = useState(control);

  function sameContainer(arr, books, begin, end) {
    const newArr = [...arr];
    const newBooks = [...books];
    const [removedArr] = newArr.splice(begin, 1);
    const [removedBooks] = newBooks.splice(begin, 1);
    newArr.splice(end, 0, removedArr);
    newBooks.splice(end, 0, removedBooks);
    return [newArr, newBooks];
  }

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
  const parseStack = (item) => {};

  return (
    <section id="bookcase">
      <DragDropContext onDragEnd={onDragEnd}>
        {books.shelves.map((shelf, shelfIndex) => {
          const leftItem = items[`shelf-left-${shelfIndex}`];
          const rightItem = items[`shelf-right-${shelfIndex}`];
          const centerItem = items[`shelf-center-${shelfIndex}`];
          return (
            <div
              className="shelf"
              id={`shelf-left-${shelfIndex}`}
              key={`shelf-left-${shelfIndex}`}
            >
              <Droppable
                droppableId={`shelf-left-${shelfIndex}`}
                direction="horizontal"
              >
                {(provided, snapshot) => (
                  <ul
                    className="stack left"
                    ref={provided.innerRef}
                    style={{
                      opacity: snapshot.isDraggingOver ? "0.5" : "1",
                    }}
                    {...provided.droppableProps}
                  >
                    {shelf.left.map((book, bookIndex) => {
                      const bookItem = leftItem[bookIndex];
                      return (
                        <Draggable
                          key={bookItem.id}
                          draggableId={bookItem.id}
                          index={bookIndex}
                        >
                          {(provided) => (
                            <li
                              className={`book ${book.color}`}
                              key={book.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <span key="title" className="title">
                                {book.title}
                              </span>
                              <span key="author" className="author">
                                {book.author}
                              </span>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <Droppable
                droppableId={`shelf-center-${shelfIndex}`}
                direction="vertical"
              >
                {(provided, snapshot) => (
                  <ul
                    className="stack center"
                    ref={provided.innerRef}
                    style={{
                      opacity: snapshot.isDraggingOver ? "0.5" : "1",
                    }}
                    {...provided.droppableProps}
                  >
                    {shelf.center.map((book, bookIndex) => {
                      const bookItem = centerItem[bookIndex];
                      return (
                        <Draggable
                          key={bookItem.id}
                          draggableId={bookItem.id}
                          index={bookIndex}
                        >
                          {(provided) => (
                            <li
                              className={`book ${book.color}`}
                              key={book.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <span key="title" className="title">
                                {book.title}
                              </span>
                              <span key="author" className="author">
                                {book.author}
                              </span>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <Droppable
                droppableId={`shelf-right-${shelfIndex}`}
                direction="horizontal"
              >
                {(provided, snapshot) => (
                  <ul
                    className="stack right"
                    ref={provided.innerRef}
                    style={{
                      opacity: snapshot.isDraggingOver ? "0.5" : "1",
                    }}
                    {...provided.droppableProps}
                  >
                    {shelf.right.map((book, bookIndex) => {
                      const bookItem = rightItem[bookIndex];
                      return (
                        <Draggable
                          key={bookItem.id}
                          draggableId={bookItem.id}
                          index={bookIndex}
                        >
                          {(provided, snapshot) => (
                            <li
                              className={`book ${book.color}`}
                              style={{
                                width: snapshot.isDragging ? "0.5" : "1",
                              }}
                              key={book.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <span key="title" className="title">
                                {book.title}
                              </span>
                              <span key="author" className="author">
                                {book.author}
                              </span>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </section>
  );
}

export { Bookcase };
