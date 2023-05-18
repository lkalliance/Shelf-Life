import "./Shelf.css";

import { useRecoilValue } from "recoil";
import { userBooksAtom, userItemsAtom } from "../../recoil/atom/userBooksAtom";
import { Stack } from "../../components";

function Shelf({ shelfIndex }) {
  const userBooks = useRecoilValue(userBooksAtom);
  const items = useRecoilValue(userItemsAtom);

  const books =
    shelfIndex === "unshelved"
      ? userBooks.unshelved
      : userBooks.shelves[shelfIndex];

  const leftItem = items[`shelf-left-${shelfIndex}`];
  const rightItem = items[`shelf-right-${shelfIndex}`];
  const unshelvedItem = items[`shelf-unshelved-unshelved`];
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
          />
          <Stack
            drop="true"
            position="right"
            key={`shelf-right-${shelfIndex}`}
            books={books.right}
            shelf={shelfIndex}
            bookItems={rightItem}
          />
        </div>
      ) : (
        <Stack
          position="unshelved"
          key={`shelf-unshelved-${shelfIndex}`}
          books={books}
          items={items}
          shelf={shelfIndex}
          bookItems={unshelvedItem}
        />
      )}
    </div>
  );
}

export { Shelf };
