// This component renders the book details modal from the bookcase

import "./ViewModal.css";
import React from "react";
import Star from "../../components/AddBook/Star";

function ViewModal({ show, switcher, info, remover, shelf, setShowingModal }) {
  const handleClose = () => {
    // This handler closes the modal
    switcher(false);
    setShowingModal(false);
  };

  const createAuthors = (authors) => {
    // This function returns a span with the authors' names
    return <span className="dark:text-white">{authors.join(", ")}</span>;
  };

  return (
    <div className="ViewModal">
      <div
        id="defaultModal"
        tabIndex="-1"
        className={
          show
            ? `fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`
            : `fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`
        }
      >
        <div className="mx-auto relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="fullContainer flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              {info.image ? (
                <img src={info.image} alt={info.title} className="bookImage" />
              ) : (
                <div></div>
              )}
              <div className="infoContainer">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {info.title}
                </h3>
                {info.authors ? createAuthors(info.authors) : <span></span>}
                {info.rating > 0 ? (
                  <div className="star-container">
                    {info.rating >= 1 && <Star />}{" "}
                    {info.rating >= 2 && <Star />}{" "}
                    {info.rating >= 3 && <Star />}{" "}
                    {info.rating >= 4 && <Star />}{" "}
                    {info.rating >= 5 && <Star />}
                  </div>
                ) : null}
                <div className="dark:text-white">{info.comment}</div>
                {shelf === "unshelved" ? (
                  <a
                    href="#"
                    className="dark:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      remover();
                    }}
                  >
                    give away
                  </a>
                ) : null}
              </div>
              <button
                onClick={() => {
                  handleClose();
                }}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ViewModal };
