// This component renders the navbar

import "./NavBar.css";
import { Link } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { yearAtom, fetchedAtom } from "../../recoil/atom/userBooksAtom";
import { About, AddBook } from "..";
import auth from "../../utils/auth";
import { convert } from "../../utils/dragUtils";

function NavBar({
  showLogin,
  uYear,
  uSetYear,
  uSetFetched,
  bSetFetched,
  uBooks,
  uSetItems,
  uCase,
  uSetCase,
  uSetBooks,
  uFetched,
  bFetched,
}) {
  // This function shows or hides the nav elements when window is narrow
  const showHide = (e) => {
    const navContainer = document.querySelector("#navbar-default");
    navContainer.classList.toggle("hidden");
  };
  const changeYear = (e) => {
    console.log(`Changed year to ${e.target.value}`);
    uSetCase({ ...uCase, fetched: false });
    uSetYear(e.target.value);
  };
  // Get the current year for the selection menu
  const today = new Date();
  const thisYear = today.getFullYear();
  const yearlist = [];
  for (let i = 2000; i <= thisYear; i++) {
    yearlist.push(i);
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img
            src="./shelf-life-logo-with-background.png"
            className="logo"
            alt="Logo"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={showHide}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {
              // Show one version of the nav if logged in, a different if logged out
              auth.loggedIn() ? (
                <>
                  <select value={uYear} onChange={changeYear}>
                    {yearlist.map((y, index) => {
                      return (
                        <option key={index} value={y}>
                          {y}
                        </option>
                      );
                    })}
                  </select>
                  <li key="to-book-list">
                    <Link
                      to="/profile"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={showHide}
                    >
                      Your Book List
                    </Link>
                  </li>
                  <li key="to-book-case">
                    <Link
                      to="/bookcase"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={showHide}
                    >
                      Your Bookcase
                    </Link>
                  </li>
                  <li key="add-book" id="addLi">
                    <AddBook
                      onClick={showHide}
                      uYear={uYear}
                      uBooks={uBooks}
                      uCase={uCase}
                      uSetBooks={uSetBooks}
                      uSetCase={uSetCase}
                      uSetItems={uSetItems}
                    />
                  </li>
                  <li key="about">
                    <About onClick={showHide} />
                  </li>
                  <li key="log-out">
                    <a
                      href="#"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={(e) => {
                        e.preventDefault();
                        auth.logout();
                        showHide();
                      }}
                    >
                      Log out
                    </a>
                  </li>
                </>
              ) : (
                <li key="log-in">
                  <a
                    href="@"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Clicked!");
                      showLogin(true);
                      showHide();
                    }}
                  >
                    Log in/Sign up
                  </a>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { NavBar };
