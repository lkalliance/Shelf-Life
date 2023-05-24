import "./Book.css";
import { useRecoilState } from "recoil";
import { Draggable } from "@hello-pangea/dnd";
import { useMutation } from "@apollo/client";
import { ARRANGE_BOOKCASE } from "../../utils/mutations";
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
  const [arrangeBookcase, { error }] = useMutation(ARRANGE_BOOKCASE);

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

  async function unshelveBook() {
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
            </div>
            <div className="accent bottom"></div>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export { Book };
