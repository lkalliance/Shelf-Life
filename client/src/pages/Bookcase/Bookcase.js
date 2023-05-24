import "./Bookcase.css";
import { useRecoilState } from "recoil";
import { DragDropContext } from "@hello-pangea/dnd";
import { useMutation } from "@apollo/client";
import { ARRANGE_BOOKCASE } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKCASE } from "../../utils/queries";
import { booksDeepCopy, convert, noSpace } from "../../utils/dragUtils";
import {
  userBookcaseAtom,
  userItemsAtom,
  userBooksAtom,
  fetchedAtom,
} from "../../recoil/atom/userBooksAtom";
import { Shelf, Button } from "../../components";
import Auth from "../../utils/auth";

function Bookcase() {
  if (!Auth.loggedIn()) window.location.href = "/";
  const today = new Date();
  const thisYear = today.getFullYear();
  const [books, setBooks] = useRecoilState(userBooksAtom);
  const [bookCase, setBookcase] = useRecoilState(userBookcaseAtom);
  const [items, setItems] = useRecoilState(userItemsAtom);
  const [fetched, setFetched] = useRecoilState(fetchedAtom);
  const [arrangeBookcase, { error }] = useMutation(ARRANGE_BOOKCASE);

  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME, {
    variables: { fetchMe: !fetched },
  });
  const { loading: loadingCase, data: dataCase } = useQuery(QUERY_BOOKCASE, {
    variables: { year: thisYear, fetchMe: !fetched },
  });

  if (dataMe && dataCase) {
    setBooks(dataMe.me);
    setBookcase(dataCase.bookcase);
    setItems(convert(dataCase.bookcase));
    setFetched(true);
  }

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
        bookCase.shelves[toShelf],
        fromShelf === "unshelved"
          ? bookCase.unshelved[source.index]
          : bookCase.shelves[fromShelf][fromStack][source.index]
      )
    ) {
      return;
    }

    // ok to drop it here, handle the drop
    const newUser = booksDeepCopy(bookCase);

    // create a copy of the source and destination stacks
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

    setBookcase(newUser);
    setItems(convert(newUser));

    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await arrangeBookcase({
        variables: { bookcase: newUser },
      });

      // code needed to clear the form and dismiss the modal ---
    } catch (err) {
      console.error(err);
    }
  }

  const addShelf = async () => {
    const newUser = booksDeepCopy(bookCase);
    newUser.shelves.push({ left: [], right: [] });
    newUser.shelves.push({ left: [], right: [] });
    setBookcase(newUser);
    setItems(convert(newUser));

    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await arrangeBookcase({
        variables: { bookcase: newUser },
      });

      // code needed to clear the form and dismiss the modal ---
    } catch (err) {
      console.error(err);
    }
  };

  const removeEmpties = async () => {
    const newUser = {
      user_id: bookCase.user_id,
      year: bookCase.year,
      shelves: [],
      unshelved: [...bookCase.unshelved],
    };
    bookCase.shelves.map((shelf) => {
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
    setBookcase(newUser);
    setItems(convert(newUser));

    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await arrangeBookcase({
        variables: { bookcase: newUser },
      });

      // code needed to clear the form and dismiss the modal ---
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="bookcase">
      <DragDropContext onDragEnd={handleDrop}>
        <div id="shelves">
          {bookCase.shelves.map((shelf, shelfIndex) => {
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
