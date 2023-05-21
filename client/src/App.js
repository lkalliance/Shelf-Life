import "./App.css";
import { RecoilRoot } from "recoil";
import { Bookcase } from "./pages";
import { About, AddBook } from "./components"
import { LoginForm } from "./components";
import { SignupForm } from "./components";
import { createContext, useState } from "react";
export const SignupContext = createContext();

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showloginModal, setShowloginModal] = useState(false);
  
  return (
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
  );
}

export default App;
