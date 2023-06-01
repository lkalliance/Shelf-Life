// This page is for the user's master list of books

import "./Profile.css";
import { useRecoilState } from "recoil";
import {
  userBooksAtom,
  userBookcaseAtom,
  userItemsAtom,
  fetchedAtom,
} from "../../recoil/atom/userBooksAtom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKCASE } from "../../utils/queries";
import { Accordion } from "flowbite-react";
import { Card } from "../../components";
import Auth from "../../utils/auth";
import { convert } from "../../utils/dragUtils";

function Profile() {
  // If the user isn't logged in, send them to the home page
  if (!Auth.loggedIn()) window.location.href = "/";
  const today = new Date();
  const thisYear = today.getFullYear();

  // Atoms with user and bookcase details and fetch flag
  const [books, setBooks] = useRecoilState(userBooksAtom);
  const [bookCase, setBookcase] = useRecoilState(userBookcaseAtom);
  const [items, setItems] = useRecoilState(userItemsAtom);
  const [fetched, setFetched] = useRecoilState(fetchedAtom);
  // Queries for user data and bookcase configuration
  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME, {
    variables: { fetchMe: !fetched },
  });
  const { loading: loadingCase, data: dataCase } = useQuery(QUERY_BOOKCASE, {
    variables: { year: thisYear, fetchMe: !fetched },
  });

  if (dataMe && dataCase) {
    // If data is fetched, set the Atoms
    setBooks(dataMe.me);
    setBookcase(dataCase.bookcase);
    setItems(convert(dataCase.bookcase));
    setFetched(true);
  }
  return (
    <main id="booklistContainer">
      <section id="bookList">
        <Accordion collapseAll>
          {books.bookList.map((book, index) => {
            return (
              <Accordion.Panel>
                <Accordion.Title>
                  {book.title}
                  <span class="authors">{book.authors.join(", ")}</span>
                </Accordion.Title>
                <Accordion.Content key={book.bookId}>
                  <Card book={book} />
                </Accordion.Content>
              </Accordion.Panel>
            );
          })}
        </Accordion>
      </section>
    </main>
  );
}

export { Profile };
