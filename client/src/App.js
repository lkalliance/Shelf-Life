import "./App.css";
import { Bookcase, Profile, Home } from "./pages";
import { NavBar } from "./components";
import { LoginForm } from "./components";
import { SignupForm } from "./components";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { QUERY_ME, QUERY_BOOKCASE } from "./utils/queries";

import Auth from "./utils/auth";

import { useQuery } from "@apollo/client";
export const SignupContext = createContext();

function App() {
  // set current year as default

  const today = new Date();
  const thisYear = parseInt(today.getFullYear());
  const [books, setBooks] = useState({
    fetched: false,
    userName: "",
    bookList: [],
  });
  const [bookCase, setBookCase] = useState({
    fetched: false,
    year: "",
    user_id: "",
    shelves: [
      { left: [], right: [] },
      { left: [], right: [] },
    ],
    unshelved: [],
  });
  const [year, setYear] = useState(thisYear.toString());
  const [uFetched, setUFetched] = useState(false);
  const [bFetched, setBFetched] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showloginModal, setShowloginModal] = useState(false);

  const setTheBooks = (data) => {
    setBooks({ ...data, fetched: true });
  };

  const setTheCase = (data) => {
    setBookCase(
      data.shelves
        ? { ...data, fetched: true }
        : {
            fetched: false,
            year: "",
            user_id: "",
            shelves: [
              { left: [], right: [] },
              { left: [], right: [] },
            ],
            unshelved: [],
          }
    );
  };

  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME, {
    variables: { fetchMe: !books.fetched },
  });
  const { loading: loadingCase, data: dataCase } = useQuery(QUERY_BOOKCASE, {
    variables: { year, fetchMe: !bookCase.fetched },
  });

  if (Auth.loggedIn() && !loadingMe && !books.fetched) {
    setTheBooks({ ...dataMe.me });
  }
  if (
    Auth.loggedIn() &&
    !loadingCase &&
    !bookCase.fetched &&
    dataCase.bookcase.year === year
  ) {
    setTheCase({ ...dataCase.bookcase });
  } else if (
    Auth.loggedIn() &&
    !loadingCase &&
    !bookCase.fetched &&
    dataCase.bookcase.year !== year
  ) {
    setBookCase({
      fetched: true,
      year: "",
      user_id: "",
      shelves: [
        { left: [], right: [] },
        { left: [], right: [] },
      ],
      unshelved: [],
    });
  }
  return (
    <SignupContext.Provider
      value={{
        showloginModal,
        setShowloginModal,
        showSignupModal,
        setShowSignupModal,
      }}
    >
      <div className="App">
        {showloginModal ? (
          <LoginForm
            uSetBooks={setBooks}
            uSetCase={setBookCase}
            // uSetItems={setItems}
            uYear={year}
          />
        ) : (
          <div></div>
        )}
        {showSignupModal ? <SignupForm /> : <div></div>}
        <NavBar
          showLogin={setShowloginModal}
          uBooks={books}
          uSetBooks={setBooks}
          // uSetItems={setItems}
          uYear={year}
          uCase={bookCase}
          uSetYear={setYear}
          uSetCase={setBookCase}
          uSetFetched={setUFetched}
          bSetFetched={setBFetched}
        />
        <Routes>
          <Route
            path="/"
            element={
              Auth.loggedIn() ? (
                <Profile uBooks={books} uYear={year} />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/profile"
            element={
              Auth.loggedIn() ? (
                <Profile uBooks={books} uYear={year} />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/bookcase"
            element={
              Auth.loggedIn() ? (
                <Bookcase
                  uBooks={books}
                  uCase={bookCase}
                  uSetBooks={setBooks}
                  uSetCase={setBookCase}
                />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/*"
            element={
              Auth.loggedIn() ? (
                <Bookcase
                  uBooks={books}
                  uCase={bookCase}
                  uSetBooks={setBooks}
                  uSetCase={setBookCase}
                />
              ) : (
                <Home />
              )
            }
          />
        </Routes>
      </div>
    </SignupContext.Provider>
  );
}

export default App;
