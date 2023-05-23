import "./AddBook.css";
import React, { useState, useEffect, useContext } from "react";
import Auth from '../../utils/auth';
import { ADD_BOOK } from '../../utils/mutations';
import { useMutation } from "@apollo/client";
// import { booksDeepCopy, convert } from "../../utils/dragUtils"
// import { useRecoilState } from "recoil";
// import { userBooksAtom, userItemsAtom } from "../../recoil/atom/userBooksAtom";


function AddBook() {
  const [showModal, setShowModal] = useState(false);
  const [showSelectModal, setshowSelectModal] = useState(false);
  const [selected, setSelected] = useState({ comment: "", rating: 0 });
  const handleModalSubmit = () => {
    setShowModal(!showModal);
  };
  const handleClose = () => {
    setShowModal(false)
  }
  const [selectedOption, setSelectedOption] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [addBook, { error }] = useMutation(ADD_BOOK)

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        // description: book.volumeInfo.description,
        // image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.selfLink,

      }));


      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };


  const handleSelectionClose = () => {
    setshowSelectModal(false)
  }

  const handleModalSelection = (book) => {
    setshowSelectModal(true);
    setSelected({ ...selected, id: book.bookId, title: book.title, authors: book.authors })
    setSearchedBooks([])

  }

  const handleSelectionForm = async (event) => {
    event.preventDefault();
    // On select save book and bring up selection modal
    // save selected options
    //  onSave: save book to unshelved
    // reload page/clear search and close parent modal


    const year = new Date().getFullYear().toString()
    console.log(year)
    const submission = { ...selected, year }
    console.log(submission)
    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await addBook({
        variables: { ...selected, year }
      });
      console.log(selected)

      console.log(data)
      // code needed to clear the form and dismiss the modal ---
    } catch (err) {
      console.error(err);
    }
  }





  return (
    <>
      <div className="AddBook">
        <button onClick={() => {
          handleModalSubmit();
        }} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          AddBook
        </button>

        {/* {showModal && (   */}
        <div id="AddBook" tabIndex="-1" className={
          showModal
            ? `fixed top-0 left-0 right-0 z-50  bg-white w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`
            : `fixed top-0 left-0 right-0 z-50 hidden bg-white w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`
        }>
          <div className=" mx-auto relative w-full max-w-xl max-h-full">

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

              <form className="space-y-6" action="#" onSubmit={handleFormSubmit}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name='searchInput'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    // type='text'
                    size='lg'
                    placeholder="Search"
                    required />
                  <button type="submit" className=" searchbtn text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
              </form>
            </div>
          </div>


          <div className="container mx-auto ">
            <h2 className="pt-5">
              {searchedBooks.length > 0
                ? `Viewing ${searchedBooks.length} results:`
                : 'Search for a book to begin'}
            </h2>
            <div className="text-center">
              {searchedBooks.length > 0 && searchedBooks.map((book) => {
                return (
                  <div className="h-auto max-w-xs" key={book.bookId}>
                    <div className="p-4">
                      {book.image && (
                        <img src={book.image} alt={`The cover for ${book.title}`} className="h-auto max-w-xs" />
                      )}
                      <div className="mb-2">
                        <h3 className="text-lg font-bold" onClick={() => handleModalSelection(book)}>{book.title}</h3>
                        {/* <p className="text-sm">Authors: {book.authors}</p> */}
                      </div>
                      <p className="text-sm">{book.description}</p>

                      {/* <button

                        onClick={() => handleModalSelection(book)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
                      >
                        Select
                      </button> */}

                    </div>

                  </div>

                );
              })}

            </div>
            {/* )} */}
            {showSelectModal &&

              <div id="selection-modal" className={
                "fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
              }>
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

                    <form className="space-y-6" action="#" onSubmit={handleSelectionForm}>

                      <div className="select_bookOptions">
                        <h2 className="mx-auto">
                          selection form!
                        </h2>

                        <div>
                          <label htmlFor="Color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Color:
                          </label>

                          <select id="book_color" name="bookColor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option>Select color</option>
                            <option value="Red">Red</option>
                            <option value="Green">Green</option>
                            <option value="Blue">Blue</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="Height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Height:
                          </label>

                          <select id="book_height" name="bookHeight" onChange={e => setSelected({ ...selected, height: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option>Select Height</option>
                            <option value="tall">Tall</option>
                            <option value="Medium">Medium</option>
                            <option value="short">Short</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="Thickness" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Thickness:
                          </label>

                          <select id="book_thickness" name="bookThickness" onChange={e => setSelected({ ...selected, thickness: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option>Select Size</option>
                            <option value="thick">Thick</option>
                            <option value="mid">Mid</option>
                            <option value="thin">Thin</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="style" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Style:
                          </label>

                          <select id="book_style" name="bookStyle" onChange={e => setSelected({ ...selected, style: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option>Select Style</option>
                            <option value="Paperback">Paperback</option>
                            <option value="HardCover">HardCover</option>
                            <option value="Leatherbound">Leatherbound</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="Rating" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">   Rating:
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" value={selected.rating} onChange={e => setSelected({ ...selected, rating: e.target.value })} id="Rating" name="Rating" min="1" max="5" />
                          </label>
                        </div>

                        <div className="mb-6">
                          <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
                          <input type="text" id="large-input" value={selected.comment} onChange={e => setSelected({ ...selected, comment: e.target.value })} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onSubmit={handleSelectionForm}
                        >Save selection</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            }
          </div >
        </div>
      </div>
    </>
  )
}

export { AddBook };
