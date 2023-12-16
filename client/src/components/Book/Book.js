// This component creates a book for the bookcase

import "./Book.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ARRANGE_BOOKCASE, REMOVE_BOOK } from "../../utils/mutations";
import { Draggable } from "@hello-pangea/dnd";
import { ViewModal } from "../ViewModal";
import {
  isTight,
  abbreviateTitle,
  booksDeepCopy,
  convert,
} from "../../utils/dragUtils";

function Book({
  uCase,
  uBooks,
  uSetCase,
  uSetBooks,
  uSetItems,
  bookId,
  book,
  bookIndex,
  stack,
  shelf,
}) {
  const [showModal, setShowModal] = useState(false);
  // Mutations
  const [arrangeBookcase, { error: arrangeError }] =
    useMutation(ARRANGE_BOOKCASE);
  const [removeBook, { error: removeError }] = useMutation(REMOVE_BOOK);

  // Function to differentiate between a single and double-click
  let timer;
  function clickHandler(e) {
    clearTimeout(timer);
    e.preventDefault();
    e.stopPropagation();
    // Do the single-click thing in 200 ms
    if (e.detail === 1) {
      timer = setTimeout(() => {
        showInfo();
      }, 200);
      // If a second click happens, do this instead
    } else if (e.detail === 2) {
      unshelveBook();
    }
  }

  function showInfo() {
    // Show the book details modal
    setShowModal(true);
  }

  async function unshelveBook() {
    // This function moves a book from a shelf to unshelved

    const { 1: thisStack, 2: thisShelf } = stack.split("-");
    // If the book is already unshelved, never mind
    if (thisShelf === "unshelved") return;

    const allBooks = booksDeepCopy(uCase);
    const unshelved = allBooks.unshelved;
    // Remove the book from its current stack
    const thisBook = allBooks.shelves[thisShelf][thisStack].splice(
      bookIndex,
      1
    );
    // Now place it at the end of the Unshelved stack
    unshelved.push(thisBook[0]);
    // Now update the states of the bookcase
    uSetCase(allBooks);
    uSetItems(convert(allBooks));

    try {
      // Save the newly arranged bookcase
      const { data } = await arrangeBookcase({
        variables: { bookcase: allBooks },
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteThisBook() {
    // This function removes a book from the user's list and bookcase

    const { 1: thisStack, 2: thisShelf } = stack.split("-");
    const allBooks = booksDeepCopy(uCase);
    const booklist = { ...uBooks, bookList: [...uBooks.bookList] };

    // Which stack is it from?
    const fromStack =
      thisShelf === "unshelved"
        ? allBooks.unshelved
        : allBooks.shelves[thisShelf][thisStack];
    // Remove it from that stack
    fromStack.splice(bookIndex, 1);

    // Now search for the book in the flat list, and remove it there
    let listIndex = 0;
    for (let i = 0; i < booklist.bookList.length; i++) {
      if (book.bookId === booklist.bookList[i].bookId) listIndex = i;
    }
    const thisListBook = booklist.bookList.splice(listIndex, 1);

    // Set all the states and atoms
    uSetCase(allBooks);
    uSetItems(convert(allBooks));
    uSetBooks(booklist);

    try {
      // Save the new bookshelf arrangement
      const { data: arrangeData } = await arrangeBookcase({
        variables: { bookcase: allBooks },
      });
    } catch (err) {
      console.error(err);
    }

    try {
      // Save the book's removal
      const { data: removeData } = await removeBook({
        variables: {
          bookId: thisListBook[0].bookId,
          year: book.year,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  // Reference logic to set book title style
  const textStyle = isTight(book);
  return (
    <>
      <ViewModal
        show={showModal}
        switcher={setShowModal}
        info={book}
        shelf={shelf}
        remover={deleteThisBook}
      />
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
              onClick={clickHandler}
            >
              <div className="accent top"></div>
              <div className="spineText">
                <span key="title" className="title">
                  {textStyle === "tightest"
                    ? abbreviateTitle(book.title)
                    : book.title}
                </span>
              </div>
              <div className="accent bottom"></div>
            </div>
          </li>
        )}
      </Draggable>
    </>
  );
}

export { Book };
