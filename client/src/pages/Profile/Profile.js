import "./Profile.css";
import { useRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKCASE } from "../../utils/queries";
import { convert } from "../../utils/dragUtils";
import { Card } from "../../components";

import {
  userBooksAtom,
  userBookcaseAtom,
  userItemsAtom,
  fetchedAtom,
} from "../../recoil/atom/userBooksAtom";
import Auth from "../../utils/auth";
import Star from "../../components/AddBook/Star";
function Profile() {
  if (!Auth.loggedIn()) window.location.href = "/";
  const today = new Date();
  const thisYear = today.getFullYear();
  const [books, setBooks] = useRecoilState(userBooksAtom);
  const [bookCase, setBookcase] = useRecoilState(userBookcaseAtom);
  const [items, setItems] = useRecoilState(userItemsAtom);
  const [fetched, setFetched] = useRecoilState(fetchedAtom);

  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME, {
    variables: { fetchMe: !fetched },
  });
  const { loading: loadingCase, data: dataCase } = useQuery(QUERY_BOOKCASE, {
    variables: { year: thisYear, fetchMe: !fetched },
  });

  if (dataMe && dataCase) {
    setBooks(dataMe.me);
    setBookcase(dataCase.bookcase);
    setItems(convert(dataCase.bookcase));
    setFetched(true);
  }

  return (
    <section id="profile">
      <div className="bookList">
        {books.bookList.map((book, index) => {
          return (
            <div
              key={book.bookId}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              {book.image ? (
                <img src={book.image} alt={`The cover for ${book.title}`} />
              ) : null}
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {book.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {" "}
                {book.authors.map((author, index) => {
                  return <span key={index}>{author}</span>;
                })}
              </p>
              {/* <p className="font-normal text-gray-700 dark:text-gray-400"> */}
              <div className="star-container">{book.rating >= 1 && <Star />} {book.rating >= 2 && <Star />} {book.rating >= 3 && <Star />} {book.rating >= 4 && <Star />} {book.rating >= 5 && <Star />}</div>
              {/* {book.rating === 1
                  ? `${book.rating} star`
                  : `${book.rating} stars`} */}
              {/* </p> */}
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {book.comment}{" "}
              </p>
            </div>
          );
          return <Card book={book} />;
        })}
      </div>
    </section>
  );
}

export { Profile };
