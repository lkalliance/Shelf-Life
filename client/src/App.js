import "./App.css";
import { RecoilRoot } from "recoil";
import { Bookcase, Profile, Home } from "./pages";
import { About, AddBook, Template } from "./components";
import { LoginForm } from "./components";
import { SignupForm } from "./components";
import { createContext, useState } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import Auth from "./utils/auth";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
export const SignupContext = createContext();
const httpLink = createHttpLink({ uri: "/graphql" });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  // link: new HttpLink({
  //   uri: 'http://localhost:3001/graphql'
  // }),
  // link: authLink.concat(httpLink),
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showloginModal, setShowloginModal] = useState(false);

  console.log(Auth.loggedIn());

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <SignupContext.Provider
          value={{
            showloginModal,
            setShowloginModal,
            showSignupModal,
            setShowSignupModal,
          }}
        >
          <div className="App">
            <Template />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookcase" element={<Bookcase />} />
              <Route path="/*" element={<Bookcase />} />
            </Routes>
          </div>
        </SignupContext.Provider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
