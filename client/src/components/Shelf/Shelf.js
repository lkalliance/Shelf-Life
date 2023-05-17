import "./Shelf.css";

import { Stack } from "../../components";

function Shelf({ shelfIndex, books, items }) {
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
        <>
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
        </>
      ) : (
        <Stack
          drop="true"
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
