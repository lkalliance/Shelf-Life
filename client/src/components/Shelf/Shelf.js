// This component renders a single shelf in the bookcase

import "./Shelf.css";
import { useRecoilState } from "recoil";
import {
  userBookcaseAtom,
  userItemsAtom,
} from "../../recoil/atom/userBooksAtom";
import { Stack } from "../../components";
import { booksDeepCopy, convert } from "../../utils/dragUtils";

function Shelf({ shelfIndex }) {
  // Atoms for user's bookcase data
  const [userBooks, setUserBooks] = useRecoilState(userBookcaseAtom);
  const [userItems, setUserItems] = useRecoilState(userItemsAtom);

  // Determine what books are on this shelf
  const books =
    shelfIndex === "unshelved"
      ? userBooks.unshelved
      : userBooks.shelves[shelfIndex];

  const leftItem = userItems[`shelf-left-${shelfIndex}`];
  const rightItem = userItems[`shelf-right-${shelfIndex}`];
  const unshelvedItem = userItems[`shelf-unshelved-unshelved`];

  const doubleClickHandler = (e) => {
    // When the shelf is double-clicked, move it all to unshelved
    e.preventDefault();

    // Did the user click the shelf and not a book?
    const target = e.target.nodeName;
    if (target !== "UL" && target !== "LI") return;

    // Grab a copy of all the books, of this shelf and unshelved
    const allBooks = booksDeepCopy(userBooks);
    const thisShelf = allBooks.shelves[shelfIndex];
    const unshelved = allBooks.unshelved;
    // For each shelf stack, migrate all books to unshelved
    while (thisShelf.left.length > 0) {
      const book = thisShelf.left.pop();
      unshelved.push(book);
    }
    while (thisShelf.right.length > 0) {
      const book = thisShelf.right.pop();
      unshelved.push(book);
    }

    // Set states
    setUserBooks(allBooks);
    setUserItems(convert(allBooks));
  };

  return (
    <div
      className={`shelf${shelfIndex === "unshelved" ? " unshelved" : ""}${
        userBooks.unshelved.length === 0 ? " empty" : ""
      }`}
      key={`shelf-${shelfIndex}`}
      id={`shelf-${shelfIndex}`}
    >
      {shelfIndex !== "unshelved" ? (
        <div className="stacks">
          <Stack
            position="left"
            key={`shelf-left-${shelfIndex}`}
            books={books.left}
            shelf={shelfIndex}
            bookItems={leftItem}
            clearHandler={doubleClickHandler}
          />
          <Stack
            drop="true"
            position="right"
            key={`shelf-right-${shelfIndex}`}
            books={books.right}
            shelf={shelfIndex}
            bookItems={rightItem}
            clearHandler={doubleClickHandler}
          />
        </div>
      ) : (
        <Stack
          position="unshelved"
          key={`shelf-unshelved-${shelfIndex}`}
          books={books}
          items={userItems}
          shelf={shelfIndex}
          bookItems={unshelvedItem}
        />
      )}
    </div>
  );
}

export { Shelf };
