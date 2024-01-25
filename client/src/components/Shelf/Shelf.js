// This component renders a single shelf in the bookcase

import "./Shelf.css";
import { cloneDeep } from "lodash";
import { useMutation } from "@apollo/client";
import { ARRANGE_BOOKCASE } from "../../utils/mutations";
import { QUERY_BOOKCASE, QUERY_ME } from "../../utils/queries";

import { Stack } from "../../components";
import { convert } from "../../utils/dragUtils";

function Shelf({
  shelfIndex,
  uCase,
  uBooks,
  uSetCase,
  uItems,
  uSetBooks,
  uSetItems,
  uYear,
  otherUser,
  removing,
}) {
  const books =
    shelfIndex === "unshelved" ? uCase.unshelved : uCase.shelves[shelfIndex];

  const leftItem = uItems[`shelf-left-${shelfIndex}`];
  const rightItem = uItems[`shelf-right-${shelfIndex}`];
  const unshelvedItem = uItems[`shelf-unshelved-unshelved`];
  const [arrangeBookcase, { error }] = useMutation(ARRANGE_BOOKCASE, {
    refetchQueries: () => [
      {
        query: QUERY_ME,
        variables: { fetchMe: true },
      },
      {
        query: QUERY_BOOKCASE,
        variables: { fetchMe: true, year: uYear },
      },
    ],
  });

  const doubleClickHandler = async (e) => {
    // When the shelf is double-clicked, move it all to unshelved
    e.preventDefault();

    // Did the user click the shelf and not a book?
    const target = e.target.nodeName;
    if (target !== "UL" && target !== "LI") {
      console.log("That was a book!");
      return;
    }

    // Grab a copy of all the books, of this shelf and unshelved
    const allBooks = cloneDeep(uCase);
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
    uSetCase(allBooks);
    // setUserItems(convert(allBooks));
    uSetItems(convert(allBooks));

    // Save configuration
    try {
      // Save the new bookcase arrangement
      const { data } = await arrangeBookcase({
        variables: { bookcase: allBooks },
      });
    } catch (err) {
      console.error(err);
    }
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
            otherUser={otherUser}
            uYear={uYear}
            removing={removing}
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
            otherUser={otherUser}
            uYear={uYear}
            removing={removing}
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
          otherUser={otherUser}
          uYear={uYear}
          removing={removing}
        />
      )}
    </div>
  );
}

export { Shelf };
