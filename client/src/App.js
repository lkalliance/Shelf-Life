import "./App.css";
import { Bookcase, Profile, Home } from "./pages";
import { NavBar } from "./components";
import { LoginForm } from "./components";
import { SignupForm } from "./components";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { QUERY_ME, QUERY_BOOKCASE } from "./utils/queries";
import { convert } from "./utils/dragUtils";

import Auth from "./utils/auth";

import {
  // ApolloClient,
  // InMemoryCache,
  // ApolloProvider,
  // createHttpLink,
  useQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
export const SignupContext = createContext();
// const httpLink = createHttpLink({ uri: "/graphql" });
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("id_token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),

//   uri: "http://:3001/graphql",
//   cache: new InMemoryCache({
//     addTypename: false,
//   }),
// });

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
    shelves: [],
    unshelved: [],
  });
  const [items, setItems] = useState({});
  const [year, setYear] = useState(thisYear.toString());
  const [uFetched, setUFetched] = useState(false);
  const [bFetched, setBFetched] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showloginModal, setShowloginModal] = useState(false);

  const setTheBooks = (data) => {
    setBooks({ ...data, fetched: true });
  };

  const setTheCase = (data) => {
    console.log(data);
    setBookCase(
      data.shelves
        ? { ...data, fetched: true }
        : {
            fetched: true,
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

  if (!loadingMe && !books.fetched) setTheBooks({ ...dataMe.me });
  if (!loadingCase && !bookCase.fetched) setTheCase({ ...dataCase.bookcase });

  return (
    // <ApolloProvider client={client}>
    <SignupContext.Provider
      value={{
        showloginModal,
        setShowloginModal,
        showSignupModal,
        setShowSignupModal,
      }}
    >
      <div className="App">
        {showloginModal ? <LoginForm /> : <div></div>}
        {showSignupModal ? <SignupForm /> : <div></div>}
        <NavBar
          showLogin={setShowloginModal}
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
                <Profile
                  uBooks={books}
                  uCase={bookCase}
                  uItems={items}
                  uYear={year}
                  uSetBooks={setBooks}
                  uSetCase={setBookCase}
                  uSetItems={setItems}
                  uFetched={uFetched}
                  uSetFetched={setUFetched}
                  bSetFetched={setBFetched}
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
                  uCase={bookCase}
                  uItems={items}
                  uYear={year}
                  uSetBooks={setBooks}
                  uSetCase={setBookCase}
                  uSetItems={setItems}
                  uFetched={uFetched}
                  uSetFetched={setUFetched}
                  bFetched={bFetched}
                  bSetFetched={setBFetched}
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
                  uItems={items}
                  uYear={year}
                  uFetched={uFetched}
                  bFetched={bFetched}
                  uSetBooks={setBooks}
                  uSetItems={setItems}
                  uSetCase={setBookCase}
                  uSetFetched={setUFetched}
                  bSetFetched={setBFetched}
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
                  uItems={items}
                  uYear={year}
                  uFetched={uFetched}
                  bFetched={bFetched}
                  uSetBooks={setBooks}
                  uSetItems={setItems}
                  uSetCase={setBookCase}
                  uSetFetched={setUFetched}
                  bSetFetched={setBFetched}
                />
              ) : (
                <Home />
              )
            }
          />
        </Routes>
      </div>
    </SignupContext.Provider>
    // </ApolloProvider>
  );
}

export default App;
