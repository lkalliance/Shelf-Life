import "./Profile.css";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { QUERY_ME, QUERY_BOOKCASE } from "../../utils/queries";
import { useQuery } from "@apollo/client";

import {
  userBooksAtom,
  userBookcaseAtom,
  userItemsAtom,
} from "../../recoil/atom/userBooksAtom";

function Profile() {
  const [books, setBooks] = useRecoilState(userBooksAtom);
  const [cases, setCases] = useRecoilState(userBookcaseAtom);
  const [items, setItems] = useRecoilState(userItemsAtom);

  const { loading, data } = useQuery(QUERY_ME);

  return <section id="profile">
    <div>
      {books.bookList.map((book, index) => {
              return (
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                  {book.authors.map((author) => {
                    return(
                      <span>{author}</span>
                    )
                  })}
                </p>
                </div>
              );
            })}

    </div>
  </section>;
}

export { Profile };
