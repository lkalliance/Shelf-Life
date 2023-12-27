import "./BookStyle.css";
import { Studio } from "../../components/Studio";

export function BookStyle({
  handleClose,
  handleSelectionForm,
  selected,
  setSelected,
  setDefaults,
  uBooks,
  uYear,
}) {
  const handleCheckChange = (e) => {
    const { id, checked } = e.target;
    setSelected({
      ...selected,
      [id]: checked,
    });
  };

  return (
    <div id="bookStyles">
      <button
        onClick={() => {
          handleClose();
        }}
        type="button"
        id="closeSelectBtn"
        className=" close-icon close-icon-book absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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

      <form id="stylesForm" className=" form " action="#">
        <h2 className="dark:text-white">{selected.title}</h2>

        <Studio
          selected={setDefaults(selected)}
          setSelected={setSelected}
          bookList={uBooks.bookList}
        />
        <div id="user-inputs">
          <div id="user-ratings">
            <label
              htmlFor="Rating"
              className="label block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {" "}
              Rating{" "}
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    rating: parseInt(e.target.value),
                  })
                }
                id="Rating"
                name="Rating"
                min="0"
                max="5"
              />
            </label>
          </div>

          <div id="user-comment">
            <label
              htmlFor="large-input"
              className="label block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Comment
            </label>
            <textarea
              id="large-input"
              value={selected.comment}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  comment: e.target.value,
                })
              }
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>
        </div>

        <div id="audiobook">
          <input type="checkbox" id="audio" onChange={handleCheckChange} />
          <label htmlFor="audio">Audiobook</label>
        </div>

        <button
          id="styleBtn"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSelectionForm}
        >
          {`${selected.audio ? "🎧 " : ""}Save to ${uYear}`}
        </button>
      </form>
    </div>
  );
}
