// This page displays the bookcase

import "./Bookcase.css";
import { useRecoilState } from "recoil";
import {
  userBookcaseAtom,
  userItemsAtom,
  userBooksAtom,
  fetchedAtom,
} from "../../recoil/atom/userBooksAtom";
import { useMutation } from "@apollo/client";
import { ARRANGE_BOOKCASE } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKCASE } from "../../utils/queries";
import { DragDropContext } from "@hello-pangea/dnd";
import { Shelf, Button } from "../../components";
import Auth from "../../utils/auth";
import { booksDeepCopy, convert, noSpace } from "../../utils/dragUtils";

function Bookcase() {
  // If the user isn't logged in, send them to the home page
  if (!Auth.loggedIn()) window.location.href = "/";

  const today = new Date();
  const thisYear = today.getFullYear();

  // Atoms for user's booklist, bookcase, and fetched flag
  const [books, setBooks] = useRecoilState(userBooksAtom);
  const [bookCase, setBookcase] = useRecoilState(userBookcaseAtom);
  const [items, setItems] = useRecoilState(userItemsAtom);
  const [fetched, setFetched] = useRecoilState(fetchedAtom);
  // Mutation
  const [arrangeBookcase, { error }] = useMutation(ARRANGE_BOOKCASE);
  // Queries for user data and bookcase data
  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME, {
    variables: { fetchMe: !fetched },
  });
  const { loading: loadingCase, data: dataCase } = useQuery(QUERY_BOOKCASE, {
    variables: { year: thisYear, fetchMe: !fetched },
  });

  if (dataMe && dataCase) {
    // If the data comes back, set all the Atoms
    setBooks(dataMe.me);
    setBookcase(dataCase.bookcase);
    setItems(convert(dataCase.bookcase));
    setFetched(true);
  }

  async function handleDrop({ source, destination }) {
    // Handler for when a book is dropped onto a stack

    // Check to see if the there is even a destination
    if (!destination) return;

    const { 1: fromStack, 2: fromShelf } = source.droppableId.split("-");
    const { 1: toStack, 2: toShelf } = destination.droppableId.split("-");

    if (
      // If the destination isn't unshelved, check to see if there's room for this book
      !(toShelf === "unshelved" || fromShelf === toShelf) &&
      noSpace(
        bookCase.shelves[toShelf],
        fromShelf === "unshelved"
          ? bookCase.unshelved[source.index]
          : bookCase.shelves[fromShelf][fromStack][source.index]
      )
    ) {
      // If there isn't room, forget it
      return;
    }

    // OK to drop it here, handle the drop
    const newUser = booksDeepCopy(bookCase);

    // Create a copy of the source and destination stacks
    const bSourceStack =
      fromStack === "unshelved"
        ? [...bookCase.unshelved]
        : [...bookCase.shelves[fromShelf][fromStack]];
    const bDestStack =
      source.droppableId === destination.droppableId
        ? bSourceStack
        : toStack === "unshelved"
        ? [...bookCase.unshelved]
        : [...bookCase.shelves[toShelf][toStack]];

    // Remove the book from the source...
    const [removedBook] = bSourceStack.splice(source.index, 1);
    // ...and add it to the specified place in the destination
    bDestStack.splice(destination.index, 0, removedBook);

    // Place the edited stacks into the copy of the state, and set states
    fromShelf === "unshelved"
      ? (newUser.unshelved = bSourceStack)
      : (newUser.shelves[fromShelf][fromStack] = bSourceStack);
    toShelf === "unshelved"
      ? (newUser.unshelved = bDestStack)
      : (newUser.shelves[toShelf][toStack] = bDestStack);

    setBookcase(newUser);
    setItems(convert(newUser));

    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await arrangeBookcase({
        variables: { bookcase: newUser },
      });
    } catch (err) {
      console.error(err);
    }
  }

  const addShelf = async () => {
    // This function adds two shelves

    // Create a copy of the current bookcase
    const newUser = booksDeepCopy(bookCase);
    // Push two new shelves on
    newUser.shelves.push({ left: [], right: [] });
    newUser.shelves.push({ left: [], right: [] });
    // Set states
    setBookcase(newUser);
    setItems(convert(newUser));
    try {
      // Save the new bookcase configuration
      const { data } = await arrangeBookcase({
        variables: { bookcase: newUser },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const removeEmpties = async () => {
    // This function removes all empty shelves

    // Create a shell of the user, with empty shelves except unshelved
    const newUser = {
      user_id: bookCase.user_id,
      year: bookCase.year,
      shelves: [],
      unshelved: [...bookCase.unshelved],
    };
    bookCase.shelves.map((shelf) => {
      // Iterate over shelves. If the shelf isn't empty, add to the new configuration
      if (shelf.left.length > 0 || shelf.right.length > 0) {
        newUser.shelves.push({ ...shelf });
      }
      return false;
    });
    if (newUser.shelves.length === 0) {
      // If there are no shelves left, add a pair of empties
      newUser.shelves.push({ left: [], right: [] });
      newUser.shelves.push({ left: [], right: [] });
    }
    if (newUser.shelves.length % 2 === 1) {
      // If there are an odd number of shelves, add one more empty
      newUser.shelves.push({ left: [], right: [] });
    }
    // Set the new states
    setBookcase(newUser);
    setItems(convert(newUser));

    try {
      // Save the new bookcase arrangement
      const { data } = await arrangeBookcase({
        variables: { bookcase: newUser },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main id="bookcaseContainer">
      <section id="bookcase">
        <DragDropContext onDragEnd={handleDrop}>
          <div id="shelves">
            {bookCase.shelves.map((shelf, shelfIndex) => {
              return <Shelf key={shelfIndex} shelfIndex={shelfIndex} />;
            })}
          </div>
          <Shelf key="unshelved" shelfIndex="unshelved" items={items} />
        </DragDropContext>
        <Button className="bookcaseButton" handler={addShelf}>
          Add a shelf
        </Button>
        <Button className="bookcaseButton" handler={removeEmpties}>
          Delete empty shelves
        </Button>
      </section>
    </main>
  );
}

export { Bookcase };
