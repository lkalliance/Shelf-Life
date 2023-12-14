// This component renders a single shelf in the bookcase

import "./Shelf.css";
// import { useRecoilState } from "recoil";
// import {
//   userBookcaseAtom,
//   userItemsAtom,
// } from "../../recoil/atom/userBooksAtom";
import { Stack } from "../../components";
import { booksDeepCopy, convert } from "../../utils/dragUtils";

function Shelf({
  shelfIndex,
  uCase,
  uBooks,
  uSetCase,
  uItems,
  uSetBooks,
  uSetItems,
}) {
  // Atoms for user's bookcase data
  // const [userBooks, setUserBooks] = useRecoilState(userBookcaseAtom);
  // const [userItems, setUserItems] = useRecoilState(userItemsAtom);

  // Determine what books are on this shelf
  const books =
    shelfIndex === "unshelved" ? uCase.unshelved : uCase.shelves[shelfIndex];

  const leftItem = uItems[`shelf-left-${shelfIndex}`];
  const rightItem = uItems[`shelf-right-${shelfIndex}`];
  const unshelvedItem = uItems[`shelf-unshelved-unshelved`];

  const doubleClickHandler = (e) => {
    // When the shelf is double-clicked, move it all to unshelved
    e.preventDefault();

    // Did the user click the shelf and not a book?
    const target = e.target.nodeName;
    if (target !== "UL" && target !== "LI") return;

    // Grab a copy of all the books, of this shelf and unshelved
    const allBooks = booksDeepCopy(uCase);
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
    // setUserBooks(allBooks);
    uSetBooks(allBooks);
    // setUserItems(convert(allBooks));
    uSetItems(convert(allBooks));
  };

  return (
    <div
      className={`shelf${shelfIndex === "unshelved" ? " unshelved" : ""}${
        uCase.unshelved.length === 0 ? " empty" : ""
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
            uCase={uCase}
            uBooks={uBooks}
            uSetCase={uSetCase}
            uSetBooks={uSetBooks}
            uSetItems={uSetItems}
          />
          <Stack
            drop="true"
            position="right"
            key={`shelf-right-${shelfIndex}`}
            books={books.right}
            shelf={shelfIndex}
            bookItems={rightItem}
            clearHandler={doubleClickHandler}
            uCase={uCase}
            uBooks={uBooks}
            uSetCase={uSetCase}
            uSetBooks={uSetBooks}
            uSetItems={uSetItems}
          />
        </div>
      ) : (
        <Stack
          position="unshelved"
          key={`shelf-unshelved-${shelfIndex}`}
          books={books}
          items={uItems}
          shelf={shelfIndex}
          bookItems={unshelvedItem}
          uCase={uCase}
          uBooks={uBooks}
          uSetCase={uSetCase}
          uSetBooks={uSetBooks}
          uSetItems={uSetItems}
        />
      )}
    </div>
  );
}

export { Shelf };
