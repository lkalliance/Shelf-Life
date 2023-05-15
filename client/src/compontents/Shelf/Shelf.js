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
        drop="true"
        position="left"
        key={`shelf-left-${shelfIndex}`}
        books={books.left}
        items={items}
        shelf={shelfIndex}
        bookItems={leftItem}
      />
      <Stack
        drop="true"
        position="right"
        key={`shelf-right-${shelfIndex}`}
        books={books.right}
        items={items}
        shelf={shelfIndex}
        bookItems={rightItem}
      />
    </div>
  );
}

export { Shelf };
