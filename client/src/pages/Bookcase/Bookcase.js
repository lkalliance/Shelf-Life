import "./Bookcase.css";
import { useRecoilState } from "recoil";
import { DragDropContext } from "@hello-pangea/dnd";

import { booksDeepCopy, convert, noSpace } from "../../utils/dragUtils";
import { userBooksAtom, userItemsAtom } from "../../recoil/atom/userBooksAtom";
import { Shelf } from "../../components";

function Bookcase() {
  const [books, setBooks] = useRecoilState(userBooksAtom);
  const [items, setItems] = useRecoilState(userItemsAtom);

  function handleDrop({ source, destination }) {
    // All the things we do when the book is dropped onto the stack

    // first, check to see if the there is even a destination
    if (!destination) return;

    // second, determine if there is room for the dropped book
    const { 1: fromStack, 2: fromShelf } = source.droppableId.split("-");
    const { 1: toStack, 2: toShelf } = destination.droppableId.split("-");

    if (
      !(toShelf === "unshelved" || fromShelf === toShelf) &&
      noSpace(
        books.years[0].bookcase.shelves[toShelf],
        fromShelf === "unshelved"
          ? books.years[0].bookcase.unshelved[source.index]
          : books.years[0].bookcase.shelves[fromShelf][fromStack][source.index]
      )
    ) {
      return;
    }

    // ok to drop it here, handle the drop
    const newUser = booksDeepCopy(books);

    // create a copy of the source and destination stacks
    const bSourceStack =
      fromStack === "unshelved"
        ? [...books.years[0].bookcase.unshelved]
        : [...books.years[0].bookcase.shelves[fromShelf][fromStack]];
    const bDestStack =
      source.droppableId === destination.droppableId
        ? bSourceStack
        : toStack === "unshelved"
        ? [...books.years[0].bookcase.unshelved]
        : [...books.years[0].bookcase.shelves[toShelf][toStack]];

    // remove the book from the source...
    const [removedBook] = bSourceStack.splice(source.index, 1);
    // ...and add it to the specified place in the destination
    bDestStack.splice(destination.index, 0, removedBook);

    // place the edited stacks into the copy of the state, and set states
    fromShelf === "unshelved"
      ? (newUser.years[0].bookcase.unshelved = bSourceStack)
      : (newUser.years[0].bookcase.shelves[fromShelf][fromStack] =
          bSourceStack);
    toShelf === "unshelved"
      ? (newUser.years[0].bookcase.unshelved = bDestStack)
      : (newUser.years[0].bookcase.shelves[toShelf][toStack] = bDestStack);

    setBooks(newUser);
    setItems(convert(newUser.years[0].bookcase));
  }

  return (
    <section id="bookcase">
      <DragDropContext onDragEnd={handleDrop}>
        <div id="shelves">
          {books.years[0].bookcase.shelves.map((shelf, shelfIndex) => {
            return <Shelf key={shelfIndex} shelfIndex={shelfIndex} />;
          })}
        </div>
        <Shelf key="unshelved" shelfIndex="unshelved" items={items} />
      </DragDropContext>
    </section>
  );
}

export { Bookcase };
