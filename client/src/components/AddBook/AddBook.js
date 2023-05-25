import "./AddBook.css";
import React, { useState, useEffect, useContext } from "react";
import Auth from "../../utils/auth";
import { ADD_BOOK } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { booksDeepCopy, convert } from "../../utils/dragUtils";
import { useRecoilState } from "recoil";
import {
  userBooksAtom,
  userItemsAtom,
  userBookcaseAtom,
} from "../../recoil/atom/userBooksAtom";
import Star from "./Star";

function AddBook() {
  const [showModal, setShowModal] = useState(false);
  const [showSelectModal, setshowSelectModal] = useState(false);
  const [selected, setSelected] = useState({ comment: "", rating: 0 });
  const [books, setBooks] = useRecoilState(userBooksAtom);
  const [bcase, setbCase] = useRecoilState(userBookcaseAtom);

  const [items, setItems] = useRecoilState(userItemsAtom);

  const handleModalSubmit = () => {
    setShowModal(!showModal);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const [searchedBooks, setSearchedBooks] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [addBook, { error }] = useMutation(ADD_BOOK);

  const setDefaults = (book) => {
    let bookCopy = { ...book };
    bookCopy.color = bookCopy.color || "white";
    bookCopy.height = bookCopy.height || "medium";
    bookCopy.thickness = bookCopy.thickness || "mid";
    bookCopy.style = bookCopy.style || "paperback";
    return bookCopy;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors || ["No author to display"],
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
        // link: book.selfLink,
      }));

      setSearchedBooks(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectionClose = () => {
    setshowSelectModal(false);
  };

  const handleModalSelection = (book) => {
    setshowSelectModal(true);
    setSelected({
      ...selected,
      bookId: book.bookId,
      title: book.title,
      authors: book.authors,
      description: book.description,
      image: book.image,
    });
    setSearchedBooks([]);
  };

  const handleSelectionForm = async (event) => {
    event.preventDefault();

    // On select save book and bring up selection modal
    // save selected options
    //  onSave: save book to unshelved
    // reload page/clear search and close parent modal
    for (const book of books.bookList) {
      if (book.bookId === selected.bookId) {
        handleSelectionClose();
        handleClose();
        return;
      }
    }

    const year = new Date().getFullYear().toString();
    const submission = { ...selected, year };
    const vettedSubmission = setDefaults(submission);
    console.log(vettedSubmission);
    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await addBook({
        variables: vettedSubmission,
      });

      // code needed to clear the form and dismiss the modal ---
    } catch (err) {
      console.error(err);
    }

    const newBooks = {
      ...books,
      bookList: [...books.bookList, vettedSubmission],
    };
    const newCase = {
      ...bcase,
      unshelved: [...bcase.unshelved, vettedSubmission],
    };

    setBooks(newBooks);
    setbCase(newCase);
    setItems(convert(newCase));
    handleClose();
  };

  return (
    <>
      <a
        href="@"
        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        onClick={(e) => {
          e.preventDefault();
          handleModalSubmit();
        }}
      >
        Add a Book
      </a>

      <div
        id="AddBook"
        tabIndex="-1"
        className={
          showModal
            ? `fixed top-0 left-0 right-0 z-50  mx-auto modalClass  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`
            : `fixed top-0 left-0 right-0 z-50 hidden mx-auto modalClass  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`
        }
      >
        <div className=" mx-auto relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => {
                handleClose();
              }}
              type="button"
              className=" close-icon close-icon-book absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <form className="form" action="#" onSubmit={handleFormSubmit}>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  size="lg"
                  placeholder="Search"
                  required
                />
                <button
                  type="submit"
                  className=" searchbtn text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="container mx-auto ">
          <h2 className="pt-5">
            {searchedBooks.length > 0
              ? `Viewing ${searchedBooks.length} results:`
              : "Search for a book to begin"}
          </h2>
          <div className="text-center">
            {searchedBooks.length > 0 &&
              searchedBooks.map((book) => {
                return (
                  <div className="h-auto max-w-xs" key={book.bookId}>
                    <div className="">
                      <div className="">
                        <h3
                          className=" searchResult"
                          onClick={() => handleModalSelection(book)}
                        >
                          {book.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {showSelectModal && (
            <div
              id="selection-modal"
              className={
                "fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
              }
            >
              <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    onClick={() => {
                      handleSelectionClose();
                    }}
                    type="button"
                    className=" close-icon close-icon-book absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>

                  <form
                    className=" form "
                    action="#"
                    onSubmit={handleSelectionForm}
                  >
                    <div className="select_bookOptions relative w-full max-w-xl max-h-full">
                      <h2 className=" sign mx-auto">selection form!</h2>

                      <div>
                        <label
                          htmlFor="Color"
                          className="label block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Color
                        </label>

                        <select
                          id="book_color"
                          name="bookColor"
                          onChange={(e) =>
                            setSelected({ ...selected, color: e.target.value })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        >
                          <option>Select color</option>
                          <option value="red">Red</option>
                          <option value="green">Green</option>
                          <option value="blue">Blue</option>
                          <option value="navy">Navy</option>
                          <option value="yellow">Yellow</option>
                          <option value="orange">Orange</option>
                          <option value="black">Black</option>
                          <option value="white">White</option>
                          <option value="purple">Purple</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="Height"
                          className="label block mb-2 label text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Height
                        </label>

                        <select
                          id="book_height"
                          name="bookHeight"
                          onChange={(e) =>
                            setSelected({ ...selected, height: e.target.value })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        >
                          <option>Select Height</option>
                          <option value="tall">Tall</option>
                          <option value="medium">Medium</option>
                          <option value="short">Short</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="Thickness"
                          className=" label block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Thickness
                        </label>

                        <select
                          id="book_thickness"
                          name="bookThickness"
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              thickness: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        >
                          <option>Select Size</option>
                          <option value="thick">Thick</option>
                          <option value="mid">Mid</option>
                          <option value="thin">Thin</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="style"
                          className="label block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Style
                        </label>

                        <select
                          id="book_style"
                          name="bookStyle"
                          onChange={(e) =>
                            setSelected({ ...selected, style: e.target.value })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        >
                          <option>Select Style</option>
                          <option value="paperback">Paperback</option>
                          <option value="hardcover">HardCover</option>
                          <option value="leather">Leatherbound</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="Rating"
                          className="label block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Rating <div className="star-container">{selected.rating >= 1 && <Star />} {selected.rating >= 2 && <Star />} {selected.rating >= 3 && <Star />} {selected.rating >= 4 && <Star />} {selected.rating >= 5 && <Star />}</div>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            value={selected.rating}
                            onChange={(e) =>
                              setSelected({
                                ...selected,
                                rating: parseInt(e.target.value),
                              })
                            }
                            id="Rating"
                            name="Rating"
                            min="1"
                            max="5"
                          />
                        </label>
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="large-input"
                          className="label block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Comment
                        </label>
                        <input
                          type="text"
                          id="large-input"
                          value={selected.comment}
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              comment: e.target.value,
                            })
                          }
                          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onSubmit={handleSelectionForm}
                      >
                        Save selection
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export { AddBook };
