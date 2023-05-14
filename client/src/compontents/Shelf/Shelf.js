import "./Shelf.css";

import { Stack } from "../../compontents";

function Shelf({ shelfIndex, books, items }) {
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
      />
      <Stack
        postion="right"
        books={books.right}
        items={items}
        shelf={shelfIndex}
      />
    </div>
  );
}

export { Shelf };
