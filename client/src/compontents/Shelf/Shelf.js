import "./Shelf.css";

import { Stack } from "../../compontents";

function Shelf({ shelfIndex, books, items }) {
  const leftItem = items[`shelf-left-${shelfIndex}`];
  const rightItem = items[`shelf-right-${shelfIndex}`];

  return (
    <div
      className="shelf"
      key={`shelf-${shelfIndex}`}
      id={`shelf-${shelfIndex}`}
    >
      <Stack
        postion="left"
        books={books.left}
        items={items}
        shelf={shelfIndex}
        bookItems={leftItem}
      />
      <Stack
        postion="right"
        books={books.right}
        items={items}
        shelf={shelfIndex}
        bookItems={rightItem}
      />
    </div>
  );
}

export { Shelf };
