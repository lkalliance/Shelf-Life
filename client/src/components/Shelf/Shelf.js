import "./Shelf.css";

import { useRecoilState } from "recoil";
import { booksDeepCopy, convert } from "../../utils/dragUtils";
import { userBooksAtom, userItemsAtom } from "../../recoil/atom/userBooksAtom";
import { Stack } from "../../components";

function Shelf({ shelfIndex }) {
  const [userBooks, setUserBooks] = useRecoilState(userBooksAtom);
  const [userItems, setUserItems] = useRecoilState(userItemsAtom);

  const books =
    shelfIndex === "unshelved"
      ? userBooks.unshelved
      : userBooks.shelves[shelfIndex];

  const leftItem = userItems[`shelf-left-${shelfIndex}`];
  const rightItem = userItems[`shelf-right-${shelfIndex}`];
  const unshelvedItem = userItems[`shelf-unshelved-unshelved`];

  const doubleClickHandler = (e) => {
    e.preventDefault();
    const target = e.target.nodeName;
    if (target !== "UL" && target !== "LI") return;
    const allBooks = booksDeepCopy(userBooks);
    const thisShelf = allBooks.shelves[shelfIndex];
    const unshelved = allBooks.unshelved;
    while (thisShelf.left.length > 0) {
      const book = thisShelf.left.pop();
      unshelved.push(book);
    }
    while (thisShelf.right.length > 0) {
      const book = thisShelf.right.pop();
      unshelved.push(book);
    }
    setUserBooks(allBooks);
    setUserItems(convert(allBooks));
  };

  return (
    <div
      className={`shelf${shelfIndex === "unshelved" ? " unshelved" : ""}`}
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
