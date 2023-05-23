import "./Book.css";
import { useRecoilState } from "recoil";
import { Draggable } from "@hello-pangea/dnd";
import {
  isTight,
  abbreviateTitle,
  booksDeepCopy,
  convert,
} from "../../utils/dragUtils";
import {
  userBookcaseAtom,
  userItemsAtom,
} from "../../recoil/atom/userBooksAtom";

function Book({ bookId, book, bookIndex, stack }) {
  const [userBooks, setUserBooks] = useRecoilState(userBookcaseAtom);
  // eslint-disable-next-line no-unused-vars
  const [userItems, setUserItems] = useRecoilState(userItemsAtom);

  let timer;
  function clickHandler(e) {
    clearTimeout(timer);
    e.preventDefault();
    e.stopPropagation();

    if (e.detail === 1) {
      timer = setTimeout(() => {
        alert(book.title);
      }, 200);
    } else if (e.detail === 2) {
      unshelveBook();
    }
  }

  function unshelveBook() {
    const { 1: thisStack, 2: thisShelf } = stack.split("-");
    if (thisShelf === "unshelved") return;
    const allBooks = booksDeepCopy(userBooks);
    const unshelved = allBooks.unshelved;

    const thisBook = allBooks.shelves[thisShelf][thisStack].splice(
      bookIndex,
      1
    );

    unshelved.push(thisBook[0]);

    setUserBooks(allBooks);
    setUserItems(convert(allBooks));
  }

  const textStyle = isTight(book);
  return (
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
              <span key="author" className="author">
                {book.author}
              </span>
            </div>
            <div className="accent bottom"></div>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export { Book };
