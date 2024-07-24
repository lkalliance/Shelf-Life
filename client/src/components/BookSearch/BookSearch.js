// This component renders the title search for adding a book

import "./BookSearch.css";
import { useRef, useEffect } from "react";
import { BookSearchResults } from "../../components/BookSearchResults";

export function BookSearch({
  handleClose,
  handleFormSubmit,
  searchInput,
  setSearchInput,
  showResults,
  searchedBooks,
  selected,
  handleModalSelection,
}) {
  // make a reference to the search field for auto-focus
  const searchRef = useRef(null);

  // use an effect to automatically put focus on the search field
  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div className="w-full max-w-xl max-h-full">
      <div
        id="searchField"
        className="bg-white rounded-lg shadow dark:bg-gray-700"
        style={{ backgroundColor: "transparent" }}
      >
        <button
          // This is the close button for the entire modal
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
            fill="black"
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
          className="form"
          id="searchForm"
          action="#"
          onSubmit={handleFormSubmit}
        >
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
              ref={searchRef}
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
              // This is the submit button for the search term
              type="submit"
              id="searchBtn"
              className=" searchbtn text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        {showResults && (
          // If results are to be shown, include this component
          <BookSearchResults
            searchedBooks={searchedBooks}
            selected={selected}
            handleModalSelection={handleModalSelection}
          />
        )}
      </div>
    </div>
  );
}
