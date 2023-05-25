import "./Book.css";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useMutation } from "@apollo/client";
import { ViewModal } from "../ViewModal";
import { ARRANGE_BOOKCASE, REMOVE_BOOK } from "../../utils/mutations";
import {
  isTight,
  abbreviateTitle,
  booksDeepCopy,
  convert,
} from "../../utils/dragUtils";
import {
  userBookcaseAtom,
  userItemsAtom,
  userBooksAtom,
} from "../../recoil/atom/userBooksAtom";

function Book({ bookId, book, bookIndex, stack }) {
  const [userBookcase, setUserBookcase] = useRecoilState(userBookcaseAtom);
  const [userBooks, setUserBooks] = useRecoilState(userBooksAtom);
  const [userItems, setUserItems] = useRecoilState(userItemsAtom);
  const [arrangeBookcase, { error: arrangeError }] =
    useMutation(ARRANGE_BOOKCASE);
  const [removeBook, { error: removeError }] = useMutation(REMOVE_BOOK);
  const [showModal, setShowModal] = useState(false);

  let timer;
  function clickHandler(e) {
    clearTimeout(timer);
    e.preventDefault();
    e.stopPropagation();

    if (e.detail === 1) {
      timer = setTimeout(() => {
        showInfo();
      }, 200);
    } else if (e.detail === 2) {
      unshelveBook();
    }
  }

  function showInfo() {
    setShowModal(true);
  }

  async function unshelveBook() {
    const { 1: thisStack, 2: thisShelf } = stack.split("-");
    if (thisShelf === "unshelved") return;
    const allBooks = booksDeepCopy(userBookcase);
    const unshelved = allBooks.unshelved;

    const thisBook = allBooks.shelves[thisShelf][thisStack].splice(
      bookIndex,
      1
    );
    unshelved.push(thisBook[0]);
    setUserBookcase(allBooks);
    setUserItems(convert(allBooks));

    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await arrangeBookcase({
        variables: { bookcase: allBooks },
      });

      // code needed to clear the form and dismiss the modal ---
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteThisBook() {
    const { 1: thisStack, 2: thisShelf } = stack.split("-");
    const allBooks = booksDeepCopy(userBookcase);
    const booklist = { ...userBooks, bookList: [...userBooks.bookList] };

    const fromStack =
      thisShelf === "unshelved"
        ? allBooks.unshelved
        : allBooks.shelves[thisShelf][thisStack];
    fromStack.splice(bookIndex, 1);
    let listIndex = 0;
    for (let i = 0; i < booklist.bookList.length; i++) {
      if (book.bookId === booklist.bookList[i].bookId) listIndex = i;
    }

    const thisListBook = booklist.bookList.splice(listIndex, 1);

    setUserBookcase(allBooks);
    setUserItems(convert(allBooks));
    setUserBooks(booklist);

    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data: arrangeData } = await arrangeBookcase({
        variables: { bookcase: allBooks },
      });

      // code needed to clear the form and dismiss the modal ---
    } catch (err) {
      console.error(err);
    }

    try {
      const { data: removeData } = await removeBook({
        variables: { bookId: thisListBook[0].bookId },
      });
    } catch (err) {
      console.error(err);
    }
  }

  const textStyle = isTight(book);
  return (
    <>
      <ViewModal
        show={showModal}
        switcher={setShowModal}
        info={book}
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
