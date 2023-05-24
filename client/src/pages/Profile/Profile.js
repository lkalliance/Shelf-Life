import "./Profile.css";
import { useRecoilState } from "recoil";

import { userBooksAtom } from "../../recoil/atom/userBooksAtom";

function Profile() {
  const [books, setBooks] = useRecoilState(userBooksAtom);

  return <section id="profile">
    <div className="column-3 ">
      {books.bookList.map((book, index) => {
              return (
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400"> {book.rating} stars
                  {/* { { {book.authors.map((author) => {
                    return(
                      <span>{author}</span>}
                    ) }
                  })} */}
                </p>
                <h5></h5>
                </div>
              );
            })}

    </div>
  </section>;
}

export { Profile };
