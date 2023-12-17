// This page is for the user's master list of books

import "./Profile.css";
import { Accordion } from "flowbite-react";
import { Card } from "../../components";
import Auth from "../../utils/auth";

function Profile({ uBooks, uYear }) {
  // If the user isn't logged in, send them to the home page
  if (!Auth.loggedIn()) window.location.href = "/";

  console.log(uBooks);

  const display = uBooks.bookList.filter((book) => {
    return book.year === uYear;
  });
  return (
    <main id="booklistContainer">
      <section id="bookList">
        <h1>{uYear} book list</h1>
        <Accordion collapseAll>
          {display.map((book, index) => {
            return (
              <Accordion.Panel key={index}>
                <Accordion.Title>
                  {book.title}
                  <span className="authors">{book.authors.join(", ")}</span>
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
