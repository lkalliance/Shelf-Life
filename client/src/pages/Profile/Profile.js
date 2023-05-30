import "./Profile.css";
import { useRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKCASE } from "../../utils/queries";
import { convert } from "../../utils/dragUtils";
import { Card } from "../../components";
import { Accordion } from "flowbite-react";

import {
  userBooksAtom,
  userBookcaseAtom,
  userItemsAtom,
  fetchedAtom,
} from "../../recoil/atom/userBooksAtom";
import Auth from "../../utils/auth";
function Profile() {
  if (!Auth.loggedIn()) window.location.href = "/";
  const today = new Date();
  const thisYear = today.getFullYear();
  const [books, setBooks] = useRecoilState(userBooksAtom);
  const [bookCase, setBookcase] = useRecoilState(userBookcaseAtom);
  const [items, setItems] = useRecoilState(userItemsAtom);
  const [fetched, setFetched] = useRecoilState(fetchedAtom);

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
  return (
    <Accordion collapseAll>
      {books.bookList.map((book, index) => {
        return (
          <Accordion.Panel>
            <Accordion.Title>
              {book.title}
              <span class="authors">{book.authors.join(", ")}</span>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                <p>
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                <p>Check out this guide to learn how to</p>
                <a
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                  href="https://flowbite.com/docs/getting-started/introduction/"
                >
                  <p>get started</p>
                </a>
                <p>
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        );
      })}
    </Accordion>
  );

  // return (
  //   <section id="profile">
  //     <div className="bookList">
  //       {books.bookList.map((book, index) => {
  //         return <Card book={book} />;
  //       })}
  //     </div>
  //   </section>
  // );
}

export { Profile };
