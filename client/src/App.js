import "./App.css";
import { Bookcase, Profile, Home, FAQ } from "./pages";
import { NavBar, LoginForm, SignupForm, AddBook } from "./components";
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
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showloginModal, setShowloginModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showStudio, setShowStudio] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [addBookPanel, setAddBookPanel] = useState(false);

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
    try {
      setTheBooks({ ...dataMe.me });
    } catch {
      console.log("No dataMe.");
    }
  }
  if (
    Auth.loggedIn() &&
    !loadingCase &&
    !bookCase.fetched &&
    dataCase &&
    dataCase.bookcase.year === year
  ) {
    try {
      setTheCase({ ...dataCase.bookcase });
    } catch {
      console.log("No dataCase");
    }
  } else if (
    Auth.loggedIn() &&
    !loadingCase &&
    !bookCase.fetched &&
    dataCase &&
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
          <LoginForm uSetBooks={setBooks} uSetCase={setBookCase} uYear={year} />
        ) : (
          <div></div>
        )}
        {showSignupModal ? (
          <SignupForm
            uSetBooks={setBooks}
            uSetCase={setBookCase}
            uYear={year}
          />
        ) : (
          <div></div>
        )}
        <NavBar
          showLogin={setShowloginModal}
          showAddBook={addBookPanel}
          setShowAddBook={setAddBookPanel}
        />
        <AddBook
          // AddBook overlay will only appear if state is set to true
          uYear={year}
          uBooks={books}
          uCase={bookCase}
          uSetBooks={setBooks}
          uSetCase={setBookCase}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          showStudio={showStudio}
          setShowStudio={setShowStudio}
          showResults={showResults}
          setShowResults={setShowResults}
          showAddBook={addBookPanel}
          setShowAddBook={setAddBookPanel}
        />
        <Routes>
          <Route
            path="/"
            element={
              Auth.loggedIn() ? (
                <Profile
                  uBooks={books}
                  uYear={year}
                  uSetYear={setYear}
                  uCase={bookCase}
                  uSetCase={setBookCase}
                />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/profile"
            element={
              Auth.loggedIn() ? (
                <Profile
                  uBooks={books}
                  uYear={year}
                  uSetYear={setYear}
                  uCase={bookCase}
                  uSetCase={setBookCase}
                />
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
                  uYear={year}
                  uSetYear={setYear}
                />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/faq"
            element={
              <FAQ
                showLogin={setShowloginModal}
                showSignup={setShowSignupModal}
              />
            }
          />
          <Route
            path="/FAQ"
            element={
              <FAQ
                showLogin={setShowloginModal}
                showSignup={setShowSignupModal}
              />
            }
          />
          <Route
            path="/Faq"
            element={
              <FAQ
                showLogin={setShowloginModal}
                showSignup={setShowSignupModal}
              />
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
                  uYear={year}
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
