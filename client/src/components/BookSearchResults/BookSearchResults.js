import "./BookSearchResults.css";

export function BookSearchResults({
  searchedBooks,
  selected,
  handleModalSelection,
}) {
  return (
    <div className="container mx-auto ">
      <h2>
        {searchedBooks.length > 0
          ? `Viewing ${searchedBooks.length} results:`
          : selected.title
          ? ""
          : "Search for a book to begin"}
      </h2>
      <div id="search-results" className="text-center">
        {searchedBooks.length > 0 &&
          searchedBooks.map((book) => {
            if (book)
              return (
                <h3
                  className=" searchResult"
                  key={book.bookId}
                  onClick={() => handleModalSelection(book)}
                >
                  {book.title}
                  <span>{book.authors.join(", ")}</span>
                </h3>
              );
            return null;
          })}
      </div>
    </div>
  );
}
