import "./Bookcase.css";
import { useRecoilState } from "recoil";
import { DragDropContext } from "@hello-pangea/dnd";
import { useMutation } from "@apollo/client";
import { ARRANGE_BOOKCASE } from "../../utils/mutations";

import { booksDeepCopy, convert, noSpace } from "../../utils/dragUtils";
import {
  userBookcaseAtom,
  userItemsAtom,
} from "../../recoil/atom/userBooksAtom";
import { Shelf, Button } from "../../components";
import Auth from "../../utils/auth";

function Bookcase() {
  if (!Auth.loggedIn()) window.location.href = "/";
  const [books, setBooks] = useRecoilState(userBookcaseAtom);
  const [items, setItems] = useRecoilState(userItemsAtom);
  const [arrangeBookcase, { error }] = useMutation(ARRANGE_BOOKCASE);

  async function handleDrop({ source, destination }) {
    // All the things we do when the book is dropped onto the stack

    // first, check to see if the there is even a destination
    if (!destination) return;

    // second, determine if there is room for the dropped book
    const { 1: fromStack, 2: fromShelf } = source.droppableId.split("-");
    const { 1: toStack, 2: toShelf } = destination.droppableId.split("-");

    if (
      !(toShelf === "unshelved" || fromShelf === toShelf) &&
      noSpace(
        books.shelves[toShelf],
        fromShelf === "unshelved"
          ? books.unshelved[source.index]
          : books.shelves[fromShelf][fromStack][source.index]
      )
    ) {
      return;
    }

    // ok to drop it here, handle the drop
    const newUser = booksDeepCopy(books);

    // create a copy of the source and destination stacks
    const bSourceStack =
      fromStack === "unshelved"
        ? [...books.unshelved]
        : [...books.shelves[fromShelf][fromStack]];
    const bDestStack =
      source.droppableId === destination.droppableId
        ? bSourceStack
        : toStack === "unshelved"
        ? [...books.unshelved]
        : [...books.shelves[toShelf][toStack]];

    // remove the book from the source...
    const [removedBook] = bSourceStack.splice(source.index, 1);
    // ...and add it to the specified place in the destination
    bDestStack.splice(destination.index, 0, removedBook);

    // place the edited stacks into the copy of the state, and set states
    fromShelf === "unshelved"
      ? (newUser.unshelved = bSourceStack)
      : (newUser.shelves[fromShelf][fromStack] = bSourceStack);
    toShelf === "unshelved"
      ? (newUser.unshelved = bDestStack)
      : (newUser.shelves[toShelf][toStack] = bDestStack);

    setBooks(newUser);
    setItems(convert(newUser));

    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await arrangeBookcase({
        variables: { newUser },
      });

      // code needed to clear the form and dismiss the modal ---
    } catch (err) {
      console.error(err);
    }
  }

  const addShelf = () => {
    const newUser = booksDeepCopy(books);
    newUser.shelves.push({ left: [], right: [] });
    newUser.shelves.push({ left: [], right: [] });
    setBooks(newUser);
    setItems(convert(newUser));
  };

  const removeEmpties = () => {
    const newUser = { shelves: [], unshelved: [...books.unshelved] };
    books.shelves.map((shelf) => {
      if (shelf.left.length > 0 || shelf.right.length > 0) {
        newUser.shelves.push({ ...shelf });
      }
      return false;
    });
    if (newUser.shelves.length === 0) {
      newUser.shelves.push({ left: [], right: [] });
      newUser.shelves.push({ left: [], right: [] });
    }
    if (newUser.shelves.length % 2 === 1) {
      newUser.shelves.push({ left: [], right: [] });
    }
    setBooks(newUser);
    setItems(convert(newUser));
  };

  return (
    <section id="bookcase">
      <DragDropContext onDragEnd={handleDrop}>
        <div id="shelves">
          {books.shelves.map((shelf, shelfIndex) => {
            return <Shelf key={shelfIndex} shelfIndex={shelfIndex} />;
          })}
        </div>
        <Shelf key="unshelved" shelfIndex="unshelved" items={items} />
      </DragDropContext>
      <Button handler={addShelf}>Add a shelf</Button>
      <Button handler={removeEmpties}>Delete empty shelves</Button>
    </section>
  );
}

export { Bookcase };
