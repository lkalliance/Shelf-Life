import "./App.css";
import { RecoilRoot } from "recoil";
import { Bookcase } from "./pages";
import { About, AddBook } from "./components"
import { LoginForm } from "./components";
import { SignupForm } from "./components";
import { createContext, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
export const SignupContext = createContext();
const httpLink = createHttpLink({ uri: "/graphql", })
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  // link: new HttpLink({
  //   uri: 'http://localhost:3001/graphql'
  // }),
  // link: authLink.concat(httpLink),
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
})


function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showloginModal, setShowloginModal] = useState(false);
  
  return (
    <ApolloProvider client={client}>
    <RecoilRoot>
      <SignupContext.Provider value={{ showloginModal, setShowloginModal, showSignupModal, setShowSignupModal }}>
        <div className="App">
          <header>Starter code</header>

          <Bookcase />
          <LoginForm />
          <SignupForm />
          < About />
          <AddBook />
        </div>
      </SignupContext.Provider>
    </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
