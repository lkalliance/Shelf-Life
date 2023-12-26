// This component is the set of modals to add a book to the user's list

import "./AddBook.css";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../../utils/mutations";
import { BookSearch, BookStyle } from "../../components";

function AddBook({
  uYear,
  uBooks,
  uCase,
  uSetBooks,
  uSetCase,
  showAddBook,
  setShowAddBook,
}) {
  // States to determine whether the search or select modal is visible
  const [showModal, setShowModal] = useState(false);
  const [showSelectModal, setshowSelectModal] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showStudio, setShowStudio] = useState(false);
  // State to track what search results and selected result
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [selected, setSelected] = useState({ year: { uYear } });
  // States to track user form inputs
  const [searchInput, setSearchInput] = useState("");
  // Mutation to add a book
  const [addBook, { error }] = useMutation(ADD_BOOK);

  const handleModalSubmit = () => {
    // Shows or hides the entire Add Book set of modals
    setShowModal(!showModal);
  };

  const handleClose = () => {
    console.log("close everything");
    // Shows or hides the entire Add Book set of modals
    setShowModal(false);
    setShowSearch(true);
    setShowStudio(false);
    setShowResults(false);
    setShowAddBook(false);
  };

  const setDefaults = (book) => {
    // Assigns default values if none provided by the user
    let bookCopy = { ...book };
    bookCopy.shortTitle = bookCopy.shortTitle || bookCopy.title;
    bookCopy.color = bookCopy.color || "#ffffff";
    bookCopy.text = bookCopy.text || "#000000";
    bookCopy.height = bookCopy.height || "145";
    bookCopy.thickness = bookCopy.thickness || "30";
    bookCopy.style = bookCopy.style || "paperback";
    bookCopy.rating = bookCopy.rating || 0;
    bookCopy.comment = bookCopy.comment || "";
    bookCopy.year = uYear;
    return bookCopy;
  };

  const handleFormSubmit = async (event) => {
    // Handles the submission of search term
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        // Call the Google API
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      // Craft the results list, removing duplicate titles
      const foundBooks = [];
      const bookData = [];
      for (let i = 0; i < items.length; i++) {
        const book = items[i];
        if (foundBooks.indexOf(book.volumeInfo.title.toLowerCase()) < 0) {
          foundBooks.push(book.volumeInfo.title.toLowerCase());
          bookData.push({
            bookId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || ["No author to display"],
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks?.thumbnail || "",
          });
        }
      }

      // Set the searched books state and clear the input
      setSearchedBooks(bookData);
      setSearchInput("");
      setSelected("");
      setShowStudio(false);
      setShowResults(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalSelection = (book) => {
    // Handles the selection of a search result
    setshowSelectModal(true);
    setShowSearch(false);
    setShowResults(false);
    setShowStudio(true);
    setSelected({
      ...setDefaults(book),
      bookId: book.bookId,
      title: book.title,
      shortTitle: book.title,
      authors: book.authors,
      description: book.description,
      image: book.image,
    });
    setSearchedBooks([]);
  };

  const handleSubmitText = async (e) => {
    e.preventDefault();
    handleClose();
    // If the selected book is already on the user's list for this year, don't add again
    for (const book of uBooks.bookList) {
      if (book.bookId === selected.bookId && book.year === uYear) {
        handleClose();
        return;
      }
    }

    handleSelectionForm(false);
  };

  const handleSubmitAudio = async (e) => {
    e.preventDefault();
    handleClose();
    // If the selected book is already on the user's list for this year, don't add again
    for (const book of uBooks.bookList) {
      if (book.bookId === selected.bookId && book.year === uYear) {
        handleClose();
        return;
      }
    }
    handleSelectionForm(true);
  };

  const handleSelectionForm = async (audio) => {
    // Prep the added book, then add it to the database
    const submission = { ...selected, audio };
    const vettedSubmission = setDefaults(submission);
    try {
      const { data } = await addBook({
        variables: vettedSubmission,
      });
    } catch (err) {
      console.error(err);
    }

    // Now add the book to the book list state, and to the unshelved state
    const newBooks = {
      ...uBooks,
      bookList: [...uBooks.bookList, vettedSubmission],
      fetched: true,
    };
    const newCase = {
      ...uCase,
      unshelved: [...uCase.unshelved, vettedSubmission],
      fetched: true,
    };

    // setBooks(newBooks);
    uSetBooks(newBooks);
    // setbCase(newCase);
    uSetCase(newCase);

    // Close all the modals
    handleClose();
  };

  return (
    <>
      {showAddBook && (
        <div id="add-book-container">
          <div id="AddBook">
            {showSearch ? (
              <BookSearch
                handleClose={handleClose}
                handleFormSubmit={handleFormSubmit}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setShowSearch={setShowSearch}
                setShowStudio={setShowStudio}
                showResults={showResults}
                setShowResults={setShowResults}
                searchedBooks={searchedBooks}
                selected={selected}
                handleModalSelection={handleModalSelection}
              />
            ) : (
              ""
            )}
            {showStudio ? (
              <BookStyle
                handleClose={handleClose}
                handleSelectionFormText={handleSubmitText}
                handleSelectionFormAudio={handleSubmitAudio}
                selected={selected}
                setSelected={setSelected}
                setDefaults={setDefaults}
                uBooks={uBooks}
                uYear={uYear}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}

export { AddBook };
