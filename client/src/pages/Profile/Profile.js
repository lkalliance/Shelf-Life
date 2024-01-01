// This page is for the user's master list of books

import "./Profile.css";
import { Accordion } from "flowbite-react";
import { Card, TitleBar } from "../../components";
import Auth from "../../utils/auth";

function Profile({ uBooks, uYear, uSetYear, uCase, uSetCase }) {
  // If the user isn't logged in, send them to the home page
  if (!Auth.loggedIn()) window.location.href = "/";

  const display = uBooks.bookList.filter((book) => {
    // Filter the book list to only use those added for the selected year
    return book.year === uYear;
  });

  return (
    <main id="booklistContainer">
      <section id="bookList">
        <TitleBar
          type="book list"
          uYear={uYear}
          uSetYear={uSetYear}
          uCase={uCase}
          uSetCase={uSetCase}
          bookCount={
            uBooks.bookList.filter((book) => {
              return book.year === uYear;
            }).length
          }
        />{" "}
        <Accordion collapseAll>
          {display.map((book, index) => {
            return (
              <Accordion.Panel key={index}>
                <Accordion.Title>
                  {book.title}
                  <span className="authors">{book.authors.join(", ")}</span>
                  {book.audio ? " 🎧" : ""}
                </Accordion.Title>
                <Accordion.Content key={`${book.audio ? "-aud" : ""}`}>
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
